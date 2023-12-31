import { useEffect, useState } from "react";
import GoogleMapReact from "google-map-react";
import { Card, Spacer } from "@nextui-org/react";

const BribeEditGoogleMap = ({
  map,
  setMap,
  maps,
  setMaps,
  geocoder,
  setGeocoder,
  googleMapLatLng,
  setGoogleMapLatLng,
  setValue,
  setIsGoogleMapInputValid,
  isNew,
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
      if (googleMapLatLng.lat && googleMapLatLng.lng) {
        map.setCenter(googleMapLatLng);
      }
      if (marker) {
        marker.setMap(null);
      }
      // Put marker in editPage
      if (googleMapLatLng.lat && googleMapLatLng.lng && !isNew) {
        setMarker(
          new maps.Marker({
            map,
            position: googleMapLatLng,
          })
        );
      }
    }
  }, [maps]);

  useEffect(() => {
    // Call when googleMapLatLng is updated
    if (maps && googleMapLatLng) {
      // Don't put marker at center!
      if (marker) {
        marker.setMap(null);
      }
      setMarker(
        new maps.Marker({
          map,
          position: googleMapLatLng,
        })
      );
    }
  }, [googleMapLatLng]);

  const handleApiLoaded = (obj) => {
    setMap(obj.map);
    setMaps(obj.maps);
    setGeocoder(new obj.maps.Geocoder());
  };

  const onClick = ({ x, y, lat, lng, event }) => {
    const location = {
      lat: lat,
      lng: lng,
    };
    geocoder.geocode(
      {
        location,
      },
      (results, status) => {
        if (status === maps.GeocoderStatus.OK) {
          const newAddress = results[0].formatted_address;
          const newLatLng = {
            lat: results[0].geometry.location.lat(),
            lng: results[0].geometry.location.lng(),
          };

          // set googleMapAddress
          setValue(newAddress);
          setGoogleMapLatLng(newLatLng);
          setIsGoogleMapInputValid(true);
        }
      }
    );
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
          // user action
          onClick={onClick}
        />
      </Card>
      <Spacer y={1} />
    </>
  );
};

export default BribeEditGoogleMap;
