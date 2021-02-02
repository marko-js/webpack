import type { types, NodePath } from "@marko/babel-types";

export default function transform(
  path: NodePath<types.MarkoTag>,
  t: typeof types
): void {
  const renderAssetsMember = t.memberExpression(
    t.identifier("out"),
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
