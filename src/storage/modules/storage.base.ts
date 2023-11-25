class Storage {
  protected static cache = new Map<string, boolean>();

  protected key: string;

  constructor(key: string) {
    this.key = key;

    if (Storage.cache.has(this.key)) {
      console.log('[Storage] duplicated storage key detected', this.key);
    }

    Storage.cache.set(this.key, true);
  }
}

export default Storage;
