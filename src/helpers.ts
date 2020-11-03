import { AddressMeta, Address } from "./types";
import { Country } from "./constants";

const addressMetaToAddress = (meta: AddressMeta, country: string): Address => {
  if (country === Country.AU) {
    return {
      line1: meta.address_line_1,
      line2: meta.address_line_2,
      suburb: meta.locality_name,
      state: meta.state_territory,
      postcode: meta.postcode,
      country,
    };
  }

  return {
    line1: meta.address_line_1,
    line2: meta.address_line_2,
    suburb: meta.suburb,
    city: meta.city,
    postcode: meta.postcode,
    country,
  };
};

export { addressMetaToAddress };
