import * as fs from "fs";
import * as path from "path";
import * as assert from "assert";
import * as mkdirp from "mkdirp";
import * as del from "del";

const SNAPSHOT_DIRNAME = '__snapshots__';

const checkBuild = (
  { name, errors, warnings, entrypoints, modules, children },
  fixtureDir
) => {
  if (children.length) {
    children.forEach((child, index) => {
      child.name = child.name || `${name ? `${name}-` : ""}${index}`;
      checkBuild(child, fixtureDir);
    });
    return;
  }

  const moduleNames = modules
    .map(m => (m.relativePath = path.relative(fixtureDir, m.identifier.replace(/.*!/, ''))))
    .sort();
  const stats = { errors, warnings, entrypoints, moduleNames };
  const snapshotDir = path.join(fixtureDir, SNAPSHOT_DIRNAME);
  const statsExpectedPath = path.join(
    snapshotDir,
    `stats${name ? `-${name}` : ""}.expected.json`
  );
  const snapshotErrors = [];
  
  snapshot(statsExpectedPath, stats, snapshotErrors);

  const modulesDir = path.join(snapshotDir, `modules${name ? `-${name}` : ""}`);
  modules
    .filter(module => !/^\.\.\/|node_modules/.test(module.relativePath))
    .forEach(module => {
      const moduleExpectedPath = path.join(
        modulesDir,
        module.relativePath
          .replace(/(\.[\w?]+)$/, ".expected$1")
          .replace(/\//g, "⧸")
      );
      
      snapshot(moduleExpectedPath, module.source, snapshotErrors);
    });

  if (snapshotErrors.length) throw snapshotErrors[0];
};

const writeFile = (filepath, contents) => {
  mkdirp.sync(path.dirname(filepath));
  fs.writeFileSync(filepath, contents, "utf-8");
};

const readFile = filepath => {
  try {
    return fs.readFileSync(filepath, "utf-8");
  } catch (e) {
    return "";
  }
};

const snapshot = (expectedPath, actualValue, snapshotErrors) => {
  const actualPath = expectedPath.replace('.expected.', '.actual.');
  let expectedValue = readFile(expectedPath);
  let actualStringified = actualValue;

  if (typeof actualValue !== 'string') {
    actualStringified = JSON.stringify(actualValue, null, 2);
    actualValue = JSON.parse(actualStringified);
    expectedValue = JSON.parse(expectedValue || '{}');
  }

  writeFile(actualPath, actualStringified);

  try {
    assert.deepEqual(actualValue, expectedValue,
      `${path.relative(process.cwd(), actualPath)} != ${path.relative(
        process.cwd(),
        expectedPath
      )}`
    );
  } catch (e) {
    if (process.env.UPDATE_SNAPSHOTS) {
      writeFile(expectedPath, actualStringified);
    } else {
      snapshotErrors.push(e);
    }
  }
}

export default (stats, fixtureDir) => {
  const snapshotDir = path.join(fixtureDir, SNAPSHOT_DIRNAME);
  if (process.env.UPDATE_SNAPSHOTS) {
    // clean all snapshot files
    del.sync(path.join(snapshotDir, '**'));
  } else {
    // clean actual snapshot files
    del.sync(path.join(snapshotDir, '**/*.actual.*'));
  }
  return checkBuild(stats, fixtureDir);
};
