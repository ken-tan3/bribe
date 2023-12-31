import { useMemo, useState } from "react";
import { Input } from "@nextui-org/react";

import { SiGooglemaps } from "react-icons/si";

const BribeEditGoogleMapInput = ({
  map,
  maps,
  geocoder,
  setGoogleMapLatLng,
  value,
  setValue,
  reset,
  bindings,
  isGoogleMapInputValid,
  setIsGoogleMapInputValid,
}) => {
  const helper = useMemo(() => {
    if (!value)
      return {
        text: "",
        color: "",
      };
    return {
      text: isGoogleMapInputValid ? "" : "Address Not Found",
      color: isGoogleMapInputValid ? "" : "error",
    };
  }, [isGoogleMapInputValid, value]);

  const onBlur = (e) => {
    e.preventDefault();
    const address = value;
    geocoder.geocode(
      {
        address,
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
          // put newLatLng to the center in the map
          map.setCenter(newLatLng);
          setIsGoogleMapInputValid(true);
        } else {
          setIsGoogleMapInputValid(false);
        }
      }
    );
  };

  const onClearClick = () => {
    reset; //useInput hooks to clear googleMapAddress
    setGoogleMapLatLng(null);
  };
  return (
    <Input
      {...bindings}
      clearable
      shadow={false}
      // @ts-ignore
      status={helper.color}
      // @ts-ignore
      color={helper.color}
      // @ts-ignore
      helperColor={helper.color}
      helperText={helper.text}
      onClearClick={onClearClick}
      autoComplete="on"
      size="md"
      fullWidth
      //@ts-ignore
      label={
        <>
          <SiGooglemaps /> Where Bribed (Interact With Google Map)
        </>
      }
      placeholder="Anywhere"
      onBlur={onBlur}
    />
  );
};

export default BribeEditGoogleMapInput;
