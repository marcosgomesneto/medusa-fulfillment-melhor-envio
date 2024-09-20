<p align="center">
  <img src="https://github.com/marcosgomesneto/marcosgomesneto/blob/main/images/melhor-envio-medusajs.png?raw=true"/>
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/@marcosgn/medusa-fulfillment-melhor-envio"><img src="https://badgen.net/npm/v/@marcosgn/medusa-fulfillment-melhor-envio" alt="npm package"></a>
</p>

# Melhor Envio Fulfillment for MedusaJS

Add integrated shipping calculation in your MedusaJS project with most product carriers in Latin America, such as: Correios (Sedex, PAC, etc.), Buslog, JeT Express, JadLog, Loggi, Azul Cargo among others.

---

## Prerequisites

- [Medusa backend](https://docs.medusajs.com/development/backend/install)
- [Melhor Envio account](https://melhorenvio.com.br/) or [Sandbox](https://sandbox.melhorenvio.com.br/)

## Contribute with:

- ⭐ Starred this repository
- [Follow me](https://github.com/marcosgomesneto) in github
- Report [Issues](https://github.com/marcosgomesneto/medusa-fulfillment-melhor-envio/issues)

---

## How to Install

1\. Run the following command in the directory of the Medusa backend:

```bash
#Using npm
npm install @marcosgn/medusa-fulfillment-melhor-envio

#Using yarn
yarn add @marcosgn/medusa-fulfillment-melhor-envio
```

2\. Set the following environment variables in `.env`:

```bash
MELHOR_ENVIO_API_TOKEN=<your-token>
MELHOR_ENVIO_POSTAL_CODE=<from-postal-code>
```

Get your token from the Melhor Envio dashboard: https://melhorenvio.com.br or https://sandbox.melhorenvio.com.br.

Set origin zip code in the variable `MELHOR_ENVIO_POSTAL_CODE` with only numbers. This is used for shipping calculation.

3\. In `medusa-config.js` add the following at the end of the `plugins` array:

```js
const plugins = [
  // ...
  {
    resolve: `@marcosgn/medusa-fulfillment-melhor-envio`,
    options: {
      apiToken: process.env.MELHOR_ENVIO_API_TOKEN,
      postalCode: process.env.MELHOR_ENVIO_POSTAL_CODE,
      sandbox: process.env.ENVIRONMENT, // Set true or "development" to use the sandbox environment
    },
  },
];
```

## New Feature: Dynamic Postal Code

Starting from version `1.1.0`, you can define a custom origin postal code at the variant level. If a `variant` has the `postalCodeOrigin` set in its `metadata`, this postal code will be used for shipping calculations instead of the default postal code set in `MELHOR_ENVIO_POSTAL_CODE`.

---

## Test the Plugin

1\. Run the following command in the directory of the Medusa backend to run the backend:

```bash
#Using npm
npm run dev

#Using
yarn dev
```

2\. Add Shipping Methods in a region in the admin panel. You can refer to [this User Guide](https://docs.medusajs.com/user-guide/regions/providers) and [this (Manage Shipping)](https://docs.medusajs.com/user-guide/regions/shipping-options) to learn how to do that. Alternatively, you can use the [Admin APIs](https://docs.medusajs.com/api/admin#tag/Region/operation/PostRegionsRegion).

3\. Get a shipping methods from Cart ID in a storefront or the [Store APIs](https://docs.medusajs.com/api/store).

## Storefront Usage

### Nuxt Exaple using MedusaJS client

```typescript
const client = useMedusaClient(); //with NuxtJS Example...

const shippingOptions = await client.shippingOptions.listCartOptions(
  "cart_EXAMPLE_CART_ID"
);
```

### Support and Contribution

If you encounter any issues or have suggestions for improvements, feel free to open an [issue](https://github.com/marcosgomesneto/medusa-fulfillment-melhor-envio/issues) on the GitHub repository.

If you want to contribute, please open a [pull request](https://github.com/marcosgomesneto/medusa-fulfillment-melhor-envio/pulls) in the repository.
