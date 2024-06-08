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
  NotUser = 'NotUser',
  Author = 'Author',
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
  adminDecision?: boolean
  userDecision?: boolean
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

export interface CreateExerciseDTO {
  /** @format int32 */
  courseId?: number
  exerciseName?: string | null
  exerciseDescription?: string | null
  deadLine?: string | null
}

export interface CreateGradeDTO {
  /** @format int32 */
  studentId?: number
  /** @format int32 */
  grade?: number
  comment?: string | null
}

export interface EditExerciseDTO {
  /** @format int32 */
  courseId?: number
  exerciseName?: string | null
  exerciseDescription?: string | null
  deadLine?: string | null
}

export interface ExerciseDTO {
  /** @format int32 */
  id?: number
  /** @format int32 */
  courseId?: number
  exerciseName?: string | null
  exerciseDescription?: string | null
  deadLine?: string | null
  /** @format binary */
  file?: File | null
}

export interface GradeDTO {
  /** @format int32 */
  userId?: number
  /** @format int32 */
  exerciseId?: number
  studentComment?: string | null
  teacherComment?: string | null
  /** @format int32 */
  gradePercentage?: number | null
  /** @format date-time */
  postDate?: string
  /** @format int32 */
  fileUploadUrl?: number | null
}

export interface GradedExerciseDTO {
  /** @format int32 */
  id?: number
  /** @format int32 */
  courseId?: number
  exerciseName?: string | null
  exerciseDescription?: string | null
  deadLine?: string | null
  grade?: GradeDTO
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

export interface TeacherGradedExerciseDTO {
  /** @format int32 */
  id?: number
  /** @format int32 */
  courseId?: number
  exerciseName?: string | null
  exerciseDescription?: string | null
  deadLine?: string | null
  grades?: GradeDTO[] | null
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
 * @title Moje API
 * @version v1
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  courses = {
    /**
     * No description
     *
     * @tags Course
     * @name CoursesList
     * @request GET:/courses
     * @secure
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
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Course
     * @name CoursesCreate
     * @request POST:/courses
     * @secure
     */
    coursesCreate: (data: CourseDTO, params: RequestParams = {}) =>
      this.request<number, any>({
        path: `/courses`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Course
     * @name UserDetail
     * @request GET:/courses/user/{userId}
     * @secure
     */
    userDetail: (userId: number, params: RequestParams = {}) =>
      this.request<CourseInfoDTO[], any>({
        path: `/courses/user/${userId}`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Course
     * @name CoursesDetail
     * @request GET:/courses/{courseId}
     * @secure
     */
    coursesDetail: (courseId: number, params: RequestParams = {}) =>
      this.request<CourseInfoDTO, any>({
        path: `/courses/${courseId}`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Course
     * @name CoursesPartialUpdate
     * @request PATCH:/courses/{courseId}
     * @secure
     */
    coursesPartialUpdate: (courseId: number, data: CourseDTO, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/courses/${courseId}`,
        method: 'PATCH',
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Course
     * @name CoursesDelete
     * @request DELETE:/courses/{courseId}
     * @secure
     */
    coursesDelete: (courseId: number, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/courses/${courseId}`,
        method: 'DELETE',
        secure: true,
        ...params,
      }),
  }
  enrollments = {
    /**
     * No description
     *
     * @tags Enrollment
     * @name AcceptPartialUpdate
     * @request PATCH:/enrollments/{courseId}/accept/{userId}
     * @secure
     */
    acceptPartialUpdate: (courseId: number, userId: number, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/enrollments/${courseId}/accept/${userId}`,
        method: 'PATCH',
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Enrollment
     * @name DeclineDelete
     * @request DELETE:/enrollments/{courseId}/decline/{userId}
     * @secure
     */
    declineDelete: (courseId: number, userId: number, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/enrollments/${courseId}/decline/${userId}`,
        method: 'DELETE',
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Enrollment
     * @name InviteCreate
     * @request POST:/enrollments/{courseId}/invite/{userId}
     * @secure
     */
    inviteCreate: (courseId: number, userId: number, params: RequestParams = {}) =>
      this.request<number, any>({
        path: `/enrollments/${courseId}/invite/${userId}`,
        method: 'POST',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Enrollment
     * @name JoinCreate
     * @request POST:/enrollments/{courseId}/join
     * @secure
     */
    joinCreate: (courseId: number, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/enrollments/${courseId}/join`,
        method: 'POST',
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Enrollment
     * @name DeclineDelete2
     * @request DELETE:/enrollments/{courseId}/decline
     * @originalName declineDelete
     * @duplicate
     * @secure
     */
    declineDelete2: (courseId: number, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/enrollments/${courseId}/decline`,
        method: 'DELETE',
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Enrollment
     * @name AcceptPartialUpdate2
     * @request PATCH:/enrollments/{courseId}/accept
     * @originalName acceptPartialUpdate
     * @duplicate
     * @secure
     */
    acceptPartialUpdate2: (courseId: number, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/enrollments/${courseId}/accept`,
        method: 'PATCH',
        secure: true,
        ...params,
      }),
  }
  exercise = {
    /**
     * No description
     *
     * @tags Exercise
     * @name ExerciseCreate
     * @request POST:/exercise
     * @secure
     */
    exerciseCreate: (data: CreateExerciseDTO, params: RequestParams = {}) =>
      this.request<ExerciseDTO, any>({
        path: `/exercise`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Exercise
     * @name ExerciseDetail
     * @request GET:/exercise/{exerciseId}
     * @secure
     */
    exerciseDetail: (exerciseId: number, params: RequestParams = {}) =>
      this.request<GradedExerciseDTO, any>({
        path: `/exercise/${exerciseId}`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Exercise
     * @name ExerciseDelete
     * @request DELETE:/exercise/{exerciseId}
     * @secure
     */
    exerciseDelete: (exerciseId: number, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/exercise/${exerciseId}`,
        method: 'DELETE',
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Exercise
     * @name ExercisePartialUpdate
     * @request PATCH:/exercise/{exerciseId}
     * @secure
     */
    exercisePartialUpdate: (exerciseId: number, data: EditExerciseDTO, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/exercise/${exerciseId}`,
        method: 'PATCH',
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Exercise
     * @name GradesDetail
     * @request GET:/exercise/{exerciseId}/grades
     * @secure
     */
    gradesDetail: (exerciseId: number, params: RequestParams = {}) =>
      this.request<TeacherGradedExerciseDTO, any>({
        path: `/exercise/${exerciseId}/grades`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Exercise
     * @name GradeCreate
     * @request POST:/exercise/{exerciseId}/grade
     * @secure
     */
    gradeCreate: (exerciseId: number, data: CreateGradeDTO, params: RequestParams = {}) =>
      this.request<GradedExerciseDTO, any>({
        path: `/exercise/${exerciseId}/grade`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Exercise
     * @name UploadCreate
     * @request POST:/exercise/{exerciseId}/upload
     * @secure
     */
    uploadCreate: (
      exerciseId: number,
      data: {
        comment?: string
        /** @format binary */
        file?: File
      },
      params: RequestParams = {}
    ) =>
      this.request<GradedExerciseDTO, any>({
        path: `/exercise/${exerciseId}/upload`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.FormData,
        format: 'json',
        ...params,
      }),
  }
  grades = {
    /**
     * No description
     *
     * @tags Grade
     * @name AddGradeCreate
     * @request POST:/grades/AddGrade/{exerciseId}
     * @secure
     */
    addGradeCreate: (
      exerciseId: number,
      data: {
        /** @format binary */
        file?: File
      },
      query?: {
        comment?: string
      },
      params: RequestParams = {}
    ) =>
      this.request<void, any>({
        path: `/grades/AddGrade/${exerciseId}`,
        method: 'POST',
        query: query,
        body: data,
        secure: true,
        type: ContentType.FormData,
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
     * @secure
     */
    allUsersList: (params: RequestParams = {}) =>
      this.request<UserDTO[], any>({
        path: `/User/AllUsers`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags User
     * @name RegisterCreate
     * @request POST:/User/Register
     * @secure
     */
    registerCreate: (data: RegisterDTO, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/User/Register`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags User
     * @name LoginCreate
     * @request POST:/User/Login
     * @secure
     */
    loginCreate: (data: UserLoginDTO, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/User/Login`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags User
     * @name DeleteUserDelete
     * @request DELETE:/User/DeleteUser
     * @secure
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
        secure: true,
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
     * @secure
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
        secure: true,
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
     * @secure
     */
    testCreate: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/WeatherForecast/Test`,
        method: 'POST',
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags WeatherForecast
     * @name InsertToDatabaseCreate
     * @request POST:/WeatherForecast/InsertToDatabase
     * @secure
     */
    insertToDatabaseCreate: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/WeatherForecast/InsertToDatabase`,
        method: 'POST',
        secure: true,
        ...params,
      }),
  }
}
