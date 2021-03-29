import * as fs from "fs";
import * as path from "path";
import webpack4 from "webpack";
import webpack5 from "webpack5";
import { toMatchFile } from "jest-file-snapshot";
import compilation from "./util/compilation";

expect.extend({ toMatchFile });

const fixturesDir = path.join(__dirname, "fixtures");
const fixtures = fs.readdirSync(fixturesDir);

for (const [version, webpack] of Object.entries({ webpack4, webpack5 })) {
  describe(`${version}`, () => {
    beforeAll(() => {
      jest.doMock("webpack", () => webpack);
    });

    afterAll(() => {
      jest.resetModules();
    });

    for (const name of fixtures) {
      test(`${name}`, async () => {
        const fixtureDir = path.join(fixturesDir, name);
        const snapshotDir = path.join(fixtureDir, "__snapshots__", version);
        const remainingSnapshots = fs.readdirSync(snapshotDir);
        const configPath = path.join(fixtureDir, "webpack.config.ts");
        const { outputPath, outputFS, stats } = await compilation(
          webpack as typeof webpack4,
          (await import(configPath)).default
        );

        for (const stat of stats) {
          const compilation = stat.compilation;
          const compilationName = ((compilation as unknown) as {
            name?: string;
          }).name;

          const prefixName = compilationName ? `${compilationName}--` : "";
          for (const assetName in compilation.assets) {
            const source = outputFS.readFileSync(
              path.join(outputPath, assetName),
              "utf-8"
            );
            const snapshotName = prefixName + assetName;
            const snapshotIndex = remainingSnapshots.indexOf(snapshotName);

            if (
              snapshotIndex == -1 &&
              expect.getState().snapshotState._updateSnapshot !== "all"
            ) {
              throw new Error(`Missing snapshot: ${version}/${snapshotName}`);
            } else {
              // eslint-disable-next-line jest/no-conditional-expect
              expect(source).toMatchFile(path.join(snapshotDir, snapshotName));
              remainingSnapshots.splice(snapshotIndex, 1);
            }
          }
        }

        if (remainingSnapshots.length) {
          if (expect.getState().snapshotState._updateSnapshot === "all") {
            for (const snapshotName of remainingSnapshots) {
              fs.unlinkSync(path.join(snapshotDir, snapshotName));
            }
          } else {
            throw new Error(
              `Unexpected snapshots for ${version}: ${remainingSnapshots.join(
                ", "
              )}`
            );
          }
        }
      });
    }
  });
}
