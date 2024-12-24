declare global {
  interface Window {
    ENV: typeof process.env
    ReactNativeWebView: {
      // eslint-disable-next-line ts/method-signature-style
      postMessage(message: string): void
      // eslint-disable-next-line ts/method-signature-style
      injectedObjectJson(): any
    }
    receiveMessageFromReactNative?: (data: string) => void
  }
}
export {}
