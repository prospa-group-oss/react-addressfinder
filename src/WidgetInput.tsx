import React, {
  useEffect,
  useState,
  useRef,
  DetailedHTMLProps,
  InputHTMLAttributes,
} from "react";
import { Country, ContainerPrefix, AddressFinderWidgetSrc } from "./constants";
import { window } from "./globals";
import {
  Address,
  AddressMeta,
  AustraliaAddressLocationParams,
  AustraliaAddressMetadataParams,
  AustraliaAddressParams,
  NewZealandAddressMetadataParams,
  NewZealandAddressParams,
  NewZealandLocationParams,
} from "./types";
import { addressMetaToAddress } from "./helpers";
import "./widget.css";

export interface Props
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  id: string;
  addressFinderKey: string;
  addressMetadataParams?: AustraliaAddressMetadataParams &
    NewZealandAddressMetadataParams;
  addressParams?: AustraliaAddressParams & NewZealandAddressParams;
  baseUrl?: String;
  canonical?: boolean;
  container?: HTMLElement;
  country?: Country;
  emptyClassName?: string;
  emptyContent?: string;
  footerClassName?: string;
  hoverClassName?: string;
  ignoreReturns?: boolean;
  inputClassName?: string;
  itemClassName?: string;
  listClassName?: string;
  locationParams?: AustraliaAddressLocationParams & NewZealandLocationParams;
  manualStyle?: boolean;
  maxResults?: number;
  onSelected: (fullAddress: string, address: Address) => void;
  position?: string;
  showAddresses?: boolean;
  showLocations?: boolean;
  showNearby?: boolean;
  showPointsOfInterest?: boolean;
}

export default ({
  id,
  addressFinderKey,
  addressMetadataParams,
  addressParams = {},
  baseUrl = "https://api.addressfinder.io",
  canonical = false,
  container,
  country = Country.AU,
  emptyClassName = "af_empty",
  emptyContent = "No addresses were found. This could be a new address, or you may need to check the spelling.",
  footerClassName = "af_footer",
  hoverClassName = "address-autocomplete__suggestions__item--active",
  ignoreReturns = true,
  inputClassName,
  itemClassName = "address-autocomplete__suggestions__item",
  listClassName = "address-autocomplete__suggestions",
  locationParams = {},
  manualStyle = true,
  maxResults = 5,
  onSelected,
  position = "",
  showAddresses = true,
  showLocations = true,
  showNearby = false,
  showPointsOfInterest = false,
  ...props
}: Props) => {
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const mounted = useRef(false);

  useEffect(() => {
    mounted.current = true;
    if (window.AddressFinder) {
      setScriptLoaded(true);
      return;
    }
    const script = document.createElement("script");
    script.src = AddressFinderWidgetSrc;
    script.async = true;
    script.addEventListener("load", () => {
      if (mounted.current) {
        setScriptLoaded(true);
      }
    });
    window.document.body.appendChild(script);
    return () => {
      mounted.current = false;
      window.document.body.removeChild(script);
    };
  }, []);

  useEffect(() => {
    if (scriptLoaded && mounted.current) {
      const widget = new window.AddressFinder.Widget(
        document.getElementById(id),
        addressFinderKey,
        country,
        {
          /* eslint-disable @typescript-eslint/camelcase */
          address_params: addressParams,
          address_metadata_params: addressMetadataParams,
          base_url: baseUrl,
          canonical,
          container:
            container || document.getElementById(`${ContainerPrefix}-${id}`),
          empty_class: emptyClassName,
          empty_content: emptyContent,
          footer_class: footerClassName,
          hover_class: hoverClassName,
          ignore_returns: ignoreReturns,
          item_class: itemClassName,
          list_class: listClassName,
          location_params: locationParams,
          manual_style: manualStyle,
          max_results: maxResults,
          position,
          show_addresses: showAddresses,
          show_locations: showLocations,
          show_nearby: showNearby,
          show_points_of_interest: showPointsOfInterest,
          /* eslint-enable @typescript-eslint/camelcase */
        }
      );

      widget.on(
        "address:select",
        (fullAddress: string, metaData: AddressMeta) => {
          onSelected(fullAddress, addressMetaToAddress(metaData, country));
        }
      );
    }
  }, [id, country, scriptLoaded]);

  return (
    <>
      <input
        aria-autocomplete="list"
        aria-haspopup={true}
        aria-owns={container ? container.id : `${ContainerPrefix}-${id}`}
        type="text"
        autoComplete="off"
        className={inputClassName}
        id={id}
        {...props}
      />
      {!container && (
        <div
          id={`${ContainerPrefix}-${id}`}
          className="address-autocomplete"
        ></div>
      )}
    </>
  );
};
