import { Compiler, EntryNormalized } from "webpack";

interface NamedEntries {
  [_: string]: EntryNormalized;
}

const DEFAULT_ENTRY_NAME = "main";

export default class WebpackPluginAddEntries {
  public addNamed: NamedEntries | (() => NamedEntries | Promise<NamedEntries>);
  constructor({ addNamed = {} } = {}) {
    this.addNamed = addNamed;
  }
  public apply(compiler: Compiler) {
    if (
      typeof this.addNamed === "function" ||
      Object.keys(this.addNamed).length
    ) {
      compiler.options.entry = this.injectNamedEntries(compiler.options.entry);
    }
  }
  private injectNamedEntries(currentEntry: EntryNormalized) {
    const namedEntries = this.addNamed;
    if (typeof namedEntries === "function") {
      return () => {
        const calculatedEntries = namedEntries();
        if (calculatedEntries instanceof Promise) {
          return calculatedEntries.then((resolvedEntries) =>
            this.injectNamedToEntriesObject(currentEntry, resolvedEntries)
          );
        } else {
          return this.injectNamedToEntriesObject(
            currentEntry,
            calculatedEntries
          );
        }
      };
    } else {
      return this.injectNamedToEntriesObject(currentEntry, namedEntries);
    }
  }
  private injectNamedToEntriesObject(
    currentEntry: EntryNormalized,
    namedEntries: NamedEntries
  ) {
    const normalizedNamedEntries = {};

    for (const key in namedEntries) {
      normalizedNamedEntries[key] = { import: [namedEntries[key]] };
    }

    if (isDefaultEntry(currentEntry)) {
      return Object.assign({}, normalizedNamedEntries);
    } else if (
      typeof currentEntry === "string" ||
      Array.isArray(currentEntry)
    ) {
      return Object.assign(
        { [DEFAULT_ENTRY_NAME]: currentEntry },
        normalizedNamedEntries
      );
    } else if (typeof currentEntry === "function") {
      return () =>
        this.injectNamedToEntriesObject(
          currentEntry() as any,
          normalizedNamedEntries
        );
    } else if (typeof currentEntry.then === "function") {
      return ((currentEntry as unknown) as Promise<
        EntryNormalized
      >).then((entry) => this.injectNamedToEntriesObject(entry, namedEntries));
    } else if (currentEntry === Object(currentEntry)) {
      return Object.assign({}, currentEntry, normalizedNamedEntries);
    }
  }
}

function isDefaultEntry(entry: EntryNormalized) {
  if (typeof entry === "object") {
    for (const key in entry) {
      if (key !== DEFAULT_ENTRY_NAME) {
        return false;
      }

      for (const _ in entry[key]) {
        return false;
      }
    }

    return true;
  }

  return false;
}
