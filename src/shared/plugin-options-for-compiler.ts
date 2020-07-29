import { Compiler } from "webpack";
import Plugin from "../plugin";
export default new WeakMap<Compiler, ConstructorParameters<typeof Plugin>[0]>();
