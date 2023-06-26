export function useModal(elRef: any) {
  async function open() {
    await unref(elRef)?.open()
  }

  async function close() {
    await unref(elRef)?.close()
  }

  return {
    open,
    close,
  }
}
