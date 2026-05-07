import { useEffect, useMemo, useState } from 'react';
import { FileTree } from '../features/files/FileTree';
import { collectFiles, FileNode, mockFileTree } from '../features/files/mockFileTree';
import { loadWorkspaceState, saveWorkspaceState } from '../app/workspaceState';

const workspaceGuidance = [
  'Summarize the selected artifact in plain language.',
  'Attach one recommended next action to every launch file.',
  'Show readiness state before introducing editing workflows.',
];

export function WorkspacePage() {
  const files = useMemo(() => collectFiles(mockFileTree), []);
  const [selectedFileId, setSelectedFileId] = useState<string | null>(
    () => loadWorkspaceState().selectedFileId ?? files[0]?.id ?? null,
  );

  const selectedFile = useMemo(
    () => files.find((file) => file.id === selectedFileId) ?? null,
    [files, selectedFileId],
  );

  useEffect(() => {
    const currentState = loadWorkspaceState();
    saveWorkspaceState({
      ...currentState,
      selectedFileId,
    });
  }, [selectedFileId]);

  function handleSelect(node: FileNode) {
    if (node.type === 'file') {
      setSelectedFileId(node.id);
    }
  }

  return (
    <section className="workspace">
      <div className="workspace__panel workspace__panel--tree">
        <p className="eyebrow">Workspace</p>
        <h2>File explorer</h2>
        <p className="workspace__helper">Select a file to preview its content and MVP2 role.</p>
        <FileTree nodes={mockFileTree} selectedId={selectedFileId} onSelect={handleSelect} />
      </div>

      <div className="workspace__panel workspace__panel--viewer">
        <p className="eyebrow">Viewer</p>
        <h2>{selectedFile?.name ?? 'No file selected'}</h2>
        <pre className="workspace__content">
          <code>{selectedFile?.content ?? 'Pick a file from the tree to view details.'}</code>
        </pre>
        <div className="workspace__guidance" aria-label="MVP2 workspace guidance">
          <h3>MVP2 viewer behavior</h3>
          <ul>
            {workspaceGuidance.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
