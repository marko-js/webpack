import * as fs from "fs";
import * as path from "path";
import { toMatchFile } from "jest-file-snapshot";
import compilation from "./util/compilation";

jest.setTimeout(15000);
expect.extend({ toMatchFile });

const fixturesDir = path.join(__dirname, "fixtures");
fs.readdirSync(fixturesDir).forEach((name) => {
  test(`${name}`, async () => {
    const fixtureDir = path.join(fixturesDir, name);
    const snapshotDir = path.join(fixtureDir, "__snapshots__");
    const configPath = path.join(fixtureDir, "webpack.config.ts");
    const { compiler, outputFS, stats } = await compilation(
      (await import(configPath)).default
    );
    const { outputPath } = compiler;

    for (const stat of stats) {
      const compilation = stat.compilation;
      const compilationName = ((compilation as unknown) as { name?: string })
        .name;
      const prefixName = compilationName ? `${compilationName}--` : "";
      for (const assetName in compilation.assets) {
        const source = outputFS.readFileSync(
          path.join(outputPath, assetName),
          "utf-8"
        );
        expect(source).toMatchFile(
          path.join(snapshotDir, prefixName + assetName)
        );
      }
    }
  });
});
