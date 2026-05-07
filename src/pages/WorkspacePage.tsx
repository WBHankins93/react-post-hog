import { useEffect, useMemo, useState } from 'react';
import { FileTree } from '../features/files/FileTree';
import { collectFiles, FileNode, mockFileTree } from '../features/files/mockFileTree';
import { getLaunchReadinessSummary, launchReadinessItems } from '../features/launch/launchReadiness';
import { loadWorkspaceState, saveWorkspaceState, updateRecentFileIds } from '../app/workspaceState';

const readinessLabels = {
  ready: 'Ready',
  'needs-review': 'Needs review',
  blocked: 'Blocked',
};

const launchReadinessSummary = getLaunchReadinessSummary();

const workspaceGuidance = [
  'Summarize the selected artifact in plain language.',
  'Attach one recommended next action to every launch file.',
  'Show readiness state before introducing editing workflows.',
];

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
  const [recentFileIds, setRecentFileIds] = useState<string[]>(() => loadWorkspaceState().recentFileIds);

  const selectedFile = useMemo(
    () => files.find((file) => file.id === selectedFileId) ?? null,
    [files, selectedFileId],
  );

  const recentFiles = useMemo(
    () => recentFileIds.map((fileId) => files.find((file) => file.id === fileId)).filter(Boolean) as FileNode[],
    [files, recentFileIds],
  );

  useEffect(() => {
    const currentState = loadWorkspaceState();
    const nextRecentFileIds = updateRecentFileIds(currentState.recentFileIds, selectedFileId);

    setRecentFileIds(nextRecentFileIds);
    saveWorkspaceState({
      ...currentState,
      selectedFileId,
      recentFileIds: nextRecentFileIds,
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
        <p className="eyebrow">Phase 1 build</p>
        <h2>{selectedFile?.name ?? 'No file selected'}</h2>

        {recentFiles.length > 0 ? (
          <div className="workspace__recents" aria-label="Recently opened files">
            <span>Recents</span>
            <div>
              {recentFiles.map((file) => (
                <button
                  className={file.id === selectedFileId ? 'workspace__recent workspace__recent--active' : 'workspace__recent'}
                  key={file.id}
                  type="button"
                  onClick={() => setSelectedFileId(file.id)}
                >
                  {file.name}
                </button>
              ))}
            </div>
          </div>
        ) : null}

        {selectedFile?.artifact ? (
          <article className="artifactCard" aria-label="Selected artifact guidance">
            <div className="artifactCard__header">
              <div>
                <span>{selectedFile.artifact.phase}</span>
                <h3>{selectedFile.artifact.summary}</h3>
              </div>
              <strong className={`artifactCard__status artifactCard__status--${selectedFile.artifact.readiness}`}>
                {readinessLabels[selectedFile.artifact.readiness]}
              </strong>
            </div>
            <dl className="artifactCard__meta">
              <div>
                <dt>Owner</dt>
                <dd>{selectedFile.artifact.owner}</dd>
              </div>
              <div>
                <dt>Next action</dt>
                <dd>{selectedFile.artifact.nextAction}</dd>
              </div>
            </dl>
          </article>
        ) : null}

        <pre className="workspace__content">
          <code>{selectedFile?.content ?? 'Pick a file from the tree to view details.'}</code>
        </pre>

        <section className="launchChecklist" aria-labelledby="launch-checklist-title">
          <div className="launchChecklist__header">
            <div>
              <p className="eyebrow">Phase 3 · Launch readiness</p>
              <h3 id="launch-checklist-title">{launchReadinessSummary.confidenceLabel}</h3>
            </div>
            <span>{launchReadinessSummary.deferredCount} deferred</span>
          </div>
          <ul>
            {launchReadinessItems.map((item) => (
              <li className={`launchChecklist__item launchChecklist__item--${item.status}`} key={item.id}>
                <strong>{item.label}</strong>
                <p>{item.detail}</p>
              </li>
            ))}
          </ul>
        </section>

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
