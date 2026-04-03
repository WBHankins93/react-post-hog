import { FormEvent, useEffect, useMemo, useState } from 'react';

export type Command = {
  id: string;
  label: string;
  run: () => void;
};

type CommandPaletteProps = {
  commands: Command[];
  open: boolean;
  onClose: () => void;
};

export function CommandPalette({ commands, open, onClose }: CommandPaletteProps) {
  const [query, setQuery] = useState('');

  useEffect(() => {
    if (!open) {
      setQuery('');
    }
  }, [open]);

  const filteredCommands = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) {
      return commands;
    }

    return commands.filter((command) =>
      command.label.toLowerCase().includes(normalizedQuery),
    );
  }, [commands, query]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const firstMatch = filteredCommands[0];
    if (!firstMatch) {
      return;
    }

    firstMatch.run();
    onClose();
  }

  if (!open) {
    return null;
  }

  return (
    <div className="paletteOverlay" role="dialog" aria-modal="true" aria-label="Command palette">
      <form className="palette" onSubmit={handleSubmit}>
        <label className="palette__label" htmlFor="command-search">
          Search commands
        </label>
        <input
          id="command-search"
          className="palette__input"
          autoFocus
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Type a command, then press Enter"
        />

        <ul className="palette__list">
          {filteredCommands.length === 0 ? (
            <li className="palette__empty">No command found.</li>
          ) : (
            filteredCommands.map((command) => (
              <li key={command.id}>
                <button
                  type="button"
                  className="palette__item"
                  onClick={() => {
                    command.run();
                    onClose();
                  }}
                >
                  {command.label}
                </button>
              </li>
            ))
          )}
        </ul>

        <button type="button" className="palette__close" onClick={onClose}>
          Esc to close
        </button>
      </form>
    </div>
  );
}
