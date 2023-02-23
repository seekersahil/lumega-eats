import { useEffect, useState } from "react";

const useRestaurantListImport = (filter = "RELEVANCE") => {
  const [restaurantList, setRestaurantList] = useState([]);
  const [sorts, setSorts] = useState([]);
  const [carouselsList, setCarouselsList] = useState([]);

  async function getRestaurantList(filter) {
    const data = await fetch(
      process.env.RESTAURANTS_LIST_API +
        `?lat=29.8042758&lng=76.4039016&sortBy=${filter}&page_type=DESKTOP_WEB_LISTING`
    );
    const json = await data.json();
    let index = {
      RELEVANCE: 2,
    };
    setRestaurantList(json.data?.cards[index[filter] || 0]?.data?.data?.cards);
    setSorts(json.data?.sorts);
    if (filter === "RELEVANCE") {
      setCarouselsList(json.data?.cards[0]?.data?.data?.cards);
    }
  }

  useEffect(() => {
    getRestaurantList(filter);
  }, [filter]);

  return { restaurantList, sorts, carouselsList };
};

export default useRestaurantListImport;
