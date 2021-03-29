export interface Shortcut {
  name: string
  shortcut: string
  secrets: string
  action: string
}

interface SetShortcuts {
  (shortcuts: Shortcut[]): void;
}

export interface API {
  setShortcuts: SetShortcuts
}