import { useState, useEffect } from "react";

const useLocation = () => {
  const [coordinates, setCoordinates] = useState({
    lat: "29.8042758",
    lng: "76.4039016",
  });
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) =>
        setCoordinates({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        })
      );
    }
  });
  return coordinates;
};

export default useLocation;
