import {describe, expect, it, vi} from "vitest";
import {MenuView} from "./MenuView.tsx";
import {fireEvent, render, screen, waitFor} from "@testing-library/react";
import * as MenuServiceModule from "../MenuService.ts";
import {MenuService} from "../MenuService.ts";
import {MenuClientStub} from "../MenuClient.ts";
import {EatenStoreFake} from "../EatenStore.ts";

describe('MenuView', () => {
  it('should mark items as eaten', async () => {
    // setup
    let eatenStoreFake = new EatenStoreFake();
    await eatenStoreFake.saveItem('item 1');
    vi.spyOn(MenuServiceModule, 'getMenuService').mockReturnValue(new MenuService(new MenuClientStub(5), eatenStoreFake));

    // implementation
    render(<MenuView/>);
    let item = await screen.findByLabelText('item 1');
    expect(item).toHaveProperty('checked', true);

    item = await screen.findByLabelText('item 2');
    expect(item).toHaveProperty('checked', false);
    fireEvent.click(item);
    await waitFor(() => {
      expect(item).toHaveProperty('checked', true);
    })
  });
});
