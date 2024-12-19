export interface EatenStore {
  saveItem(name: string): Promise<boolean>;

  getItems(): Promise<Set<string>>;
}

export class EatenStoreFake implements EatenStore {
  store: Set<string> = new Set();

  getItems(): Promise<Set<string>> {
    return Promise.resolve(this.store);
  }

  saveItem(name: string): Promise<boolean> {
    this.store.add(name);
    return Promise.resolve(true);
  }
}

export class EatenStoreLocalStorage implements EatenStore {
    key = 'eaten-store'
    async saveItem(name: string): Promise<boolean> {
      let items = await this.getItems();
      items.add(name);
      localStorage.setItem(this.key, JSON.stringify(Array.from(items)));
      return Promise.resolve(true);
    }

    getItems(): Promise<Set<string>> {
      let items = localStorage?.getItem(this.key);
      if (items) {
        let itemsArray = JSON.parse(items);
        return Promise.resolve(new Set(itemsArray));
      }
      return Promise.resolve(new Set());
    }
}
