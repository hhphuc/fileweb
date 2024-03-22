import { cleanup, render, screen } from '@testing-library/react';
import Tree, { EntryType } from './Tree';

const tree = {
  name: "root",
  type: EntryType.DIRECTORY,
  path: "root",
  entries: [
    {
      name: "directory-2",
      type: EntryType.DIRECTORY,
      path: "directory-2",
      entries: [
        {
          name: "directory-2a",
          type: EntryType.DIRECTORY,
          path: "directory-2/directory-2a",
          entries: []
        },
        {
          name: "index2.js",
          contents: "() => {console.log('directory-2/index.js'}",
          type: EntryType.FILE,
          path: "directory-2/index.js",
          entries: []
        }
      ],
      isExpanded: true
    },
    {
      name: "index.js",
      contents: "() => {console.log('directory-2/index.js'}",
      type: EntryType.FILE,
      path: "index.js",
      entries: []
    }
  ],
  isExpanded: true
};

describe('Tree', () => {
  afterEach(cleanup);

  it('should render tree component correctly', () => {
    render(<Tree entry={tree} handleItemClicked={() => {}} />);
    expect(screen.getByText('root')).toBeInTheDocument();
    expect(screen.getByText('directory-2')).toBeInTheDocument();
    expect(screen.getByText('directory-2a')).toBeInTheDocument();
    expect(screen.getByText('index.js')).toBeInTheDocument();
    expect(screen.getByText('index2.js')).toBeInTheDocument();
  });
});

