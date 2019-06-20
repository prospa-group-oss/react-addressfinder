# React Component for AddressFinder

This is a react wrapper component for [AddressFinder's](https://addressfinder.com.au/docs/widget_docs/) widget.

## Getting started

### Setup

Include the widget script manually 

```html
<script type="text/javascript" src="https://api.addressfinder.io/assets/v3/widget.js" async></script>
```

or the component will load the library for you if not found under the window object.


### Install

```sh
yarn add react-addressfinder
```

### Using the component

```js
import React from 'react';

interface Props extends HTMLInputElement {
  addressFinderKey: string
  inputClassName?: string
  id: string
}

const component = ({
  addressFinderKey,
  inputClassName,
  id,
  name,
  ...props
}: Props) =>
  <WidgetInput
    addressFinderKey={addressFinderKey}
    inputClassName={inputClassName}
    id={id}
    onSelected={(fullAddress: string, address: Address) => {
      /* callback function to set full address and input value */
    }}
    {...props}
  />
```

## Component props

| Prop               | Type        | Required | Default                                           |
|--------------------|-------------|----------|---------------------------------------------------|
| id                 | string      |    yes   |                                                   |
| addressFinderKey   | string      |    yes   |                                                   |
| onSelected         | function    |    yes   |                                                   |
| country            | string      |    no    | `AU`                                              |
| container          | HtmlElement |    no    | div with id `address-container-${id}`             |
| inputClassName     | string      |    no    | ''                                                |
| listClassName      | string      |    no    | `address-autocomplete__suggestions`               |
| itemClassName      | string      |    no    | `address-autocomplete__suggestions__item`         |
| hoverClassName     | string      |    no    | `address-autocomplete__suggestions__item--active` |

### Prop: container

The container where suggestion list will be docked inside. If not provided, the list sits directly inside a `div` under the input.

### Prop: onSelected

Signature of the onSelect function is

```js
(fullAddress: string, address: Address) => void;
```


<br />
<br />

More to come - component wrapper AddressFinder apis...