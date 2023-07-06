// @unocss-include

export const icons = [
  'i-icon-park-outline-system',
  'i-icon-park-outline-hamburger-button',
  'i-icon-park-outline-peoples',
  'i-icon-park-outline-permissions',
  'i-icon-park-outline-log',
  'i-icon-park-outline-setting-config',
  'i-icon-park-outline-view-list',
  'i-icon-park-outline-user',
  'i-icon-park-outline-flag',
  'i-icon-park-outline-document-folder',
  'i-icon-park-outline-bookmark-one',
  'i-icon-park-outline-analysis',
  'i-icon-park-outline-internal-data',
  'i-icon-park-outline-delete-one',
  'i-icon-park-outline-file-settings-one',
  'i-icon-park-outline-workbench',
  'i-icon-park-outline-setting-one',
]

export function renderIcon(icon: string) {
  return () => h('div', { class: icon })
}
