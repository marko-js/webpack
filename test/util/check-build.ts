import * as fs from "fs";
import * as path from "path";
import * as assert from "assert";
import * as mkdirp from "mkdirp";
import * as del from "del";
import escape from "escape-string-regexp";

const SNAPSHOT_DIRNAME = '__snapshots__';

const checkBuild = (
  name,
  { errors, warnings, entrypoints, modules, chunks },
  assets,
  fixtureDir,
  snapshotErrors
) => {
  const stats = { errors, warnings, entrypoints, chunks:getChunkInfo(chunks) };
  const snapshotDir = path.join(fixtureDir, SNAPSHOT_DIRNAME);
  const statsExpectedPath = path.join(
    snapshotDir,
    `stats${name ? `-${name}` : ""}.expected.json`
  );
  
  snapshot(statsExpectedPath, stats, snapshotErrors);

  const modulesDir = path.join(snapshotDir, `modules${name ? `-${name}` : ""}`);
  chunks.forEach(chunk => {
    const fullSource = assets[chunk.files[0]];
    chunk.modules
      .map(module => moduleWithRelativePath(module, fixtureDir))
      .filter(module => !/^\.\.\/|node_modules/.test(module.relativePath))
      .forEach(module => {
        const moduleSource = getModuleSource(fullSource, module.id);
        const moduleExpectedPath = path.resolve(
          modulesDir,
          module.relativePath
            .replace(/(\.[\w?]+)$/, ".expected$1")
            .replace(/\//g, "⧸")
        );

        snapshot(moduleExpectedPath, moduleSource, snapshotErrors);
      });
  });
};

const getModuleSource = (fullSource, moduleId) => {
  const moduleMarker = escape(`${JSON.stringify(moduleId)}:`);
  const commentMarker = escape("/***/");
  const closeModule = escape("})");
  const pattern = new RegExp(`${commentMarker} ${moduleMarker}.*?${commentMarker}[^\n]+\n(.*?)${commentMarker} ${closeModule}`, 's');
  const match = pattern.exec(fullSource);
  return match && match[1].trim();
}

const moduleWithRelativePath = (module, fixtureDir) => {
  module.relativePath = path.relative(fixtureDir, module.identifier.replace(/.*!/, ''));
  return module;
}

const getChunkInfo = (chunks) => {
  const chunkInfo = {};
  chunks.forEach(chunk => {
    chunkInfo[chunk.id] = {
      files: chunk.files,
      modules: chunk.modules.map(m => m.name).sort()
    }
  });
  return chunkInfo;
}

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

const getAssetSources = (stats) => {
  const assets = {};
  const compilationAssets = stats.compilation.assets;
  Object.keys(compilationAssets).forEach(assetName => {
    assets[assetName] = compilationAssets[assetName].source()
  });
  return assets;
}

export default (stats, fixtureDir) => {
  const snapshotDir = path.join(fixtureDir, SNAPSHOT_DIRNAME);
  const snapshotErrors = [];

  if (process.env.UPDATE_SNAPSHOTS) {
    // clean all snapshot files
    del.sync(path.join(snapshotDir, '**'));
  } else {
    // clean actual snapshot files
    del.sync(path.join(snapshotDir, '**/*.actual.*'));
  }

  if (stats.stats) {
    stats.stats.forEach(stats => {
      checkBuild(stats.compilation.name, stats.toJson(), getAssetSources(stats), fixtureDir, snapshotErrors);
    });
  } else {
    checkBuild('', stats.toJson(), getAssetSources(stats), fixtureDir, snapshotErrors);
  }

  if (snapshotErrors.length) throw snapshotErrors[0];
};

