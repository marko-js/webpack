import { importDefault } from "@marko/babel-utils";
import { VIRTUAL_SERVER_MANIFEST_PATH } from "../../shared/virtual";

export = function transformer(a, b) {
  if (a.hub) {
    return transformerMarko5(a, b);
  }

  return transformerMarko4(a, b);
};

function transformerMarko4(el, context): void {
  if (context.outputType === "html") {
    const manifestVar = context.importModule(
      "_webpackManifest",
      VIRTUAL_SERVER_MANIFEST_PATH
    );
    el.setAttributeValue("manifest", manifestVar);
  } else {
    el.detach();
  }
}

function transformerMarko5(path, t): void {
  if (path.hub.file.markoOpts.output === "html") {
    const manifestVar = importDefault(
      path.hub.file,
      VIRTUAL_SERVER_MANIFEST_PATH,
      "_webpackManifest"
    );
    path.pushContainer("attributes", t.markoAttribute("manifest", manifestVar));
  } else {
    path.remove();
  }
}
