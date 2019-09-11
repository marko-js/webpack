export = function transformer(el: any, ctx: any) {
  const { builder } = ctx;
  el.appendChild(
    builder.scriptlet({
      value: "out.___renderAssets && out.___renderAssets()"
    })
  );
};
