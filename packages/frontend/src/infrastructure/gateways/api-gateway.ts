import axios, { type AxiosInstance, type AxiosRequestConfig } from 'axios';

interface ApiResponse<T> {
  data?: T;
  message?: string;
}

type ApiGatewayParams = {
  apiUrl: string;
};

export class ApiGateway {
  protected readonly client: AxiosInstance;
  protected readonly baseURL: string;

  constructor(params: ApiGatewayParams) {
    this.baseURL = params.apiUrl;
    this.client = axios.create({
      baseURL: params.apiUrl,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  protected async get<T>(endpoint: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.get<ApiResponse<T>>(endpoint, config);
    return response.data.data as T;
  }

  protected async post<T>(
    endpoint: string,
    payload?: unknown,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response = await this.client.post<ApiResponse<T>>(endpoint, payload, config);
    return response.data.data as T;
  }

  protected async put<T>(
    endpoint: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response = await this.client.put<ApiResponse<T>>(endpoint, data, config);
    return response.data.data as T;
  }

  protected async delete<T>(endpoint: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.delete<ApiResponse<T>>(endpoint, config);
    return response.data.data as T;
  }
}
