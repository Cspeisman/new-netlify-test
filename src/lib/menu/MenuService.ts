import {CheeseCakeFactoryMenuClient, type MenuClient, MenuClientStub} from "./MenuClient.ts";
import {type EatenStore, EatenStoreFake, EatenStoreLocalStorage} from "./EatenStore.ts";

export class MenuItem {
  name: string;

  constructor(name: string) {
    this.name = name;
  }
}

export class MenuService {
  menuClient: MenuClient;
  eatenStore: EatenStore;

  constructor(menuClient: MenuClient, eatenStore: EatenStore) {
    this.menuClient = menuClient;
    this.eatenStore = eatenStore;
  }

  async getItems() {
    return this.menuClient.items();
  }

  async saveEatenItem(name: string) {
    return await this.eatenStore.saveItem(name);
  }

  async getEatenItems() {
    return await this.eatenStore.getItems();
  }
}

let menuService = new MenuService(new CheeseCakeFactoryMenuClient(), new EatenStoreLocalStorage());
export const getMenuService = () => menuService
