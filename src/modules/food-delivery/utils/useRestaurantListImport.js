import { useEffect, useState } from "react";

const useRestaurantListImport = (filter = "RELEVANCE") => {
  const [restaurantList, setRestaurantList] = useState([]);
  const [sorts, setSorts] = useState([]);
  const [carouselsList, setCarouselsList] = useState([]);

  async function getRestaurantList(filter) {
    try {
      const data = await fetch(
        process.env.RESTAURANTS_LIST_API +
          `?lat=29.8042758&lng=76.4039016&sortBy=${filter}&page_type=DESKTOP_WEB_LISTING`
      );
      const json = await data.json();
      let index = {
        RELEVANCE: 2,
      };
      let cards = json.data.cards;
      cards?.forEach((card) => {
        if (card?.cardType === "seeAllRestaurants") {
          setRestaurantList(card?.data?.data?.cards || []);
        }
        if (
          card?.cardType === "carousel" &&
          card?.data?.subtype === "topCarousel"
        ) {
          setCarouselsList(card?.data?.data?.cards || []);
        }
      });
      setSorts(json.data?.sorts);
    } catch (e) {
      return;
    }
  }

  useEffect(() => {
    getRestaurantList(filter);
  }, [filter]);

  return { restaurantList, sorts, carouselsList };
};

export default useRestaurantListImport;
