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

export interface AustraliaAddressParams {
  gnaf?: string;
  au_paf?: string;
  post_box?: string;
  canonical?: string;
  state_codes?: string;
}

export interface NewZealandAddressParams {
  delivered?: string;
  post_box?: string;
  rural?: string;
  region_code?: string;
}

export interface NewZealandAddressMetadataParams {
  a?: string;
  postal?: string;
  building_name?: string;
  unit_type?: string;
  unit_identifier?: string;
  floor?: string;
  number?: string;
  alpha?: string;
  street?: string;
  street_name?: string;
  post_street?: string;
  post_street_name?: string;
  street_type?: string;
  street_suffix?: string;
  suburb?: string;
  city?: string;
  box_type?: string;
  lobby_name?: string;
  rd_number?: string;
  post_suburb?: string;
  mailtown?: string;
  postcode?: string;
  dpid?: string;
  primary_parcel_id?: string;
  aims_address_id?: string;
  x?: string;
  y?: string;
  meshblock?: string;
  sa1_id?: string;
  sa2_id?: string;
  sa2?: string;
  rural?: boolean;
  ur?: string;
  ur_id?: string;
  iur?: string;
  iur_id?: string;
  aims_road_section_id?: string;
  region?: string;
  region_id?: string;
  ta?: string;
  ta_id?: string;
  con?: string;
  con_id?: string;
  maoricon?: string;
  maoricon_id?: string;
  ward?: string;
  ward_id?: string;
  cb?: string;
  cb_id?: string;
  tasub?: string;
  tasub_id?: string;
  landwater?: string;
  landwater_id?: string;
  address_line_1?: string;
  address_line_2?: string;
  pxid?: string;
  success?: boolean;
}

export interface AustraliaAddressMetadataParams {
  full_address?: string;
  id?: string;
  canonical_address?: string;
  canonical_address_id?: string;
  latitude?: string;
  longitude?: string;
  lot_identiifer?: string;
  box_identifier?: string;
  box_type?: string;
  site_name?: string;
  level_type?: string;
  level_number?: string;
  unit_type?: string;
  unit_identifier?: string;
  street_number_1?: string;
  street_number_2?: string;
  street?: string;
  street_name?: string;
  street_type?: string;
  street_suffix?: string;
  locality_name?: string;
  state_territory?: string;
  postcode?: string;
  address_line_1?: string;
  address_line_2?: string;
  success?: boolean;
  dpid?: string;
  lga_name?: string;
  lga_type_code?: string;
  legal_parcel_id?: string;
  meshblock?: string;
  sa1_id?: string;
  sa2_id?: string;
  gnaf_id?: string;
}

export interface NewZealandLocationParams {
  street?: string;
  suburb?: string;
  city?: string;
  region?: string;
  region_code?: string;
  strict?: string;
}

export interface AustraliaAddressLocationParams {
  location_types?: string;
  state_codes?: string;
}
