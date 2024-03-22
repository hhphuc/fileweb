import ArrowIcon from "../ArrowIcon";

export enum EntryType {
  DIRECTORY = 'directory',
  FILE = 'file',
}

export interface IFile {
  name: string;
  type: EntryType;
  contents?: string;
}

export interface IDirectory {
  name: string;
  type: EntryType;
  path: string;
  entries: Array<IEntry>;
  isExpanded?: boolean;
}

export interface IEntry extends IFile, IDirectory {}

export interface ITreeProps {
  entry: IEntry;
  handleItemClicked: (entry: IEntry) => void;
}

const Tree = ({ entry, handleItemClicked }: ITreeProps) => {
  return (
    <>
      <div className='row' onClick={() => handleItemClicked(entry)}>
        {entry.type === EntryType.DIRECTORY && (
          <ArrowIcon isExpanded={(entry as IDirectory).isExpanded} />
        )}
        <div className='f-name'> 
          {entry && <div>{entry.name}</div>}
        </div>
      </div>
      <div className='sub-entry'>
        {[...(entry as IDirectory)?.entries].map((_entry, index) => (
          <Tree
            key={entry.path + index}
            entry={_entry}
            handleItemClicked={handleItemClicked}
          />
        ))}
      </div>
    </>
  );
}

export default Tree;