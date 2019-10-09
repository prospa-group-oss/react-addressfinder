import React, {
  useEffect,
  useState,
  useRef,
  DetailedHTMLProps,
  InputHTMLAttributes
} from 'react';
import { Country, ContainerPrefix, AddressFinderWidgetSrc } from './constants';
import { window } from './globals';
import { AddressMeta, Address } from './types';
import { addressMetaToAddress } from './helpers';
import './widget.css';

export interface Props
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  id: string;
  onSelected: (fullAddress: string, address: Address) => void;
  addressFinderKey: string;
  country?: Country;
  container?: HTMLElement;
  inputClassName?: string;
  listClassName?: string;
  itemClassName?: string;
  hoverClassName?: string;
}

export default ({
  id,
  country = Country.AU,
  container,
  onSelected,
  inputClassName,
  listClassName = 'address-autocomplete__suggestions',
  itemClassName = 'address-autocomplete__suggestions__item',
  hoverClassName = 'address-autocomplete__suggestions__item--active',
  addressFinderKey,
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
        document.getElementById(id),
        addressFinderKey,
        country,
        {
          /* eslint-disable @typescript-eslint/camelcase */
          list_class: listClassName,
          item_class: itemClassName,
          hover_class: hoverClassName,
          manual_style: true,
          container:
            container || document.getElementById(`${ContainerPrefix}-${id}`),
          address_params: {},
          max_results: 5
          /* eslint-enable @typescript-eslint/camelcase */
        }
      );

      widget.on(
        'address:select',
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
