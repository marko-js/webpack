export = function transformer(el, ctx): void {
  const { builder } = ctx;
  el.appendChild(
    builder.scriptlet({
      value: "out.___renderAssets && out.___renderAssets()"
    })
  );
};
