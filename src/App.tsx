import { useCallback, useEffect, useState } from 'react';
import apiHelper, { ApiEndpoint } from './utils/api';
import './App.css';
import Tree, { EntryType, IDirectory, IEntry } from './components/tree/Tree';
import Modal from './components/modal/Modal';

const ROOT_PATH = 'root';
interface IDirectoryResponse {
  id: string;
  entries: Array<{ name: string, type: EntryType }>;
}
interface IFileResponse {
  id: string;
  contents: string;
}

const findDirectoryByPath = (tree: IDirectory, path: string) => {
  const name = (path || '').split('/').pop();
  const stack: Array<IEntry> = [tree];

  while (stack.length > 0) {
    const current = stack.pop();

    if (current?.name === name) {
      return current;
    }

    const currentEntries = (current as IDirectory)?.entries;
    if (currentEntries) {
      for (let entry of currentEntries) {
        stack.push(entry);
      }
    }
  }

  return null;
};

const App = () => {
  const [tree, setTree] = useState<IDirectory>();
  const [currentDirectory, setCurrentDirectory] = useState<IDirectory>();
  const [currentPath, setCurrentPath] = useState<string>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState('');

  const fetchDirectory = useCallback((path: string) => {
    setCurrentPath(path);

    const fetchDir = async () => {
      const directory: IDirectoryResponse = await apiHelper.get(ApiEndpoint.FS, { path });
      setCurrentDirectory({
        name: directory.id,
        type: EntryType.DIRECTORY,
        path,
        entries: directory.entries?.map(entry => ({
          ...entry,
          path: `${path === ROOT_PATH ? '' : path + '/'}${entry.name}`,
          entries: []
        })),
      });
    }

    fetchDir();
  }, []);

  const fetchFile = useCallback((path: string) => {
    const fetchFile = async () => {
      const file: IFileResponse = await apiHelper.get(ApiEndpoint.FS, { path });
      setModalContent(file.contents);
    }

    fetchFile();
  }, []);

  useEffect(() => {
    if (!currentDirectory) {
      return;
    }

    if (!tree) {
      setTree({ ...currentDirectory });
      return;
    }

    const dir = findDirectoryByPath(tree as IDirectory, currentPath || '') as IDirectory;
    if (!dir) {
      return;
    }

    dir.entries = currentDirectory?.entries?.map(entry => ({
      ...entry,
      entries: []
    })) || [];
    dir.isExpanded = !dir.isExpanded;
    setTree({ ...tree });
    setCurrentDirectory(undefined);
    setCurrentPath(undefined);
  }, [tree, currentDirectory, currentPath]);

  useEffect(() => {
    fetchDirectory(ROOT_PATH);
  }, [fetchDirectory]);

  const handleItemClicked = useCallback((entry: IEntry) => {
    if (!tree) {
      return;
    }

    if (entry.type === EntryType.FILE) {
      fetchFile(entry.path);
      setIsModalOpen(true);
    }

    const path = (entry as IDirectory).path;
    const dir = findDirectoryByPath(tree as IDirectory, path) as IDirectory;
    if (!dir) {
      return;
    }

    if (dir.isExpanded) {
      dir.entries = [];
      dir.isExpanded = !dir.isExpanded;
      setTree({ ...tree });
      return;
    }

    fetchDirectory(path);
  }, [fetchDirectory, fetchFile, tree]);

  return (
    <div className="App">
      <div className="tree">
        {tree && <Tree entry={tree} handleItemClicked={handleItemClicked} />}
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          content={modalContent}
        />
      </div>
    </div>
  );
}

export default App;
