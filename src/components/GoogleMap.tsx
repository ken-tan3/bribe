import { useEffect, useState } from "react";
import GoogleMapReact from "google-map-react";
import { Card, Spacer } from "@nextui-org/react";

const GoogleMap = ({
  map,
  setMap,
  maps,
  setMaps,
  setGeocoder,
  googleMapLatLng,
}) => {
  const defaultLatLng = {
    lat: -1.2920659,
    lng: 36.8219462,
  };
  const [marker, setMarker] = useState(null);

  useEffect(() => {
    // Call when maps are set in first loading
    if (maps && googleMapLatLng) {
      // Put marker at center!
      map.setCenter(googleMapLatLng);
      if (marker) {
        marker.setMap(null);
      }
      if (googleMapLatLng.lat && googleMapLatLng.lng) {
        setMarker(
          new maps.Marker({
            map,
            position: googleMapLatLng,
          })
        );
      }
    }
  }, [maps]);

  const handleApiLoaded = (obj) => {
    setMap(obj.map);
    setMaps(obj.maps);
    setGeocoder(new obj.maps.Geocoder());
  };

  return (
    <>
      <Spacer y={0.5} />
      <Card css={{ h: "300px", w: "100%" }}>
        <GoogleMapReact
          style={{ p: 0, m: 0 }}
          bootstrapURLKeys={{
            key: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
          }}
          defaultCenter={defaultLatLng}
          defaultZoom={10}
          // first loading
          onGoogleApiLoaded={handleApiLoaded}
        />
      </Card>
      <Spacer y={1} />
    </>
  );
};

export default GoogleMap;
