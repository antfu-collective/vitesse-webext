interface SidePanelApi {
  setPanelBehavior: (behavior: { openPanelOnActionClick: boolean }) => Promise<unknown>
}

export function configureSidePanel(sidePanel: SidePanelApi | undefined) {
  sidePanel?.setPanelBehavior({ openPanelOnActionClick: true })
    .catch((error: unknown) => console.error(error))
}
