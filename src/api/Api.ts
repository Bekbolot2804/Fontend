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

export interface HelpForLesion {
  /** Help id */
  help_id?: number;
  /**
   * Name
   * @minLength 1
   * @maxLength 30
   */
  name: string;
  /** Status */
  status?: "1" | "0";
  /**
   * Img url
   * @maxLength 100
   */
  img_url?: string | null;
}

export interface HelpLesion {
  /** ID */
  id?: number;
  help?: HelpForLesion;
  /**
   * Comment
   * @maxLength 100
   */
  comment?: string | null;
  /** Lesion */
  lesion?: number;
}

export interface Attribute {
  /** Attribute id */
  attribute_id?: number;
  /**
   * Name
   * @minLength 1
   * @maxLength 30
   */
  name: string;
}

export interface AttributeHelp {
  attribute?: Attribute;
  /**
   * Value
   * @maxLength 70
   */
  value?: string | null;
}

export interface HelpForAttributes {
  attributes?: AttributeHelp[];
}

export interface Help {
  /** Help id */
  help_id?: number;
  /**
   * Name
   * @minLength 1
   * @maxLength 30
   */
  name: string;
  /**
   * Description
   * @minLength 1
   */
  description: string;
  /** Status */
  status: "1" | "0";
  /**
   * Img url
   * @maxLength 100
   */
  img_url?: string | null;
  /**
   * Duration
   * @min -2147483648
   * @max 2147483647
   */
  duration: number;
}

export interface Lesion {
  /** Lesion id */
  lesion_id?: number;
  helps?: HelpLesion[];
  /** Creator */
  creator?: string;
  /** Moderator */
  moderator?: string;
  /** Status */
  status?: "draft" | "deleted" | "completed" | "formed" | "rejected";
  /**
   * Date of creation
   * @format date-time
   */
  date_of_creation?: string;
  /**
   * Date of formation
   * @format date-time
   */
  date_of_formation?: string | null;
  /**
   * Date of finish
   * @format date-time
   */
  date_of_finish?: string | null;
  /**
   * Sum duration
   * @min -2147483648
   * @max 2147483647
   */
  sum_duration?: number | null;
  /**
   * Qr
   * @minLength 1
   */
  qr?: string | null;
}

export interface CustomUser {
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
   * @maxLength 254
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

export interface SwaggerCustomUser {
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
   * @maxLength 254
   */
  password: string;
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
    this.instance = axios.create({ ...axiosConfig, baseURL: axiosConfig.baseURL || "http://localhost:8000/api" });
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
 * @title Radioactive helps API
 * @version v1
 * @license BSD License
 * @termsOfService https://www.google.com/policies/terms/
 * @baseUrl http://localhost:8000/api
 * @contact <contact@snippets.local>
 *
 * My description
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  helpLesion = {
    /**
     * No description
     *
     * @tags Help_lesion
     * @name HelpLesionUpdate
     * @request PUT:/Help_lesion/{help_id}/{lesion_id}/
     * @secure
     */
    helpLesionUpdate: (
      helpId: string,
      lesionId: string,
      data: {
        comment?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        HelpLesion[],
        {
          details: string;
        }
      >({
        path: `/Help_lesion/${helpId}/${lesionId}/`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Help_lesion
     * @name HelpLesionDelete
     * @request DELETE:/Help_lesion/{help_id}/{lesion_id}/
     * @secure
     */
    helpLesionDelete: (helpId: string, lesionId: string, params: RequestParams = {}) =>
      this.request<
        HelpLesion[],
        {
          details: string;
        }
      >({
        path: `/Help_lesion/${helpId}/${lesionId}/`,
        method: "DELETE",
        secure: true,
        format: "json",
        ...params,
      }),
  };
  attribute = {
    /**
     * No description
     *
     * @tags attribute
     * @name AttributeRead
     * @request GET:/attribute/{help_id}/
     * @secure
     */
    attributeRead: (helpId: string, params: RequestParams = {}) =>
      this.request<HelpForAttributes, any>({
        path: `/attribute/${helpId}/`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags attribute
     * @name AttributeCreate
     * @request POST:/attribute/{help_id}/
     * @secure
     */
    attributeCreate: (
      helpId: string,
      data: {
        name: string;
        value?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<AttributeHelp, any>({
        path: `/attribute/${helpId}/`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags attribute
     * @name AttributeUpdate
     * @request PUT:/attribute/{help_id}/{attribute_id}/
     * @secure
     */
    attributeUpdate: (
      helpId: string,
      attributeId: string,
      data: {
        value?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          status: string;
        },
        any
      >({
        path: `/attribute/${helpId}/${attributeId}/`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags attribute
     * @name AttributeDelete
     * @request DELETE:/attribute/{help_id}/{attribute_id}/
     * @secure
     */
    attributeDelete: (helpId: string, attributeId: string, params: RequestParams = {}) =>
      this.request<
        {
          id?: number;
        },
        any
      >({
        path: `/attribute/${helpId}/${attributeId}/`,
        method: "DELETE",
        secure: true,
        format: "json",
        ...params,
      }),
  };
  helps = {
    /**
     * No description
     *
     * @tags helps
     * @name HelpsList
     * @request GET:/helps/
     * @secure
     */
    helpsList: (
      query?: {
        /** Имя */
        name?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          name: string;
          helps: {
            help_id: number;
            name: string;
            description: string;
            status: string;
            img_url: string;
            duration: number;
          }[];
          lesion_information: {
            lesion_helps_count: number;
            lesion_id: number;
          };
        },
        any
      >({
        path: `/helps/`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
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
      this.request<
        Help,
        {
          details: string;
        }
      >({
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
     * @request GET:/helps/{help_id}/
     * @secure
     */
    helpsRead: (helpId: string, params: RequestParams = {}) =>
      this.request<
        Help,
        {
          details: string;
        }
      >({
        path: `/helps/${helpId}/`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags helps
     * @name HelpsCreate2
     * @request POST:/helps/{help_id}/
     * @originalName helpsCreate
     * @duplicate
     * @secure
     */
    helpsCreate2: (helpId: string, params: RequestParams = {}) =>
      this.request<
        {
          lesion_information?: {
            lesion_id?: number;
            lesion_helps_count?: number;
          };
        },
        {
          details: string;
        }
      >({
        path: `/helps/${helpId}/`,
        method: "POST",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags helps
     * @name HelpsUpdate
     * @request PUT:/helps/{help_id}/
     * @secure
     */
    helpsUpdate: (helpId: string, data: Help, params: RequestParams = {}) =>
      this.request<
        Help,
        {
          details: string;
        }
      >({
        path: `/helps/${helpId}/`,
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
     * @request DELETE:/helps/{help_id}/
     * @secure
     */
    helpsDelete: (helpId: string, params: RequestParams = {}) =>
      this.request<
        Help,
        {
          details: string;
        }
      >({
        path: `/helps/${helpId}/`,
        method: "DELETE",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags helps
     * @name HelpsAddImgCreate
     * @request POST:/helps/{help_id}/add_img/
     * @secure
     */
    helpsAddImgCreate: (
      helpId: string,
      data: {
        /** @format binary */
        img: File;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        Help,
        {
          details: string;
        }
      >({
        path: `/helps/${helpId}/add_img/`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.FormData,
        format: "json",
        ...params,
      }),
  };
  lesion = {
    /**
     * No description
     *
     * @tags lesion
     * @name LesionRead
     * @request GET:/lesion/{lesion_id}/
     * @secure
     */
    lesionRead: (lesionId: string, params: RequestParams = {}) =>
      this.request<
        Lesion,
        {
          details: string;
        }
      >({
        path: `/lesion/${lesionId}/`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags lesion
     * @name LesionUpdate
     * @request PUT:/lesion/{lesion_id}/
     * @secure
     */
    lesionUpdate: (
      lesionId: string,
      data: {
        pass_time?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          status: string;
        },
        {
          details: string;
        }
      >({
        path: `/lesion/${lesionId}/`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags lesion
     * @name LesionFormingUpdate
     * @request PUT:/lesion/{lesion_id}/forming/
     * @secure
     */
    lesionFormingUpdate: (lesionId: string, params: RequestParams = {}) =>
      this.request<
        Lesion,
        {
          details: string;
        }
      >({
        path: `/lesion/${lesionId}/forming/`,
        method: "PUT",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags lesion
     * @name LesionFormingDelete
     * @request DELETE:/lesion/{lesion_id}/forming/
     * @secure
     */
    lesionFormingDelete: (lesionId: string, params: RequestParams = {}) =>
      this.request<
        Lesion,
        {
          details: string;
        }
      >({
        path: `/lesion/${lesionId}/forming/`,
        method: "DELETE",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags lesion
     * @name LesionModerateUpdate
     * @request PUT:/lesion/{lesion_id}/moderate/
     * @secure
     */
    lesionModerateUpdate: (
      lesionId: string,
      data: {
        accept: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        Lesion,
        {
          details: string;
        }
      >({
        path: `/lesion/${lesionId}/moderate/`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
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
    lesionsList: (
      query?: {
        /** Начальная дата */
        start_date?: string;
        /** Конечная дата */
        end_date?: string;
        /** Статус (completed/formed/rejected) */
        status?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        Lesion[],
        {
          details: string;
        }
      >({
        path: `/lesions/`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),
  };
  user = {
    /**
     * No description
     *
     * @tags user
     * @name UserAccountUpdate
     * @request PUT:/user/account/
     * @secure
     */
    userAccountUpdate: (
      data: {
        email?: string;
        password?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        CustomUser,
        {
          details: string;
        }
      >({
        path: `/user/account/`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags user
     * @name UserLoginCreate
     * @request POST:/user/login/
     * @secure
     */
    userLoginCreate: (data: SwaggerCustomUser, params: RequestParams = {}) =>
      this.request<
        CustomUser,
        {
          details: string;
        }
      >({
        path: `/user/login/`,
        method: "POST",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags user
     * @name UserLogoutCreate
     * @request POST:/user/logout/
     * @secure
     */
    userLogoutCreate: (params: RequestParams = {}) =>
      this.request<
        {
          status: string;
        },
        {
          details: string;
        }
      >({
        path: `/user/logout/`,
        method: "POST",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags user
     * @name UserRegistrationCreate
     * @request POST:/user/registration/
     * @secure
     */
    userRegistrationCreate: (data: SwaggerCustomUser, params: RequestParams = {}) =>
      this.request<
        CustomUser,
        {
          details: string;
        }
      >({
        path: `/user/registration/`,
        method: "POST",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),
  };
}
