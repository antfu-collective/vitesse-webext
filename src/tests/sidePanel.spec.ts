import { describe, expect, it, vi } from 'vitest'
import { configureSidePanel } from '../background/sidePanel'
import { getManifestPermissions } from '../manifest'

describe('configureSidePanel', () => {
  it('skips setup when the browser does not expose the API', () => {
    expect(() => configureSidePanel(undefined)).not.toThrow()
  })

  it('enables opening the panel from the action button when supported', () => {
    const setPanelBehavior = vi.fn().mockResolvedValue(undefined)

    configureSidePanel({ setPanelBehavior })

    expect(setPanelBehavior).toHaveBeenCalledWith({ openPanelOnActionClick: true })
  })
})

describe('getManifestPermissions', () => {
  it('omits the Chromium-only sidePanel permission for Firefox', () => {
    expect(getManifestPermissions(true)).toEqual(['tabs', 'storage', 'activeTab'])
  })

  it('requests sidePanel for Chromium builds', () => {
    expect(getManifestPermissions(false)).toEqual(['tabs', 'storage', 'activeTab', 'sidePanel'])
  })
})
