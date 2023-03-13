import { useEffect, useState } from "react";
import { useLocation } from "../utils";

const useRestaurantListImport = (filter = "RELEVANCE", offset = 0) => {
  const [restaurantList, setRestaurantList] = useState([]);
  const [sorts, setSorts] = useState([]);
  const [carouselsList, setCarouselsList] = useState([]);
  const [totalOpenRestaurants, setTotalOpenRestaurants] = useState(Infinity);
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const [totalSize, setTotalSize] = useState(77);
  const coordinates = useLocation();

  async function getRestaurantList(filter, offset) {
    if (totalSize > offset) {
      try {
        setIsFetchingMore(true);
        const data = await fetch(
          `https://justcors.com/${process.env.JUSTCORS_TOKEN}/${
            process.env.RESTAURANTS_LIST_API
          }?lat=${coordinates.lat}&lng=${coordinates.lng}&${
            offset
              ? `offset=${offset}&pageType=SEE_ALL&page_type=DESKTOP_SEE_ALL_LISTING&`
              : "&page_type=DESKTOP_WEB_LISTING&"
          }sortBy=${filter}`
        );
        const json = await data.json();
        let cards = json?.data?.cards;
        setTotalSize((prev) => +json?.data?.totalSize || prev);
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
  }

  useEffect(() => {
    getRestaurantList(filter, offset);
  }, [filter, offset, coordinates]);

  return {
    restaurantList,
    sorts,
    carouselsList,
    totalOpenRestaurants,
    isFetchingMore,
    totalSize,
    setTotalSize,
  };
};

export default useRestaurantListImport;
