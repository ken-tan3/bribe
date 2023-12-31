// This utils is no longer used after delete in googlemapUrl feature.

export const validateGoogleMapUrl = (value) => {
  // return boolean
  return (
    value.startsWith("https://www.google.com/maps") ||
    value.startsWith("https://goo.gl/maps")
  );
};

export const getMapInfoFromGoogleMapUrl = async (googleUrl) => {
  if (googleUrl) {
    if (googleUrl.startsWith("https://www.google.com/maps")) {
      return [googleUrl];
    } else if (googleUrl.startsWith("https://goo.gl/maps")) {
      try {
        await fetch(googleUrl, {
          method: "HEAD",
          mode: "cors",
        }).then((response) => {
          const responseUrl = response.url;
          return [googleUrl];
        });
      } catch (e) {
        return [googleUrl];
      }
    }
  }
  return [googleUrl];
};

export const splitGoogleMapUrlIntoDbInsertValue = (googleUrl) => {};
