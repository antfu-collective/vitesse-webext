declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $app: {
      context: string
    }
  }
}

export { }  // Important! See https://stackoverflow.com/a/64189046/479957