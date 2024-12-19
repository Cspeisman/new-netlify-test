import {useEffect, useMemo, useState} from "react";
import {getMenuService, MenuItem} from "../MenuService.ts";

const useMenuItems = () => {
  const [items, setItems] = useState<MenuItem[]>([]);
  const [eaten, setEaten] = useState<Set<string>>(new Set());

  let menuService = useMemo(getMenuService, []);

  useEffect(() => {
    const getItems = async () => menuService.getItems();
    const getEaten = async () => menuService.getEatenItems();
    getItems().then(i => setItems(i));
    getEaten().then(i => setEaten(i));
  }, []);

  const markedAsEaten = async (name: string) => {
    let success = await menuService.saveEatenItem(name);
    if (success) {
      let newEaten = await menuService.getEatenItems();
      setEaten(new Set(Array.from(newEaten)));
    }
  }

  return {items, eaten, markedAsEaten};
}

export const MenuView = () => {
  const {items, eaten, markedAsEaten} = useMenuItems();

  return (
    <>
      {items.map((item, index) => {
        return (<div key={index}>
          <input type="checkbox" id={item.name} checked={eaten.has(item.name)} onChange={() => markedAsEaten(item.name)}/>
          <label htmlFor={item.name}>{item.name}</label>
        </div>)
      })}
    </>
  );
}
