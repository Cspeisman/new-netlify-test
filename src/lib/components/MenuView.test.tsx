import {describe, it, vi} from "vitest";
import {MenuView} from "./MenuView.tsx";
import {render, screen} from "@testing-library/react";
import * as MenuServiceModule from "../MenuService.ts";
import {MenuService} from "../MenuService.ts";
import {MenuClientStub} from "../MenuClient.ts";

describe('MenuView', () => {
  it('should list all menu items', async () => {
    vi.spyOn(MenuServiceModule, 'getMenuService').mockReturnValue(new MenuService(new MenuClientStub(5)))
    render(<MenuView/>);
    await screen.findByText('item 1');
    await screen.findByText('item 5');
  });
});
