import {useEffect, useState} from "react";
import {getMenuService, MenuItem} from "../MenuService.ts";

export const MenuView = () => {
  const [items, setItems] = useState<MenuItem[]>([]);

  useEffect(() => {
    const getItems = async () => getMenuService().getItems();
    getItems().then(i => setItems(i));
  }, []);

  return (
    <>
      {items.map((item, index) => {
        return <div key={index}>{item.name}</div>
      })}
    </>
  );
}
