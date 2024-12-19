import {describe, expect, it} from "vitest";
import {MenuService} from "./MenuService.ts";
import {MenuClientStub} from "./MenuClient.ts";

describe('MenuService', () => {
  it('should list menu items', async () => {
    let menuService = new MenuService(new MenuClientStub(5));
    const items = await menuService.getItems();
    expect(items).toHaveLength(5);
    expect(items[0].name).toBe('item 1');
  });
});
