import * as axios from "axios";
import {
  CalculatedItem,
  CalculateRequest,
  ShippingServiceItem,
} from "../types";

class Client {
  private readonly axios: axios.AxiosInstance;

  constructor(token: string, sandbox: string | boolean = false) {
    const baseURL =
      (typeof sandbox === 'string' && sandbox.toLowerCase() === "development") || sandbox === true
        ? "https://sandbox.melhorenvio.com.br/api/v2"
        : "https://melhorenvio.com.br/api/v2";

    this.axios = axios.default.create({
      baseURL,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  async getShippingServices(): Promise<ShippingServiceItem[]> {
    const response = await this.axios.get("/me/shipment/calculate");
    return response.data;
  }

  async getShippingPrices(request: CalculateRequest): Promise<CalculatedItem> {
    const response = await this.axios.post("/me/shipment/calculate", request);

    return response.data;
  }
}

export default Client;
