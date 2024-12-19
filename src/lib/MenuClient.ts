import {MenuItem} from "./MenuService.ts";


export interface MenuClient {
  items(): Promise<MenuItem[]>
}

export class MenuClientStub implements MenuClient {
  menuItems: MenuItem[] = [];

  constructor(num = 3) {
    for (let i = 0; i < num; i++) {
      this.menuItems.push(new MenuItem(`item ${i + 1}`))
    }
  }

  items(): Promise<MenuItem[]> {
    return Promise.resolve(this.menuItems);
  }
}

export class CheeseCakeFactoryMenuClient implements MenuClient {
  url = 'https://www.thecheesecakefactory.com/api/olo/restaurants/171338/menu?nomnom=add-restaurant-to-menu&includedisabled=true';

  async items(): Promise<MenuItem[]> {
    const results: MenuItem[] = [];
    let response = await fetch(this.url);
    let menuResponse = await response.json();
    for (const category of menuResponse.categories) {
      category.products.forEach((p: { name: string; }) => results.push(new MenuItem(p.name)));
    }
    return results;
  }
}
