# Change Log

## 1.1.0

- Implemented dynamic postal code functionality. If the `variant` has an `postalCodeOrigin` in its `metadata`, that value will be used as the origin postal code for shipping calculations. If `postalCodeOrigin` is not present, the default postal code from the environment variable `MELHOR_ENVIO_POSTAL_CODE` will be used.

## 1.0.3

- Added support for sandbox environment.
  - You can now test the fulfillment service in a safe environment by setting the `ENVIRONMENT` variable. If set to `"development"`, the plugin will operate in sandbox mode, allowing for testing without affecting live data.

## 1.0.0

- Welcome to the first version
