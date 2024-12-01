declare global {
  interface Window {
    ENV: typeof process.env
    ReactNativeWebView?: {
      // eslint-disable-next-line ts/method-signature-style
      postMessage(message: string): void
    }
  }
}
export {}
