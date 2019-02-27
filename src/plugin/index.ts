export default class MarkoWebpackPlugin {
  options: any;
  serverCompiler: any;
  browserCompiler: any;
  constructor(options) {
    this.options = options;
  }
  get server() {
    return compiler => {
      this.serverCompiler = compiler;
    };
  }
  get browser() {
    return compiler => {
      this.browserCompiler = compiler;
    };
  }
}
