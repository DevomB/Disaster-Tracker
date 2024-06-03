import { useState } from "react";
import GoogleMap from "google-maps-react-markers";
import styles from "@/styles/Map.module.css";
import LocationMarker from "./LocationMarker";
import LocationInfoBox from "./LocationInfoBox";

const Map = ({ eventData, center, zoom, options, eventOptions, offline }) => {
  const [locationInfo, setLocationInfo] = useState(null);

  const markers = eventData
    .filter((ev) => eventOptions[ev.categories[0]?.id])
    .map((ev, index) => {
      const { coordinates } = ev.geometry[0];
      const [lng, lat] = coordinates;
      return (
        <LocationMarker
          key={index}
          lat={lat}
          lng={lng}
          type={ev.categories[0]?.title}
          onClick={() => setLocationInfo({ id: ev.id, title: ev.title })}
        />
      );
    });

  return (
    <div className={styles.map}>
      <GoogleMap
        apiKey={offline ? "" : process.env.NEXT_PUBLIC_G_MAPS_API} // Ensure the correct environment variable
        center={center}
        defaultCenter={center}
        defaultZoom={zoom}
        options={options}
      >
        {markers}
      </GoogleMap>
      {locationInfo && <LocationInfoBox info={locationInfo} />} {/* Conditional rendering */}
    </div>
  );
};

Map.defaultProps = {
  center: {
    lat: 10,
    lng: -10,
  },
  zoom: 3,
  offline: true,
  options: {
    disableDefaultUI: true,
    gestureHandling: "greedy",
    minZoom: 2,
    restriction: {
      latLngBounds: { north: 85, south: -80, west: -180, east: 180 },
    },
  },
};

export default Map;
