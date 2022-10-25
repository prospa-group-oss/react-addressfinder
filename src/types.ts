export interface AddressMeta {
  id: string;
  address_line_1: string;
  address_line_2: string;
  locality_name: string;
  state_territory: string;
  postcode: string;
  full_address: string;
  canonical_address: string; // official address recorded by aus post
  suburb: string;
  city: string;
}

export interface Address {
  line1: string;
  line2: string;
  suburb: string;
  state?: string;
  postcode: string;
  country: string;
  city?: string;
}

export interface AddressParams {
  // AU address params

  gnaf?: string;
  au_paf?: string;
  canonical?: string;
  state_codes?: string;

  // NZ address params

  delivered?: string;
  rural?: string;
  region_codes?: string;

  // common address params

  post_box?: string;
  max?: number;
}
