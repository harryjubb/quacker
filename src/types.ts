export interface Shortcut {
  name: string
  shortcut: string
  secrets: { [key: string]: string }
  action: string
}

interface SetShortcuts {
  (shortcuts: Shortcut[]): void;
}

export interface API {
  setShortcuts: SetShortcuts
}