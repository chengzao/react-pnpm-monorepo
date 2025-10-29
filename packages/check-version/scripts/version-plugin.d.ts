declare function versionPlugin(options: { version: string }): {
  name: string;
  configResolved(resolvedConfig: any): void;
  buildStart(): void;
};

export default versionPlugin;
