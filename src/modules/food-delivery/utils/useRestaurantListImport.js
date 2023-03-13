import { useEffect, useState } from "react";

const useRestaurantListImport = (filter = "RELEVANCE", offset = 0) => {
  const [restaurantList, setRestaurantList] = useState([]);
  const [sorts, setSorts] = useState([]);
  const [carouselsList, setCarouselsList] = useState([]);
  const [totalOpenRestaurants, setTotalOpenRestaurants] = useState(Infinity);
  const [isFetchingMore, setIsFetchingMore] = useState(false);

  async function getRestaurantList(filter, offset) {
    try {
      const data = await fetch(
        `https://justcors.com/${process.env.JUSTCORS_TOKEN}/${
          process.env.RESTAURANTS_LIST_API
        }?lat=29.8042758&lng=76.4039016&${
          offset
            ? `offset=${offset}&pageType=SEE_ALL&page_type=DESKTOP_SEE_ALL_LISTING&`
            : "&page_type=DESKTOP_WEB_LISTING&"
        }sortBy=${filter}`
      );
      const json = await data.json();
      let cards = json?.data?.cards;
      if (offset === 0) {
        cards?.forEach((card) => {
          if (card?.cardType === "seeAllRestaurants") {
            setRestaurantList(card?.data?.data?.cards || []);
            setTotalOpenRestaurants(card?.data?.data?.totalOpenRestaurants);
          }
          if (
            card?.cardType === "carousel" &&
            card?.data?.subtype === "topCarousel"
          ) {
            setCarouselsList(card?.data?.data?.cards || []);
          }
        });
        setSorts(json.data?.sorts);
      } else {
        let cardsData = cards.map((card) => card.data);
        setRestaurantList((prev) => [...prev, ...cardsData]);
        setIsFetchingMore(false);
      }
    } catch (err) {
      return err;
    }
  }

  useEffect(() => {
    getRestaurantList(filter, offset);
  }, [filter, offset]);

  return {
    restaurantList,
    sorts,
    carouselsList,
    totalOpenRestaurants,
    isFetchingMore,
    setIsFetchingMore,
  };
};

export default useRestaurantListImport;
