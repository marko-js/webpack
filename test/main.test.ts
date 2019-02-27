import * as fs from "fs";
import * as path from "path";
import compilation from "./util/compilation";
import checkBuild from "./util/check-build";

describe("@marko/webpack", function () {
  this.timeout(15000);
  describe("fixtures", () => {
    const fixturesDir = path.join(__dirname, "fixtures");
    fs.readdirSync(fixturesDir).forEach(name => {
      it(name, async () => {
        const fixtureDir = path.join(fixturesDir, name);
        const configPath = path.join(fixtureDir, "webpack.config.ts");
        const config = (await import(configPath)).default;
        const { stats } = await compilation(config);
        checkBuild(stats.toJson(), fixtureDir);
      });
    });
  });
});
