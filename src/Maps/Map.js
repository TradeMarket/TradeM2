import React, { useState, useEffect, useRef } from "react";
import "leaflet/dist/leaflet.css";
import "./Map.css";
import { getDatabase, ref, get } from "firebase/database";
import axios from "axios";

import { MapContainer, TileLayer, Marker, Popup, Circle } from "react-leaflet";
import { Icon } from "leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import AllProducts from "../components/AllProducts";
import haversine from 'haversine-distance';

export default function Map() {
  const [allProductMarkers, setAllProductMarkers] = useState([]);
  const [visibleProductMarkers, setVisibleProductMarkers] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [radius, setRadius] = useState(9000);
  const [mapType, setMapType] = useState("normal");
  const [address, setAddress] = useState("");
  const mapRef = useRef();

  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };

  const locateAddress = async () => {
    console.log("Locating address:", address);
    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/search?q=${address}&format=json`
      );
      if (response.data && response.data.length > 0) {
        const { lat, lon } = response.data[0];
        setUserLocation([parseFloat(lat), parseFloat(lon)]);
        if (mapRef.current) {
          const map = mapRef.current;
          map.setView([parseFloat(lat), parseFloat(lon)], 13);
        }
      } else {
        console.log("Address not found");
      }
    } catch (error) {
      console.error("Error geocoding address:", error);
    }
  };

  useEffect(() => {
    const db = getDatabase();
    const productsRef = ref(db, "Products");
    get(productsRef).then((snapshot) => {
      if (snapshot.exists()) {
        const productsData = snapshot.val();
        const productsList = Object.values(productsData);
        const locations = productsList.map((product) => {
          const [lat, lng] = product.location.split(",");
          return {
            geocode: [+lat, +lng],
            productDetails: product,
          };
        });
        setAllProductMarkers(locations);
      }
    });
  }, []);
  
  useEffect(() => {
    if (userLocation) {
      const nearbyProducts = allProductMarkers.filter((marker) => {
        const distance = haversine(userLocation, marker.geocode);
        return distance <= radius;
      });
      setVisibleProductMarkers(nearbyProducts);
    }
  }, [userLocation, radius, allProductMarkers]);


  const customIcon = new Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/128/684/684908.png",
    iconSize: [38, 38],
  });

  const locateUser = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation([latitude, longitude]);

        if (mapRef.current) {
          const map = mapRef.current;
          map.setView([latitude, longitude], 13);
        }
      },
      (error) => {
        console.error("Error getting user location:", error);
      }
    );
  };

  const toggleMapType = () => {
    setMapType(mapType === "normal" ? "satellite" : "normal");
  };

  return (
    <div className="all-container">
      <div className="allProducts-Container">
        < AllProducts/>
      </div>
    <div className="mapContainer">
      <div className="address-container">
        <div className="input-container">
          <input
            type="text"
            placeholder="Enter Address"
            value={address}
            onChange={handleAddressChange}
          />
        </div>
        <button className="locateButton" onClick={locateAddress}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-search"
            viewBox="0 0 16 16"
          >
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
          </svg>
        </button>

        <button className="locateButton" onClick={locateUser}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="red"
            class="bi bi-geo-alt"
            viewBox="0 0 16 16"
          >
            <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A31.493 31.493 0 0 1 8 14.58a31.481 31.481 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94zM8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10z" />
            <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
          </svg>
        </button>
        <button className="locateButton" onClick={toggleMapType}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-eye"
            viewBox="0 0 16 16"
          >
            <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
            <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
          </svg>
        </button>
      </div>
      <MapContainer
        ref={mapRef}
        center={userLocation || [48.8566, 2.3522]}
        zoom={userLocation ? 13 : 7}
      >
        {mapType === "normal" ? (
          <TileLayer
            attribution="© OpenStreetMap"
            url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
        ) : (
          <TileLayer
            attribution="© OpenStreetMap Contributors"
            url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
          />
        )}
        {userLocation && (
          <>
            <Circle center={userLocation} radius={radius} />
            {/* <Marker position={userLocation} icon={customIcon}>
              <Popup>
                <h2>Your Location</h2>
              </Popup>
            </Marker> */}
          </>
        )}

        <MarkerClusterGroup chunkedLoading>
          {visibleProductMarkers.map((marker, idx) => (
            <Marker key={idx} position={marker.geocode} icon={customIcon}>
              <Popup>
                <h2>{marker.productDetails.name}</h2>
                <img
                  src={marker.productDetails.imageUrl}
                  alt={marker.productDetails.name}
                  width="100"
                />
                <p>Category: {marker.productDetails.category}</p>
                <p>{marker.productDetails.description}</p>
                <p>Price: ${marker.productDetails.price}</p>
              </Popup>
            </Marker>
          ))}
        </MarkerClusterGroup>
      </MapContainer>
    </div>
    </div>
  );
}
