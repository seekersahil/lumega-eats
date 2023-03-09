import { useState, useEffect } from "react";
import { useLocation } from "../utils";

const useRestaurantInfoImport = (id) => {
  const [restaurantMenu, setRestaurantMenu] = useState({});
  const coordinates = useLocation();
  async function importRestaurantInfo(id) {
    try {
      const data = await fetch(
        `https://justcors.com/${process.env.JUSTCORS_TOKEN}/${process.env.RESTAURANT_MENU_API}/?lat=${coordinates.lat}&lng=${coordinates.lng}&menuId=${id}`
      );
      const json = await data.json();
      setRestaurantMenu(json.data);
    } catch (err) {
      return err;
    }
  }
  useEffect(() => {
    importRestaurantInfo(id);
  }, []);

  return restaurantMenu;
};

export default useRestaurantInfoImport;
