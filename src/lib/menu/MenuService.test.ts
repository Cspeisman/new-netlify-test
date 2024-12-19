import {describe, expect, it} from "vitest";
import {MenuService} from "./MenuService.ts";
import {MenuClientStub} from "./MenuClient.ts";
import {type EatenStore, EatenStoreFake} from "./EatenStore.ts";

describe('MenuService', () => {
  it('should list menu items', async () => {
    let menuService = new MenuService(new MenuClientStub(5), {} as EatenStore);
    const items = await menuService.getItems();
    expect(items).toHaveLength(5);
    expect(items[0].name).toBe('item 1');
  });

  it('should mark items as eaten', async () => {
    let menuService = new MenuService(new MenuClientStub(5), new EatenStoreFake());
    await menuService.saveEatenItem('item 1');
    let eaten = await menuService.getEatenItems();
    expect(eaten.has('item 1')).toBeTruthy();
  });
});
