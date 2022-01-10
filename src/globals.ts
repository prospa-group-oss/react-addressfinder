/* eslint-disable @typescript-eslint/no-unused-vars */
import { AddressMeta } from './types';

class Widget {
  constructor(_input: HTMLElement, _api_key: string, _country_code: string, _options?: object) {
    return this;
  }

  on(_event_name: string, _callback: (fullAddress: string, metaData: AddressMeta) => void) {
    //
  }
}

declare global {
  interface Window {
    // https://addressfinder.nz/docs/widget_docs/
    AddressFinder: {
      Widget: typeof Widget;
    };
  }
}
