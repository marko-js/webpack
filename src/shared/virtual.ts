import path from "path";
import VirtualModulesPlugin from "webpack-virtual-modules";
import { Compiler } from "webpack";

const CWD = process.cwd();

const virtualModulesByCompiler = new WeakMap();

export function registerVirtualModules(compiler: Compiler, virtualModules) {
  virtualModules.apply(compiler);
  virtualModulesByCompiler.set(compiler, virtualModules);
}

export function getVirtualModules(compiler: Compiler) {
  let virtualModules = virtualModulesByCompiler.get(compiler);

  if (!virtualModules) {
    virtualModules = new VirtualModulesPlugin();
    virtualModules.apply(compiler);
    virtualModulesByCompiler.set(compiler, virtualModules);

    // When we're in this branch, it's because the loader is adding this plugin after the compilation has started
    // This means that we missed the afterEnvironmentHook where the VirtualModulesPlugin setup the writeModule method
    // Since the plugin doesn't work unless this function is called, we'll call it manually
    const taps = compiler.hooks.afterEnvironment.taps;
    const hook = taps.find(({ name }) => name === "VirtualModulesPlugin");
    hook.fn();
  }

  return virtualModules;
}

export const VIRTUAL_BROWSER_INVALIDATE_PATH = path.join(
  CWD,
  "__MARKO_WEBPACK_INVALIDATE__.js"
);

export const VIRTUAL_SERVER_MANIFEST_PATH = path.join(
  CWD,
  "__MARKO_WEBPACK__MANIFEST.js"
);
