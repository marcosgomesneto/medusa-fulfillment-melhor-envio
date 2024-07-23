export interface Options extends Record<string, unknown> {
  apiToken: string;
  postalCode: string;
}

export interface CalculateRequest {
  from: {
    postal_code: string;
  };
  to: {
    postal_code: string;
  };
  products: {
    id: string;
    width: number;
    height: number;
    length: number;
    weight: number;
    quantity: number;
  }[];
  options: {
    receipt: boolean;
    own_hand: boolean;
  };
  services: string;
}

export interface ShippingServiceItem {
  id: number;
  name: string;
  type: string;
  range: string;
  restrictions: {
    insurance_value: {
      min: number;
      max: number;
      max_dec: number;
    };
    formats: {
      box: {
        weight: {
          min: number;
          max: number;
        };
        width: {
          min: number;
          max: number;
        };
        height: {
          min: number;
          max: number;
        };
        length: {
          min: number;
          max: number;
        };
        sum: number;
      };
      roll: {
        weight: {
          min: number;
          max: number;
        };
        diameter: {
          min: number;
          max: number;
        };
        length: {
          min: number;
          max: number;
        };
        sum: number;
      };
      letter: {
        weight: {
          min: number;
          max: number;
        };
        width: {
          min: number;
          max: number;
        };
        length: {
          min: number;
          max: number;
        };
      };
    };
  };
  requirements: string[];
  optionals: string[];
  company: {
    id: number;
    name: string;
    has_grouped_volumes: number;
    status: string;
    picture: string;
    tracking_link: string;
    use_own_contract: boolean;
    batch_size: number;
  };
}

export interface Company {
  id: number;
  name: string;
  picture: string;
  services: [];
}

export interface FulfillmentItemOption extends Record<string, unknown> {
  id: string;
  external_id: number;
  name: string;
}

export interface CalculatedItem {
  id: number;
  error?: string;
  name: string;
  price: string;
  custom_price: string;
  discount: string;
  currency: string;
  delivery_time: number;
  delivery_range: {
    min: number;
    max: number;
  };
  custom_delivery_time: number;
  custom_delivery_range: {
    min: number;
    max: number;
  };
  packages: {
    price: string;
    discount: string;
    format: string;
    weight: string;
    insurance_value: string;
    products: [
      {
        id: string;
        quantity: number;
      }
    ];
    dimensions: {
      height: number;
      width: number;
      length: number;
    };
  }[];
  additional_services: {
    receipt: boolean;
    own_hand: boolean;
    collect: boolean;
  };
  company: {
    id: number;
    name: string;
    picture: string;
  };
}
