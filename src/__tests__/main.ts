import * as fs from "fs";
import * as path from "path";
import { toMatchFile } from "jest-file-snapshot";
import compilation from "./util/compilation";

jest.setTimeout(15000);
expect.extend({ toMatchFile });

const fixturesDir = path.join(__dirname, "fixtures");
fs.readdirSync(fixturesDir).forEach(name => {
  test(name, async () => {
    const fixtureDir = path.join(fixturesDir, name);
    const snapshotDir = path.join(fixtureDir, "__snapshots__");
    const configPath = path.join(fixtureDir, "webpack.config.ts");
    const config = (await import(configPath)).default;
    const { outputFS, stats } = await compilation(config);

    for (const stat of stats) {
      const compilation = stat.compilation;
      const compilationName = ((compilation as unknown) as { name?: string })
        .name;
      const prefixName = compilationName ? `${compilationName}--` : "";
      for (const assetName in compilation.assets) {
        let source = outputFS.readFileSync(
          compilation.assets[assetName].existsAt,
          "utf-8"
        );
        source = source.slice(source.indexOf("/******/ ({")); // Remove webpack module bootstrap code.
        expect(source).toMatchFile(
          path.join(snapshotDir, prefixName + assetName)
        );
      }
    }
    expect(true).toBe(true);
  });
});
