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

import axios, { type AxiosInstance, type AxiosRequestConfig, type HeadersDefaults, type ResponseType } from 'axios'

export enum AllCourseType {
  All = 'All',
  User = 'User',
  InvitedTo = 'InvitedTo',
}

export interface CourseDTO {
  /** @format int32 */
  id?: number | null
  name?: string | null
  description?: string | null
}

export interface CourseInfoDTO {
  /** @format int32 */
  id?: number
  name?: string | null
  description?: string | null
  students?: CourseStudentDto[] | null
  user?: UserDTO
  exercises?: InfoExerciseDTO[] | null
}

export interface CourseListItemDTO {
  /** @format int32 */
  id?: number
  name?: string | null
  description?: string | null
  enrolled?: boolean
  invitedTo?: boolean
  inCourse?: boolean
  user?: UserDTO
  exercises?: InfoExerciseDTO[] | null
}

export interface CourseStudentDto {
  /** @format int32 */
  id?: number
  name?: string | null
  surname?: string | null
  username?: string | null
  adminDecision?: boolean
  userDecision?: boolean
}

export interface EditExerciseDTO {
  exerciseName?: string | null
  exerciseDescription?: string | null
  deadLine?: string | null
}

export interface InfoExerciseDTO {
  /** @format int32 */
  courseId?: number
  /** @format int32 */
  exerciseId?: number
  exerciseName?: string | null
  exerciseDescription?: string | null
  deadLine?: string | null
  fileUpload?: InfoFileDTO
}

export interface InfoFileDTO {
  /** @format int32 */
  id?: number
  fileName?: string | null
}

export interface RegisterDTO {
  name?: string | null
  surname?: string | null
  username?: string | null
  password?: string | null
  /** @format int32 */
  roleId?: number
}

export interface UserDTO {
  /** @format int32 */
  id?: number
  name?: string | null
  surname?: string | null
  username?: string | null
}

export interface UserLoginDTO {
  username?: string | null
  password?: string | null
}

export type QueryParamsType = Record<string | number, any>

export interface FullRequestParams extends Omit<AxiosRequestConfig, 'data' | 'params' | 'url' | 'responseType'> {
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

export type RequestParams = Omit<FullRequestParams, 'body' | 'method' | 'query' | 'path'>

export interface ApiConfig<SecurityDataType = unknown> extends Omit<AxiosRequestConfig, 'data' | 'cancelToken'> {
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

  constructor({ securityWorker, secure, format, ...axiosConfig }: ApiConfig<SecurityDataType> = {}) {
    this.instance = axios.create({ ...axiosConfig, baseURL: axiosConfig.baseURL || '' })
    this.secure = secure
    this.format = format
    this.securityWorker = securityWorker
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data
  }

  protected mergeRequestParams(params1: AxiosRequestConfig, params2?: AxiosRequestConfig): AxiosRequestConfig {
    const method = params1.method || (params2 && params2.method)

    return {
      ...this.instance.defaults,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...((method && this.instance.defaults.headers[method.toLowerCase() as keyof HeadersDefaults]) || {}),
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
      const propertyContent: any[] = property instanceof Array ? property : [property]

      for (const formItem of propertyContent) {
        const isFileType = formItem instanceof Blob || formItem instanceof File
        formData.append(key, isFileType ? formItem : this.stringifyFormItem(formItem))
      }

      return formData
    }, new FormData())
  }

  public request = async <T = any, _E = any>(
    { secure, path, type, query, format, body, ...params }: FullRequestParams
  ): Promise<T> => {
    const secureParams =
      ((typeof secure === 'boolean' ? secure : this.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {}
    const requestParams = this.mergeRequestParams(params, secureParams)
    const responseFormat = format || this.format || undefined

    if (type === ContentType.FormData && body && body !== null && typeof body === 'object') {
      body = this.createFormData(body as Record<string, unknown>)
    }

    if (type === ContentType.Text && body && body !== null && typeof body !== 'string') {
      body = JSON.stringify(body)
    }

    return this.instance
      .request({
        ...requestParams,
        headers: {
          ...(requestParams.headers || {}),
          ...(type && type !== ContentType.FormData ? { 'Content-Type': type } : {}),
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
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  courses = {
    /**
     * No description
     *
     * @tags Course
     * @name CoursesList
     * @request GET:/courses
     */
    coursesList: (
      query?: {
        type?: AllCourseType
      },
      params: RequestParams = {}
    ) =>
      this.request<CourseListItemDTO[], any>({
        path: `/courses`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Course
     * @name CoursesCreate
     * @request POST:/courses
     */
    coursesCreate: (data: CourseDTO, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/courses`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Course
     * @name UserDetail
     * @request GET:/courses/user/{userId}
     */
    userDetail: (userId: number, params: RequestParams = {}) =>
      this.request<CourseInfoDTO[], any>({
        path: `/courses/user/${userId}`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Course
     * @name CoursesDetail
     * @request GET:/courses/{courseId}
     */
    coursesDetail: (courseId: number, params: RequestParams = {}) =>
      this.request<CourseInfoDTO, any>({
        path: `/courses/${courseId}`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Course
     * @name CoursesPartialUpdate
     * @request PATCH:/courses/{courseId}
     */
    coursesPartialUpdate: (courseId: number, data: CourseDTO, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/courses/${courseId}`,
        method: 'PATCH',
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Course
     * @name CoursesDelete
     * @request DELETE:/courses/{courseId}
     */
    coursesDelete: (courseId: number, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/courses/${courseId}`,
        method: 'DELETE',
        ...params,
      }),
  }
  enrollments = {
    /**
     * No description
     *
     * @tags Enrollment
     * @name AcceptDetail
     * @request GET:/enrollments/{courseId}/accept/{userId}
     */
    acceptDetail: (courseId: number, userId: number, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/enrollments/${courseId}/accept/${userId}`,
        method: 'GET',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Enrollment
     * @name DeclineDetail
     * @request GET:/enrollments/{courseId}/decline/{userId}
     */
    declineDetail: (courseId: number, userId: number, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/enrollments/${courseId}/decline/${userId}`,
        method: 'GET',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Enrollment
     * @name JoinCreate
     * @request POST:/enrollments/{courseId}/join
     */
    joinCreate: (courseId: number, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/enrollments/${courseId}/join`,
        method: 'POST',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Enrollment
     * @name InviteCreate
     * @request POST:/enrollments/{courseId}/invite/{userId}
     */
    inviteCreate: (courseId: number, userId: number, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/enrollments/${courseId}/invite/${userId}`,
        method: 'POST',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Enrollment
     * @name RemoveDelete
     * @request DELETE:/enrollments/{courseId}/remove/{userId}
     */
    removeDelete: (
      courseId: number,
      userId: string,
      query?: {
        /** @format int32 */
        usersId?: number
      },
      params: RequestParams = {}
    ) =>
      this.request<void, any>({
        path: `/enrollments/${courseId}/remove/${userId}`,
        method: 'DELETE',
        query: query,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Enrollment
     * @name LeaveDelete
     * @request DELETE:/enrollments/{courseId}/leave
     */
    leaveDelete: (courseId: number, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/enrollments/${courseId}/leave`,
        method: 'DELETE',
        ...params,
      }),
  }
  exercise = {
    /**
     * No description
     *
     * @tags Exercise
     * @name AllExerciseInCourseDetail
     * @request GET:/Exercise/{courseId}/AllExerciseInCourse
     */
    allExerciseInCourseDetail: (courseId: number, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/Exercise/${courseId}/AllExerciseInCourse`,
        method: 'GET',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Exercise
     * @name ExerciseDetail
     * @request GET:/Exercise/{exerciseId}
     */
    exerciseDetail: (exerciseId: number, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/Exercise/${exerciseId}`,
        method: 'GET',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Exercise
     * @name FileDetail
     * @request GET:/Exercise/{exerciseId}/File
     */
    fileDetail: (exerciseId: number, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/Exercise/${exerciseId}/File`,
        method: 'GET',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Exercise
     * @name AddExerciseCreate
     * @request POST:/Exercise/AddExercise
     */
    addExerciseCreate: (
      data: {
        /** @format binary */
        File?: File
      },
      query?: {
        /** @format int32 */
        CourseId?: number
        ExerciseName?: string
        ExerciseDescription?: string
        DeadLine?: string
      },
      params: RequestParams = {}
    ) =>
      this.request<void, any>({
        path: `/Exercise/AddExercise`,
        method: 'POST',
        query: query,
        body: data,
        type: ContentType.FormData,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Exercise
     * @name AddFileToExercisePartialUpdate
     * @request PATCH:/Exercise/{exerciseId}/AddFileToExercise
     */
    addFileToExercisePartialUpdate: (
      exerciseId: number,
      data: {
        /** @format binary */
        file?: File
      },
      params: RequestParams = {}
    ) =>
      this.request<void, any>({
        path: `/Exercise/${exerciseId}/AddFileToExercise`,
        method: 'PATCH',
        body: data,
        type: ContentType.FormData,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Exercise
     * @name EditExercisePartialUpdate
     * @request PATCH:/Exercise/{exerciseId}/EditExercise
     */
    editExercisePartialUpdate: (exerciseId: number, data: EditExerciseDTO, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/Exercise/${exerciseId}/EditExercise`,
        method: 'PATCH',
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Exercise
     * @name DeleteExerciseDelete
     * @request DELETE:/Exercise/DeleteExercise
     */
    deleteExerciseDelete: (
      query?: {
        /** @format int32 */
        exerciseId?: number
      },
      params: RequestParams = {}
    ) =>
      this.request<void, any>({
        path: `/Exercise/DeleteExercise`,
        method: 'DELETE',
        query: query,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Exercise
     * @name DeleteFileDelete
     * @request DELETE:/Exercise/DeleteFile
     */
    deleteFileDelete: (
      query?: {
        /** @format int32 */
        fileId?: number
      },
      params: RequestParams = {}
    ) =>
      this.request<void, any>({
        path: `/Exercise/DeleteFile`,
        method: 'DELETE',
        query: query,
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

    /**
     * No description
     *
     * @tags User
     * @name DeleteUserDelete
     * @request DELETE:/User/DeleteUser
     */
    deleteUserDelete: (
      query?: {
        /** @format int32 */
        id?: number
      },
      params: RequestParams = {}
    ) =>
      this.request<void, any>({
        path: `/User/DeleteUser`,
        method: 'DELETE',
        query: query,
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
  weatherForecast = {
    /**
     * No description
     *
     * @tags WeatherForecast
     * @name TestCreate
     * @request POST:/WeatherForecast/Test
     */
    testCreate: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/WeatherForecast/Test`,
        method: 'POST',
        ...params,
      }),

    /**
     * No description
     *
     * @tags WeatherForecast
     * @name InsertToDatabaseCreate
     * @request POST:/WeatherForecast/InsertToDatabase
     */
    insertToDatabaseCreate: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/WeatherForecast/InsertToDatabase`,
        method: 'POST',
        ...params,
      }),
  }
}
