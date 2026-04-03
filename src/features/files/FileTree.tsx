import { FileNode } from './mockFileTree';

type FileTreeProps = {
  nodes: FileNode[];
  selectedId: string | null;
  onSelect: (node: FileNode) => void;
};

export function FileTree({ nodes, selectedId, onSelect }: FileTreeProps) {
  return (
    <ul className="fileTree">
      {nodes.map((node) => (
        <FileTreeNode key={node.id} node={node} selectedId={selectedId} onSelect={onSelect} />
      ))}
    </ul>
  );
}

type FileTreeNodeProps = {
  node: FileNode;
  selectedId: string | null;
  onSelect: (node: FileNode) => void;
};

function FileTreeNode({ node, selectedId, onSelect }: FileTreeNodeProps) {
  const isSelected = node.id === selectedId;

  return (
    <li>
      <button
        type="button"
        className={`fileTree__item${isSelected ? ' fileTree__item--active' : ''}`}
        onClick={() => onSelect(node)}
      >
        <span className="fileTree__icon">{node.type === 'folder' ? '📁' : '📄'}</span>
        {node.name}
      </button>

      {node.type === 'folder' && node.children && (
        <ul className="fileTree__children">
          {node.children.map((child) => (
            <FileTreeNode
              key={child.id}
              node={child}
              selectedId={selectedId}
              onSelect={onSelect}
            />
          ))}
        </ul>
      )}
    </li>
  );
}
