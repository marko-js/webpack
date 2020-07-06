export = function transformer(a, b) {
  if (a.hub) {
    return transformerMarko5(a, b);
  }

  return transformerMarko4(a, b);
};

function transformerMarko4(el, { builder }): void {
  el.appendChild(
    builder.scriptlet({
      value: "out.___renderAssets && out.___renderAssets()"
    })
  );
}

function transformerMarko5(path, t): void {
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
