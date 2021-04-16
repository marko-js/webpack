import type { types } from "@marko/compiler";

export default function transform(
  path: types.NodePath<types.MarkoTag>,
  t: typeof types
): void {
  const renderAssetsMember = t.memberExpression(
    t.memberExpression(t.identifier("out"), t.identifier("global")),
    t.identifier("___renderAssets")
  );
  path
    .get("body")
    .pushContainer(
      "body",
      t.markoScriptlet([
        t.expressionStatement(
          t.logicalExpression(
            "&&",
            renderAssetsMember,
            t.callExpression(renderAssetsMember, [])
          )
        )
      ])
    );
}
