export default class WebpackPluginAddEntries {
  public entries : object;
  constructor({ entries = {} } = {}) {
    this.entries = entries;
  }
  public apply(compiler) {
    compiler.options.entry = this.injectEntries(compiler.options.entry);
  }
  private injectEntries(currentEntry) {
    const newEntries = this.entries;
    if (typeof newEntries === 'function') {
      return () => {
        const calculatedEntries = newEntries();
        if (typeof calculatedEntries.then === 'function') {
          return calculatedEntries.then(resolvedEntries => this.injectEntriesObject(currentEntry, resolvedEntries));
        } else {
          return this.injectEntriesObject(currentEntry, calculatedEntries);
        }
      }
    } else {
      return this.injectEntriesObject(currentEntry, newEntries);
    }
  }
  private injectEntriesObject(currentEntry, newEntries) {
    if (currentEntry === emptyEntry) {
      return Object.assign({}, newEntries);
    } else if (typeof currentEntry === 'string' || Array.isArray(currentEntry)) {
      return Object.assign({ main:currentEntry }, newEntries);
    } else if (typeof currentEntry === 'function') {
      return (...args) => this.injectEntriesObject(currentEntry(...args), newEntries);
    } else if (typeof currentEntry.then === 'function') {
      return currentEntry.then(entry => this.injectEntriesObject(entry, newEntries));
    } else if (currentEntry === Object(currentEntry)) {
      return Object.assign({}, currentEntry, newEntries);
    }
  }
}

export const emptyEntry = ['empty'];