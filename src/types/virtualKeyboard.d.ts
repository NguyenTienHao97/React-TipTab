declare interface VirtualKeyboard {
  boundingRect: DOMRectReadOnly
  overlaysContent: boolean
  show: () => void
  hide: () => void
  addEventListener: (
    type: 'geometrychange',
    listener: (event: Event) => void
  ) => void
  removeEventListener: (
    type: 'geometrychange',
    listener: (event: Event) => void
  ) => void
}

interface Navigator {
  virtualKeyboard?: VirtualKeyboard
}
