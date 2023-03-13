import { useState, useEffect } from "react";
import { useLocation } from "../utils";

const useSearch = (searchTerm = "") => {
  const [suggestions, setSuggestions] = useState([]);
  const coordinates = useLocation();

  const search = async (searchTerm) => {
    const data = await fetch(
      `https://justcors.com/${process.env.JUSTCORS_TOKEN}/${process.env.SEARCH_API}?lat=${coordinates.lat}&lng=${coordinates.lng}&str=${searchTerm}&trackingId=undefined`
    );
    const json = await data.json();
    setSuggestions(
      json?.data?.suggestions?.filter((item) => item.type === "RESTAURANT") ||
        []
    );
  };

  useEffect(() => {
    search(searchTerm);
  }, [searchTerm, coordinates]);

  return { suggestions };
};

export default useSearch;
