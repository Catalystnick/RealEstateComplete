import React, { useRef } from "react";
import "./map.scss";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMapEvent,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import Pin from "../pin/pin";

function SetViewOnClick({ animateRef }) {
  const map = useMapEvent("click", (e) => {
    map.setView(e.latlng, map.getZoom(), {
      animate: animateRef.current || false,
    });
  });

  return null;
}

const MapEvents = ({ setCoordinates }) => {
  useMapEvents({
    click(e) {
      // setState your coords here
      // coords exist in "e.latlng.lat" and "e.latlng.lng"
      if (setCoordinates) {
        setCoordinates([e.latlng.lat, e.latlng.lng]);
      }
    },
  });
  return false;
};

function Map({ items, setCoordinates = null }) {
  const animateRef = useRef(true);

  return (
    <MapContainer
      center={
        items?.lengths === 1
          ? [items[0].latitude, items[0].longitude]
          : [6.927079, 79.861244]
      }
      zoom={6}
      minZoom={3}
      scrollWheelZoom={true}
      className="map"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {items.map((item) => (
        <Pin item={item} key={item.id} />
      ))}
      <SetViewOnClick animateRef={animateRef} />
      <MapEvents setCoordinates={setCoordinates} />
    </MapContainer>
  );
}

export default Map;
