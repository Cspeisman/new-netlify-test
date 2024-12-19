import {CheeseCakeFactoryMenuClient, type MenuClient, MenuClientStub} from "./MenuClient.ts";

export class MenuItem {
  name: string;

  constructor(name: string) {
    this.name = name;
  }
}

export class MenuService {
  menuClient: MenuClient;

  constructor(menuClient: MenuClient) {
    this.menuClient = menuClient;
  }

  async getItems() {
    return this.menuClient.items();
  }
}

export const getMenuService = () => new MenuService(new CheeseCakeFactoryMenuClient())
