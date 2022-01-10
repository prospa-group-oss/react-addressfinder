import React, {
  useEffect,
  useRef,
  useState,
  DetailedHTMLProps,
  FC,
  InputHTMLAttributes,
} from 'react';

import { AddressFinderWidgetSrc, ContainerPrefix, Country } from './constants';
import { addressMetaToAddress } from './helpers';
import { Address, AddressMeta } from './types';

import './widget.css';

interface WidgetInputProps
  extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  id: string;
  onSelected: (fullAddress: string, address: Address | AddressMeta) => void;
  addressFinderKey: string;
  country?: Country;
  container?: HTMLElement;
  inputClassName?: string;
  listClassName?: string;
  itemClassName?: string;
  hoverClassName?: string;
  raw?: boolean;
}

export type Props = WidgetInputProps;

const WidgetInput: FC<WidgetInputProps> = ({
  id,
  country = Country.AU,
  container,
  onSelected,
  inputClassName,
  listClassName = 'address-autocomplete__suggestions',
  itemClassName = 'address-autocomplete__suggestions__item',
  hoverClassName = 'address-autocomplete__suggestions__item--active',
  addressFinderKey,
  raw = false,
  ...props
}) => {
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const mounted = useRef(false);

  useEffect(() => {
    mounted.current = true;
    if (window.AddressFinder) {
      setScriptLoaded(true);
      return;
    }
    const script = document.createElement('script');
    script.src = AddressFinderWidgetSrc;
    script.async = true;
    script.addEventListener('load', () => {
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
        document.getElementById(id) as HTMLElement,
        addressFinderKey,
        country,
        {
          list_class: listClassName,
          item_class: itemClassName,
          hover_class: hoverClassName,
          manual_style: true,
          container: container || document.getElementById(`${ContainerPrefix}-${id}`),
          address_params: {},
          max_results: 5,
        },
      );

      widget.on('address:select', (fullAddress, metaData) => {
        let addressData: Address | AddressMeta = { ...metaData, country };

        if (!raw) {
          addressData = addressMetaToAddress(metaData, country);
        }

        onSelected(fullAddress, addressData);
      });
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
      {!container && <div id={`${ContainerPrefix}-${id}`} className="address-autocomplete"></div>}
    </>
  );
};

export default WidgetInput;
