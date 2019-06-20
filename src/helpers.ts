import { AddressMeta, Address } from './types';

const addressMetaToAddress = (meta: AddressMeta, country: string): Address => ({
  line1: meta.address_line_1,
  line2: meta.address_line_2,
  suburb: meta.locality_name,
  state: meta.state_territory,
  postcode: meta.postcode,
  country
});

export { addressMetaToAddress };
