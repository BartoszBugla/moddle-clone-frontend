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

import axios, {
  type AxiosInstance,
  type AxiosRequestConfig,
  type HeadersDefaults,
  type ResponseType,
} from 'axios'

export interface CourseDTO {
  name?: string | null
  description?: string | null
  /** @format int32 */
  userId?: number
}

export interface DateOnly {
  /** @format int32 */
  year?: number
  /** @format int32 */
  month?: number
  /** @format int32 */
  day?: number
  dayOfWeek?: DayOfWeek
  /** @format int32 */
  dayOfYear?: number
  /** @format int32 */
  dayNumber?: number
}

/** @format int32 */
export enum DayOfWeek {
  Value0 = 0,
  Value1 = 1,
  Value2 = 2,
  Value3 = 3,
  Value4 = 4,
  Value5 = 5,
  Value6 = 6,
}

export interface RegisterDTO {
  name?: string | null
  surname?: string | null
  username?: string | null
  password?: string | null
  /** @format int32 */
  roleId?: number
}

export interface UserLoginDTO {
  username?: string | null
  password?: string | null
}

export interface WeatherForecast {
  date?: DateOnly
  /** @format int32 */
  temperatureC?: number
  /** @format int32 */
  temperatureF?: number
  summary?: string | null
}

export type QueryParamsType = Record<string | number, any>

export interface FullRequestParams
  extends Omit<AxiosRequestConfig, 'data' | 'params' | 'url' | 'responseType'> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean
  /** request path */
  path: string
  /** content type of request body */
  type?: ContentType
  /** query params */
  query?: QueryParamsType
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseType
  /** request body */
  body?: unknown
}

export type RequestParams = Omit<
  FullRequestParams,
  'body' | 'method' | 'query' | 'path'
>

export interface ApiConfig<SecurityDataType = unknown>
  extends Omit<AxiosRequestConfig, 'data' | 'cancelToken'> {
  securityWorker?: (
    securityData: SecurityDataType | null
  ) => Promise<AxiosRequestConfig | void> | AxiosRequestConfig | void
  secure?: boolean
  format?: ResponseType
}

export enum ContentType {
  Json = 'application/json',
  FormData = 'multipart/form-data',
  UrlEncoded = 'application/x-www-form-urlencoded',
  Text = 'text/plain',
}

export class HttpClient<SecurityDataType = unknown> {
  public instance: AxiosInstance
  private securityData: SecurityDataType | null = null
  private securityWorker?: ApiConfig<SecurityDataType>['securityWorker']
  private secure?: boolean
  private format?: ResponseType

  constructor({
    securityWorker,
    secure,
    format,
    ...axiosConfig
  }: ApiConfig<SecurityDataType> = {}) {
    this.instance = axios.create({
      ...axiosConfig,
      baseURL: axiosConfig.baseURL || '',
    })
    this.secure = secure
    this.format = format
    this.securityWorker = securityWorker
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data
  }

  protected mergeRequestParams(
    params1: AxiosRequestConfig,
    params2?: AxiosRequestConfig
  ): AxiosRequestConfig {
    const method = params1.method || (params2 && params2.method)

    return {
      ...this.instance.defaults,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...((method &&
          this.instance.defaults.headers[
            method.toLowerCase() as keyof HeadersDefaults
          ]) ||
          {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    }
  }

  protected stringifyFormItem(formItem: unknown) {
    if (typeof formItem === 'object' && formItem !== null) {
      return JSON.stringify(formItem)
    } else {
      return `${formItem}`
    }
  }

  protected createFormData(input: Record<string, unknown>): FormData {
    return Object.keys(input || {}).reduce((formData, key) => {
      const property = input[key]
      const propertyContent: any[] =
        property instanceof Array ? property : [property]

      for (const formItem of propertyContent) {
        const isFileType = formItem instanceof Blob || formItem instanceof File
        formData.append(
          key,
          isFileType ? formItem : this.stringifyFormItem(formItem)
        )
      }

      return formData
    }, new FormData())
  }

  public request = async <T = any, _E = any>({
    secure,
    path,
    type,
    query,
    format,
    body,
    ...params
  }: FullRequestParams): Promise<T> => {
    const secureParams =
      ((typeof secure === 'boolean' ? secure : this.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {}
    const requestParams = this.mergeRequestParams(params, secureParams)
    const responseFormat = format || this.format || undefined

    if (
      type === ContentType.FormData &&
      body &&
      body !== null &&
      typeof body === 'object'
    ) {
      body = this.createFormData(body as Record<string, unknown>)
    }

    if (
      type === ContentType.Text &&
      body &&
      body !== null &&
      typeof body !== 'string'
    ) {
      body = JSON.stringify(body)
    }

    return this.instance
      .request({
        ...requestParams,
        headers: {
          ...(requestParams.headers || {}),
          ...(type && type !== ContentType.FormData
            ? { 'Content-Type': type }
            : {}),
        },
        params: query,
        responseType: responseFormat,
        data: body,
        url: path,
      })
      .then((response) => response.data)
  }
}

/**
 * @title OnlyCreateDatabase
 * @version 1.0
 */
export class Api<
  SecurityDataType extends unknown,
> extends HttpClient<SecurityDataType> {
  course = {
    /**
     * No description
     *
     * @tags Course
     * @name AllCourseList
     * @request GET:/Course/AllCourse
     */
    allCourseList: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/Course/AllCourse`,
        method: 'GET',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Course
     * @name AllCourseDetail
     * @request GET:/Course/AllCourse/{id}
     */
    allCourseDetail: (id: number, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/Course/AllCourse/${id}`,
        method: 'GET',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Course
     * @name DeleteCoruseDelete
     * @request DELETE:/Course/DeleteCoruse/{id}
     */
    deleteCoruseDelete: (id: number, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/Course/DeleteCoruse/${id}`,
        method: 'DELETE',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Course
     * @name CreateCourseCreate
     * @request POST:/Course/CreateCourse
     */
    createCourseCreate: (data: CourseDTO, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/Course/CreateCourse`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        ...params,
      }),
  }
  exercise = {
    /**
     * No description
     *
     * @tags Exercise
     * @name ExerciseDetail
     * @request GET:/Exercise/Exercise/{id}
     */
    exerciseDetail: (id: number, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/Exercise/Exercise/${id}`,
        method: 'GET',
        ...params,
      }),
  }
  user = {
    /**
     * No description
     *
     * @tags User
     * @name AllUsersList
     * @request GET:/User/AllUsers
     */
    allUsersList: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/User/AllUsers`,
        method: 'GET',
        ...params,
      }),

    /**
     * No description
     *
     * @tags User
     * @name DeleteUserDelete
     * @request DELETE:/User/DeleteUser/{id}
     */
    deleteUserDelete: (id: number, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/User/DeleteUser/${id}`,
        method: 'DELETE',
        ...params,
      }),

    /**
     * No description
     *
     * @tags User
     * @name RegisterCreate
     * @request POST:/User/Register
     */
    registerCreate: (data: RegisterDTO, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/User/Register`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags User
     * @name LoginCreate
     * @request POST:/User/Login
     */
    loginCreate: (data: UserLoginDTO, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/User/Login`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        ...params,
      }),
  }
  weatherForecast = {
    /**
     * No description
     *
     * @tags WeatherForecast
     * @name GetWeatherForecast
     * @request GET:/WeatherForecast
     */
    getWeatherForecast: (params: RequestParams = {}) =>
      this.request<WeatherForecast[], any>({
        path: `/WeatherForecast`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags WeatherForecast
     * @name TestList
     * @request GET:/WeatherForecast/Test
     */
    testList: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/WeatherForecast/Test`,
        method: 'GET',
        ...params,
      }),
  }
  file = {
    /**
     * No description
     *
     * @tags WeatherForecast
     * @name UploadCreate
     * @request POST:/File/Upload
     */
    uploadCreate: (
      data: {
        /** @format binary */
        file?: File
      },
      params: RequestParams = {}
    ) =>
      this.request<void, any>({
        path: `/File/Upload`,
        method: 'POST',
        body: data,
        type: ContentType.FormData,
        ...params,
      }),
  }
}
