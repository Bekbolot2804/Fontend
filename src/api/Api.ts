/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface Help {
  /** ID */
  id?: number;
  /**
   * Name
   * @minLength 1
   * @maxLength 100
   */
  name: string;
  /**
   * Description
   * @minLength 1
   */
  description: string;
  /**
   * Duration
   * @min 0
   * @max 2147483647
   */
  duration: number;
  /**
   * Image url
   * @format uri
   * @minLength 1
   */
  image_url?: string | null;
  /** Is active */
  is_active?: boolean;
}

export interface User {
  /**
   * Email адрес
   * @format email
   * @minLength 1
   * @maxLength 254
   */
  email: string;
  /**
   * Пароль
   * @minLength 1
   * @maxLength 50
   */
  password: string;
  /**
   * Is staff
   * @default false
   */
  is_staff?: boolean;
  /**
   * Is superuser
   * @default false
   */
  is_superuser?: boolean;
}

import type { AxiosInstance, AxiosRequestConfig, AxiosResponse, HeadersDefaults, ResponseType } from "axios";
import axios from "axios";

export type QueryParamsType = Record<string | number, any>;

export interface FullRequestParams extends Omit<AxiosRequestConfig, "data" | "params" | "url" | "responseType"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseType;
  /** request body */
  body?: unknown;
}

export type RequestParams = Omit<FullRequestParams, "body" | "method" | "query" | "path">;

export interface ApiConfig<SecurityDataType = unknown> extends Omit<AxiosRequestConfig, "data" | "cancelToken"> {
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<AxiosRequestConfig | void> | AxiosRequestConfig | void;
  secure?: boolean;
  format?: ResponseType;
}

export enum ContentType {
  Json = "application/json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public instance: AxiosInstance;
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private secure?: boolean;
  private format?: ResponseType;

  constructor({ securityWorker, secure, format, ...axiosConfig }: ApiConfig<SecurityDataType> = {}) {
    this.instance = axios.create({ ...axiosConfig, baseURL: axiosConfig.baseURL || "http://localhost:8080" });
    this.secure = secure;
    this.format = format;
    this.securityWorker = securityWorker;
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected mergeRequestParams(params1: AxiosRequestConfig, params2?: AxiosRequestConfig): AxiosRequestConfig {
    const method = params1.method || (params2 && params2.method);

    return {
      ...this.instance.defaults,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...((method && this.instance.defaults.headers[method.toLowerCase() as keyof HeadersDefaults]) || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected stringifyFormItem(formItem: unknown) {
    if (typeof formItem === "object" && formItem !== null) {
      return JSON.stringify(formItem);
    } else {
      return `${formItem}`;
    }
  }

  protected createFormData(input: Record<string, unknown>): FormData {
    if (input instanceof FormData) {
      return input;
    }
    return Object.keys(input || {}).reduce((formData, key) => {
      const property = input[key];
      const propertyContent: any[] = property instanceof Array ? property : [property];

      for (const formItem of propertyContent) {
        const isFileType = formItem instanceof Blob || formItem instanceof File;
        formData.append(key, isFileType ? formItem : this.stringifyFormItem(formItem));
      }

      return formData;
    }, new FormData());
  }

  public request = async <T = any, _E = any>({
    secure,
    path,
    type,
    query,
    format,
    body,
    ...params
  }: FullRequestParams): Promise<AxiosResponse<T>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const responseFormat = format || this.format || undefined;

    if (type === ContentType.FormData && body && body !== null && typeof body === "object") {
      body = this.createFormData(body as Record<string, unknown>);
    }

    if (type === ContentType.Text && body && body !== null && typeof body !== "string") {
      body = JSON.stringify(body);
    }

    return this.instance.request({
      ...requestParams,
      headers: {
        ...(requestParams.headers || {}),
        ...(type ? { "Content-Type": type } : {}),
      },
      params: query,
      responseType: responseFormat,
      data: body,
      url: path,
    });
  };
}

/**
 * @title Snippets API
 * @version v1
 * @license BSD License
 * @termsOfService https://www.google.com/policies/terms/
 * @baseUrl http://localhost:8080
 * @contact <contact@snippets.local>
 *
 * Test description
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  helps = {
    /**
     * No description
     *
     * @tags helps
     * @name HelpsList
     * @request GET:/helps/
     * @secure
     */
    helpsList: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/helps/`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags helps
     * @name HelpsCreate
     * @request POST:/helps/
     * @secure
     */
    helpsCreate: (data: Help, params: RequestParams = {}) =>
      this.request<Help, any>({
        path: `/helps/`,
        method: "POST",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags helps
     * @name HelpsRead
     * @request GET:/helps/{id}/
     * @secure
     */
    helpsRead: (id: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/helps/${id}/`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags helps
     * @name HelpsUpdate
     * @request PUT:/helps/{id}/
     * @secure
     */
    helpsUpdate: (id: string, data: Help, params: RequestParams = {}) =>
      this.request<Help, any>({
        path: `/helps/${id}/`,
        method: "PUT",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags helps
     * @name HelpsDelete
     * @request DELETE:/helps/{id}/
     * @secure
     */
    helpsDelete: (id: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/helps/${id}/`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags helps
     * @name HelpsImageCreate
     * @request POST:/helps/{id}/image/
     * @secure
     */
    helpsImageCreate: (id: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/helps/${id}/image/`,
        method: "POST",
        secure: true,
        ...params,
      }),
  };
  lesions = {
    /**
     * No description
     *
     * @tags lesions
     * @name LesionsList
     * @request GET:/lesions/
     * @secure
     */
    lesionsList: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/lesions/`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags lesions
     * @name LesionsDraftList
     * @request GET:/lesions/draft/
     * @secure
     */
    lesionsDraftList: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/lesions/draft/`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags lesions
     * @name LesionsRead
     * @request GET:/lesions/{id}/
     * @secure
     */
    lesionsRead: (id: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/lesions/${id}/`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags lesions
     * @name LesionsUpdate
     * @request PUT:/lesions/{id}/
     * @secure
     */
    lesionsUpdate: (id: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/lesions/${id}/`,
        method: "PUT",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags lesions
     * @name LesionsHelpsCreate
     * @request POST:/lesions/{lesion_id}/helps/
     * @secure
     */
    lesionsHelpsCreate: (lesionId: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/lesions/${lesionId}/helps/`,
        method: "POST",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags lesions
     * @name LesionsHelpsDelete
     * @request DELETE:/lesions/{lesion_id}/helps/
     * @secure
     */
    lesionsHelpsDelete: (lesionId: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/lesions/${lesionId}/helps/`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags lesions
     * @name LesionsHelpsCreate2
     * @request POST:/lesions/{lesion_id}/helps/{help_id}/
     * @originalName lesionsHelpsCreate
     * @duplicate
     * @secure
     */
    lesionsHelpsCreate2: (lesionId: string, helpId: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/lesions/${lesionId}/helps/${helpId}/`,
        method: "POST",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags lesions
     * @name LesionsHelpsDelete2
     * @request DELETE:/lesions/{lesion_id}/helps/{help_id}/
     * @originalName lesionsHelpsDelete
     * @duplicate
     * @secure
     */
    lesionsHelpsDelete2: (lesionId: string, helpId: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/lesions/${lesionId}/helps/${helpId}/`,
        method: "DELETE",
        secure: true,
        ...params,
      }),
  };
  login = {
    /**
     * No description
     *
     * @tags login
     * @name LoginCreate
     * @request POST:/login
     * @secure
     */
    loginCreate: (data: User, params: RequestParams = {}) =>
      this.request<User, any>({
        path: `/login`,
        method: "POST",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),
  };
  useruser = {
    /**
     * No description
     *
     * @tags useruser
     * @name UseruserList
     * @request GET:/useruser/
     * @secure
     */
    useruserList: (params: RequestParams = {}) =>
      this.request<User[], any>({
        path: `/useruser/`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags useruser
     * @name UseruserCreate
     * @request POST:/useruser/
     * @secure
     */
    useruserCreate: (data: User, params: RequestParams = {}) =>
      this.request<User, any>({
        path: `/useruser/`,
        method: "POST",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags useruser
     * @name UseruserRead
     * @request GET:/useruser/{id}/
     * @secure
     */
    useruserRead: (id: number, params: RequestParams = {}) =>
      this.request<User, any>({
        path: `/useruser/${id}/`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags useruser
     * @name UseruserUpdate
     * @request PUT:/useruser/{id}/
     * @secure
     */
    useruserUpdate: (id: number, data: User, params: RequestParams = {}) =>
      this.request<User, any>({
        path: `/useruser/${id}/`,
        method: "PUT",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags useruser
     * @name UseruserPartialUpdate
     * @request PATCH:/useruser/{id}/
     * @secure
     */
    useruserPartialUpdate: (id: number, data: User, params: RequestParams = {}) =>
      this.request<User, any>({
        path: `/useruser/${id}/`,
        method: "PATCH",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags useruser
     * @name UseruserDelete
     * @request DELETE:/useruser/{id}/
     * @secure
     */
    useruserDelete: (id: number, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/useruser/${id}/`,
        method: "DELETE",
        secure: true,
        ...params,
      }),
  };
}
