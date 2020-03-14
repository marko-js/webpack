import { Compiler } from 'webpack';
import Plugin from "../plugin";
type PluginOptions = ConstructorParameters<typeof Plugin>[0];
const pluginnOptionsLookup: WeakMap<Compiler, PluginOptions> = new WeakMap();

export { pluginnOptionsLookup as default };