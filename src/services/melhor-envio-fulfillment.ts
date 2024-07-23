import {
  AbstractFulfillmentService,
  Cart,
  Fulfillment,
  LineItem,
  Order,
} from "@medusajs/medusa";
import { CreateReturnType } from "@medusajs/medusa/dist/types/fulfillment-provider";
import * as axios from "axios";
import { CalculateRequest, FulfillmentItemOption, Options } from "../types";
import MelhorEnvioClient from "../core/client";
import Client from "../core/client";

class MelhorEnvioFulfillmentService extends AbstractFulfillmentService {
  static identifier = "melhor-envio-fulfillment";
  private options: Options;
  private client: Client;

  constructor(container: Record<string, unknown>, options: Options) {
    super(container);

    this.options = options;
    this.client = new MelhorEnvioClient(options.apiToken);
  }

  async getFulfillmentOptions(): Promise<FulfillmentItemOption[]> {
    return [
      {
        id: "mini-envios",
        external_id: 17,
        name: "Mini Envios",
        description: "Serviço de encomenda da Mini Envios dos Correios",
      },
      {
        id: "pac",
        external_id: 1,
        name: "PAC",
        description: "Serviço de encomenda da linha econômica dos Correios",
      },
      {
        id: "sedex",
        external_id: 2,
        name: "Sedex",
        description: "Serviço de encomenda expressa dos Correios",
      },
      {
        id: "jadlog",
        external_id: 3,
        name: "Jadlog",
        description: "Serviço de encomenda da Jadlog",
      },
      {
        id: "jadlog-express",
        external_id: 4,
        name: "Jadlog Express",
        description: "Serviço de encomenda expressa da Jadlog",
      },
      {
        id: "loggi",
        external_id: 31,
        name: "Loggi",
        description: "Serviço de entrega da Loggi",
      },
      {
        id: "jet",
        external_id: 33,
        name: "JeT",
        description: "Serviço de entrega da JeT",
      },
      {
        id: "azul-cargo",
        external_id: 16,
        name: "Azul Cargo",
        description: "Serviço de encomenda da Azul Cargo",
      },
      {
        id: "azul-cargo-express",
        external_id: 15,
        name: "Azul Cargo Express",
        description: "Serviço de encomenda da Azul Cargo Express",
      },
      {
        id: "buslog",
        external_id: 22,
        name: "Buslog",
        description: "Serviço de encomenda da Buslog",
      },
    ];
  }
  async validateFulfillmentData(
    optionData: { [x: string]: unknown },
    data: { [x: string]: unknown },
    cart: Cart
  ): Promise<Record<string, unknown>> {
    return {
      ...optionData,
      ...data,
    };
  }
  async validateOption(data: { [x: string]: unknown }): Promise<boolean> {
    return true;
  }
  async canCalculate(data: { [x: string]: unknown }): Promise<boolean> {
    return true;
  }
  async calculatePrice(
    optionData: FulfillmentItemOption,
    data: { [x: string]: unknown },
    cart: Cart
  ): Promise<number> {
    if (!cart.shipping_address?.postal_code)
      throw new Error("No postal code provided in shipping address");

    const toPostaCode = cart.shipping_address.postal_code.replace(
      /[^0-9]/g,
      ""
    );

    const products = cart.items.map((item) => {
      return {
        id: item.id,
        width: item.variant.width || 10,
        height: item.variant.height || 10,
        length: item.variant.length || 10,
        weight: item.variant.weight || 0.5,
        quantity: item.quantity,
      };
    });

    const request: CalculateRequest = {
      from: {
        postal_code: this.options.postalCode,
      },
      to: {
        postal_code: toPostaCode,
      },
      products: products,
      options: {
        receipt: false,
        own_hand: false,
      },
      services: optionData.external_id.toString(),
    };

    const response = await this.client.getShippingPrices(request);

    if (!response.price)
      throw new Error(response.error || "No price returned from Melhor Envio");

    if (Number.isNaN(+response.price))
      throw new Error("Price is not an integer");

    const price = +response.price;

    return Math.trunc(price * 100);
  }
  async createFulfillment(
    data: { [x: string]: unknown },
    items: LineItem[],
    order: Order,
    fulfillment: Fulfillment
  ): Promise<{ [x: string]: unknown }> {
    return {};
  }
  async cancelFulfillment(fulfillment: { [x: string]: unknown }): Promise<any> {
    return {};
  }
  async createReturn(
    returnOrder: CreateReturnType
  ): Promise<Record<string, unknown>> {
    return {};
  }
  async getFulfillmentDocuments(data: { [x: string]: unknown }): Promise<any> {
    return {};
  }
  async getReturnDocuments(data: Record<string, unknown>): Promise<any> {
    return {};
  }
  async getShipmentDocuments(data: Record<string, unknown>): Promise<any> {
    return {};
  }
  async retrieveDocuments(
    fulfillmentData: Record<string, unknown>,
    documentType: "invoice" | "label"
  ): Promise<any> {
    return {};
  }
}

export default MelhorEnvioFulfillmentService;
