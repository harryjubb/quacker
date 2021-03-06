export interface Shortcut {
  name: string
  shortcut: string
  secrets: string
  action: string
}

export interface SetShortcuts {
  (shortcuts: Shortcut[]): void
}

export interface API {
  setShortcuts: SetShortcuts
  handleInitialShortcuts: (handler: SetShortcuts) => void
  exportShortcuts: SetShortcuts
}