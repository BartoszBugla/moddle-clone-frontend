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

export interface ValidationErrorItemResponseDto {
  /**
   * Name of the field affected by the error
   * @example "fieldName"
   */
  field: string
  /**
   * Error codes
   * @example [123,456]
   */
  errorCodes: number[]
  /**
   * Error message
   * @example ["Error message 1","Error message 2"]
   */
  messages: string[]
}

export interface ValidationErrorResponseDto {
  /**
   * Error code
   * @example 1600
   */
  errorCode: number
  /**
   * Error message
   * @example "Validation exception"
   */
  message: string
  /** Errors */
  errors: ValidationErrorItemResponseDto[]
}

export interface LoginRequestDto {
  /**
   * User email
   * @example "user@email.com"
   */
  email: string
  /**
   * User password
   * @example "password"
   */
  password: string
}

export interface LoginResponseDto {
  /** User token */
  accessToken: string
  /** Refresh token */
  refreshToken: string
}

export interface ErrorResponseDto {
  /**
   * Error code
   * @example "1234"
   */
  errorCode: number
  /**
   * Error message
   * @example "Error: message"
   */
  message: string
  /**
   * Error message params
   * @example {"paramName1":"param 1 value","paramName2":"param 2 value"}
   */
  params: object
}

export interface RegisterRequestDto {
  /**
   * User email
   * @example "user@email.com"
   */
  email: string
  /**
   * User password
   * @minLength 8
   * @example "password"
   */
  password: string
}

export interface RegisterResponseDto {
  /**
   * User name
   * @example "user-name"
   */
  username: string
  /**
   * User email
   * @example "user@email.com"
   */
  email: string
  /**
   * User role
   * @example "admin"
   */
  role?: RegisterResponseDtoRoleEnum
  /**
   * User status
   * @example "active"
   */
  status?: RegisterResponseDtoStatusEnum
  /**
   * User is active
   * @example true
   */
  isActive?: boolean | null
}

export interface GenerateTokenRequestDto {
  /**
   * Code from Cognito
   * @example "b5e15a31-520f-47a9-865e-9e4700cc488b"
   */
  code: string
  /**
   * Redirect URI used for oauth2/authorize callback
   * @example "https://localhost:3000"
   */
  redirectUri: string
}

export interface RefreshTokenRequestDto {
  /**
   * Refresh token
   * @example "refresh-token"
   */
  refreshToken: string
}

export interface RefreshTokenResponseDto {
  /** User token */
  accessToken: string
}

export interface ProfileResponseDto {
  /**
   * User name
   * @example "user-name"
   */
  username: string
  /**
   * User email
   * @example "user@email.com"
   */
  email: string
  /**
   * User role
   * @example "admin"
   */
  role?: ProfileResponseDtoRoleEnum
  /**
   * User status
   * @example "completed"
   */
  status: ProfileResponseDtoStatusEnum
  /**
   * User is active
   * @example true
   */
  isActive?: boolean | null
  /**
   * User cognito status
   * @example "CONFIRMED"
   */
  cognitoStatus?: string | null
  /**
   * User nickname
   * @example "Beat master"
   */
  nickname?: string | null
  /**
   * User firstname
   * @example "John"
   */
  firstName?: string | null
  /**
   * User lastname
   * @example "Doe"
   */
  lastName?: string | null
  /**
   * User artist soundchart id (UUID)
   * @example "aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee"
   */
  artistId?: string | null
  /**
   * User avatar url
   * @example "https://example.com/avatar.jpg"
   */
  avatarUrl?: string | null
  /**
   * Is user email verified
   * @example true
   */
  emailVerified: boolean
}

export interface ProfileRequestDto {
  /**
   * User nickname
   * @example "Beat master"
   */
  nickname?: string | null
  /**
   * User firstname
   * @example "John"
   */
  firstName?: string | null
  /**
   * User lastname
   * @example "Doe"
   */
  lastName?: string | null
  /**
   * User artist soundchart id (UUID)
   * @example "aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee"
   */
  artistId?: string | null
  /**
   * User avatar file
   * @format binary
   */
  avatar?: File | null
}

export interface MetadataDto {
  /**
   * Page number
   * @example 1
   */
  page: number
  /**
   * Error message params
   * @example 20
   */
  limit: number
  /**
   * Total items
   * @example 100
   */
  total: number
  /**
   * Total pages count
   * @example 5
   */
  totalPages: number
}

export interface ArtistListResponseDto {
  /** Metadata */
  metadata: MetadataDto
  /**
   * Artist list
   * @example [null]
   */
  items: string[]
}

export interface SoundchartArtistResponseDto {
  /** @example "11e81bcc-9c1c-ce38-b96b-a0369fe50396" */
  uuid: string
  /** @example "billie-eilish" */
  slug: string
  /** @example "Billie Eilish" */
  name: string
  /** @example "https://app.soundcharts.com/app/artist/billie-eilish/overview" */
  appUrl: string
  /** @example "https://assets.soundcharts.com/artist/c/1/c/11e81bcc-9c1c-ce38-b96b-a0369fe50396.jpg" */
  imageUrl: string
}

export interface SoundchartPageResponseDto {
  /** @example 0 */
  offset: number
  /** @example 20 */
  limit: number
  /** @example null */
  next: string
  /** @example null */
  previous: string
  /** @example 10 */
  total: number
}

export interface SoundchartSearchArtistResponseDto {
  /** List of soundchart artists */
  items: SoundchartArtistResponseDto[]
  page: SoundchartPageResponseDto[]
  /** @example [] */
  errors: string[]
}

export interface EventResponseDto {
  /**
   * Venue code
   * @example "wells-fargo-center"
   */
  code?: string | null
  /**
   * Venue image
   * @example "https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Wells_Fargo_Center_-_2019_OWL_Grand_Finals.jpg/275px-Wells_Fargo_Center_-_2019_OWL_Grand_Finals.jpg"
   */
  image: string
  /**
   * Name of the artists group
   * @example "Wells Fargo Center"
   */
  name: string
  /**
   * Artists count in the group
   * @example "2024-11-23"
   */
  date: string
  /**
   * Place
   * @example "PA, Philadelphia"
   */
  place: string
  /**
   * Link to event
   * @example "www.event-link.com"
   */
  link: string
}

export interface EventListResponseDto {
  /** Metadata */
  metadata: MetadataDto
  /** Event list */
  items: EventResponseDto[]
}

export interface DictionaryItemResponseDto {
  /**
   * Unique dictionary item code
   * @example "dict-item-code"
   */
  code: string
  /**
   * Dictionary item name
   * @example "Item name"
   */
  name: string
  /**
   * Additional item data
   * @example {"some-key":"additional data"}
   */
  additionalData?: object
}

export interface StatsCollectionItemFollowersActivityResponseDto {
  /**
   * Trend
   * @example "up"
   */
  trend: StatsCollectionItemFollowersActivityResponseDtoTrendEnum
  /**
   * Media type
   * @example "post"
   */
  mediaType: StatsCollectionItemFollowersActivityResponseDtoMediaTypeEnum
  /**
   * Platform trend value
   * @example 234
   */
  platformTrendValue: number
  /**
   * Followers trend value
   * @example 345
   */
  followersTrendValue: number
}

export interface StatsCollectionItemFansResponseDto {
  /**
   * Searches value
   * @example 123
   */
  value: number
}

export interface StatsCollectionItemResponseDto {
  /**
   * Item date
   * @example "2024-06-17"
   */
  date: string
  /**
   * Item code
   * @example "mo"
   */
  code: string
  /** Item data */
  data:
    | StatsCollectionItemFansResponseDto
    | StatsCollectionItemFollowersActivityResponseDto
}

export interface StatsCollectionResponseDto {
  /**
   * Stats type
   * @example "searches"
   */
  type: StatsCollectionResponseDtoTypeEnum
  /**
   * Period type
   * @example "week"
   */
  periodType: StatsCollectionResponseDtoPeriodTypeEnum
  /**
   * Searches date - period start from
   * @example "2024-06-17"
   */
  date: string
  /**
   * Compared last period in relation to sent date
   * @example 34.5
   */
  comparedLastPeriod?: number | null
  /** Searches interval items */
  intervalItems?: StatsCollectionItemResponseDto[] | null
}

export interface MusicConcierge {
  /**
   * ID
   * @example "aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee"
   */
  id: string
  /**
   * Created at
   * @format date-time
   * @example "2024-06-12T12:00:00.000Z"
   */
  createdAt: string
  /**
   * Updated at
   * @format date-time
   * @example "2024-06-12T12:00:00.000Z"
   */
  updatedAt: string
  /**
   * User email
   * @example "user@email.com"
   */
  userEmail: string
  /**
   * Music concierge name
   * @example "Dylan"
   */
  name: string
  /**
   * Avatar type
   * @example "man"
   */
  avatar: MusicConciergeAvatarEnum
  /**
   * Music concierge goals
   * @example ["audience","tours"]
   */
  goals?: string[] | null
}

export interface CreateMusicConciergeRequestDto {
  /**
   * Music concierge name
   * @example "Zdzisław"
   */
  name: string
  /**
   * Music concierge avatar
   * @example "duck"
   */
  avatar: string
  /** Music concierge goals */
  goals?: string[] | null
}

export interface UpdateMusicConciergeRequestDto {
  /**
   * Music concierge name
   * @example "Zdzisław"
   */
  name?: string | null
  /**
   * Music concierge avatar
   * @example "duck"
   */
  avatar?: string | null
  /** Music concierge goals */
  goals?: string[] | null
}

export interface ChatResponseDto {
  /**
   * Chat identificator (UUIDv4)
   * @example "6ddf8faa-fad5-4ac9-bd81-bbe1a5c5990a"
   */
  id: string
  /**
   * Title of the chat, autogenerated or manually corrected
   * @example "How to make a tasteful sandwich"
   */
  title: string
  /**
   * Time of chat creation
   * @format date-time
   */
  createdAt: string
}

export interface ChatListResponseDto {
  /** User's chats */
  chats: ChatResponseDto[]
}

export interface MessageRequestDto {
  /** Prompt to the AI model */
  prompt: string
}

export interface Chat {
  /**
   * ID
   * @example "aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee"
   */
  id: string
  /**
   * Created at
   * @format date-time
   * @example "2024-06-12T12:00:00.000Z"
   */
  createdAt: string
  /**
   * Updated at
   * @format date-time
   * @example "2024-06-12T12:00:00.000Z"
   */
  updatedAt: string
  /**
   * Chat title
   * @example "Starting as a musician in 2024"
   */
  title: string
}

export interface PostChatResponseDto {
  /** Created chat */
  chat: Chat
  /**
   * Response from the AI model
   * @example "The capital of Poland is Warsaw"
   */
  response: string
}

export interface PostMessageResponseDto {
  /** Response from the AI model */
  response: string
  /**
   * ISO Datetime of message generation
   * @format date-time
   */
  generatedAt: string
}

export interface MessageResponseItemDto {
  /**
   * Message ID
   * @example "489184ab-ccb1-4e37-8ada-a3f506967534"
   */
  id: string
  /**
   * Message author
   * @example "human"
   */
  author: MessageResponseItemDtoAuthorEnum
  /**
   * Message text
   * @example "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse mollis lectus nisi, sed venenatis est sagittis in."
   */
  text: string
  /**
   * Creation date (ISO)
   * @format date-time
   * @example "2024-08-12T12:00:00:000Z"
   */
  createdAt: string
  /**
   * Date of edit or regeneration (ISO)
   * @format date-time
   * @example "2024-08-12T12:00:00:000Z"
   */
  editedAt: string | null
  /**
   * If true, generation of this message was stopped by user
   * @example false
   */
  generationStopped: boolean
  /**
   * Like or dislike about the message quality
   * @example true
   */
  likeStatus: boolean | null
}

export interface MessageListResponseDto {
  /** Requested messages */
  messages: MessageResponseItemDto[]
  /** Metadata */
  metadata: MetadataDto
}

export interface UpdateChatRequestDto {
  /** Title of the chat */
  title: string
}

/**
 * User role
 * @example "admin"
 */
export enum RegisterResponseDtoRoleEnum {
  Admin = 'admin',
  User = 'user',
  Guest = 'guest',
}

/**
 * User status
 * @example "active"
 */
export enum RegisterResponseDtoStatusEnum {
  NoMusicConcierge = 'no-music-concierge',
  Completed = 'completed',
}

/**
 * User role
 * @example "admin"
 */
export enum ProfileResponseDtoRoleEnum {
  Admin = 'admin',
  User = 'user',
  Guest = 'guest',
}

/**
 * User status
 * @example "completed"
 */
export enum ProfileResponseDtoStatusEnum {
  NoMusicConcierge = 'no-music-concierge',
  Completed = 'completed',
}

/**
 * Trend
 * @example "up"
 */
export enum StatsCollectionItemFollowersActivityResponseDtoTrendEnum {
  Down = 'down',
  Up = 'up',
  NoChange = 'no-change',
}

/**
 * Media type
 * @example "post"
 */
export enum StatsCollectionItemFollowersActivityResponseDtoMediaTypeEnum {
  Video = 'video',
  Post = 'post',
}

/**
 * Stats type
 * @example "searches"
 */
export enum StatsCollectionResponseDtoTypeEnum {
  Searches = 'searches',
  FollowersActivity = 'followers-activity',
}

/**
 * Period type
 * @example "week"
 */
export enum StatsCollectionResponseDtoPeriodTypeEnum {
  Day = 'day',
  Week = 'week',
  Month = 'month',
  Year = 'year',
}

/**
 * Avatar type
 * @example "man"
 */
export enum MusicConciergeAvatarEnum {
  Default = 'default',
  Man = 'man',
  Emoticon = 'emoticon',
  Child = 'child',
  Duck = 'duck',
  Woman = 'woman',
}

/**
 * Message author
 * @example "human"
 */
export enum MessageResponseItemDtoAuthorEnum {
  System = 'system',
  Ai = 'ai',
  Human = 'human',
}

/**
 * Music genre
 * @example "rock"
 */
export enum ArtistControllerArtistsParamsMusicGenreEnum {
  Acoustic = 'acoustic',
  DeathMetal = 'death-metal',
  Pop = 'pop',
  Rock = 'rock',
}

export enum StatsControllerFansParamsPeriodTypeEnum {
  Week = 'week',
  Month = 'month',
  Year = 'year',
}

export enum StatsControllerFansParamsEnum {
  Week = 'week',
  Month = 'month',
  Year = 'year',
}

export enum StatsControllerFollowersActivityParamsPeriodTypeEnum {
  Day = 'day',
  Week = 'week',
  Month = 'month',
  Year = 'year',
}

export enum StatsControllerFollowersActivityParamsEnum {
  Day = 'day',
  Week = 'week',
  Month = 'month',
  Year = 'year',
}

/** Filter by author of the message */
export enum ChatsControllerGetMessageParamsAuthorTypeEnum {
  System = 'system',
  Ai = 'ai',
  Human = 'human',
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
 * @title Loop REST API
 * @version 1.0
 * @contact
 *
 * The REST API for Loop application
 */
export class Api<
  SecurityDataType extends unknown,
> extends HttpClient<SecurityDataType> {
  health = {
    /**
     * No description
     *
     * @tags Health
     * @name HealthControllerCheck
     * @request GET:/health
     */
    healthControllerCheck: (params: RequestParams = {}) =>
      this.request<
        {
          /** @example "ok" */
          status?: string
          /** @example {"database":{"status":"up"}} */
          info?: Record<
            string,
            {
              status: string
              [key: string]: any
            }
          >
          /** @example {} */
          error?: Record<
            string,
            {
              status: string
              [key: string]: any
            }
          >
          /** @example {"database":{"status":"up"}} */
          details?: Record<
            string,
            {
              status: string
              [key: string]: any
            }
          >
        },
        {
          /** @example "error" */
          status?: string
          /** @example {"database":{"status":"up"}} */
          info?: Record<
            string,
            {
              status: string
              [key: string]: any
            }
          >
          /** @example {"redis":{"status":"down","message":"Could not connect"}} */
          error?: Record<
            string,
            {
              status: string
              [key: string]: any
            }
          >
          /** @example {"database":{"status":"up"},"redis":{"status":"down","message":"Could not connect"}} */
          details?: Record<
            string,
            {
              status: string
              [key: string]: any
            }
          >
        }
      >({
        path: `/health`,
        method: 'GET',
        format: 'json',
        ...params,
      }),
  }
  auth = {
    /**
     * No description
     *
     * @tags Auth
     * @name AuthControllerLogin
     * @request POST:/auth/login
     */
    authControllerLogin: (data: LoginRequestDto, params: RequestParams = {}) =>
      this.request<
        LoginResponseDto,
        ValidationErrorResponseDto | ErrorResponseDto
      >({
        path: `/auth/login`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Auth
     * @name AuthControllerRegister
     * @request POST:/auth/register
     */
    authControllerRegister: (
      data: RegisterRequestDto,
      params: RequestParams = {}
    ) =>
      this.request<
        RegisterResponseDto,
        ValidationErrorResponseDto | ErrorResponseDto
      >({
        path: `/auth/register`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Auth
     * @name AuthControllerGenerateToken
     * @request POST:/auth/token/generate
     */
    authControllerGenerateToken: (
      data: GenerateTokenRequestDto,
      params: RequestParams = {}
    ) =>
      this.request<LoginResponseDto, ValidationErrorResponseDto>({
        path: `/auth/token/generate`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Auth
     * @name AuthControllerRefreshToken
     * @request POST:/auth/token/refresh
     */
    authControllerRefreshToken: (
      data: RefreshTokenRequestDto,
      params: RequestParams = {}
    ) =>
      this.request<RefreshTokenResponseDto, ValidationErrorResponseDto>({
        path: `/auth/token/refresh`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),
  }
  profile = {
    /**
     * No description
     *
     * @tags Profile
     * @name ProfileControllerGetProfile
     * @request GET:/profile
     * @secure
     */
    profileControllerGetProfile: (params: RequestParams = {}) =>
      this.request<ProfileResponseDto, ErrorResponseDto>({
        path: `/profile`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Profile
     * @name ProfileControllerUpdateProfile
     * @request PATCH:/profile
     * @secure
     */
    profileControllerUpdateProfile: (
      data: ProfileRequestDto,
      params: RequestParams = {}
    ) =>
      this.request<
        ProfileResponseDto,
        ValidationErrorResponseDto | ErrorResponseDto
      >({
        path: `/profile`,
        method: 'PATCH',
        body: data,
        secure: true,
        type: ContentType.FormData,
        format: 'json',
        ...params,
      }),
  }
  artist = {
    /**
     * No description
     *
     * @tags Artist
     * @name ArtistControllerArtists
     * @request GET:/artist
     * @secure
     */
    artistControllerArtists: (
      query?: {
        /**
         * Music genre
         * @example "rock"
         */
        musicGenre?: ArtistControllerArtistsParamsMusicGenreEnum
      },
      params: RequestParams = {}
    ) =>
      this.request<ArtistListResponseDto, ErrorResponseDto>({
        path: `/artist`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Artist
     * @name ArtistControllerTopArtists
     * @request GET:/artist/top
     * @secure
     */
    artistControllerTopArtists: (params: RequestParams = {}) =>
      this.request<ArtistListResponseDto, ErrorResponseDto>({
        path: `/artist/top`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Artist
     * @name ArtistControllerSearch
     * @request GET:/artist/search
     * @secure
     */
    artistControllerSearch: (
      query: {
        /**
         * Term to search for
         * @example "billie eilish"
         */
        term: string
      },
      params: RequestParams = {}
    ) =>
      this.request<SoundchartSearchArtistResponseDto, ErrorResponseDto>({
        path: `/artist/search`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),
  }
  event = {
    /**
     * No description
     *
     * @tags Event
     * @name EventControllerUpcomingEvents
     * @request GET:/event
     * @secure
     */
    eventControllerUpcomingEvents: (params: RequestParams = {}) =>
      this.request<EventListResponseDto, ErrorResponseDto>({
        path: `/event`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),
  }
  dictionary = {
    /**
     * No description
     *
     * @tags Dictionary
     * @name DictionaryControllerDictionaryList
     * @request GET:/dictionary
     * @secure
     */
    dictionaryControllerDictionaryList: (params: RequestParams = {}) =>
      this.request<string[], ErrorResponseDto>({
        path: `/dictionary`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Dictionary
     * @name DictionaryControllerDictionary
     * @request GET:/dictionary/{dictionaryCode}
     * @secure
     */
    dictionaryControllerDictionary: (
      dictionaryCode: string,
      params: RequestParams = {}
    ) =>
      this.request<
        DictionaryItemResponseDto[],
        ValidationErrorResponseDto | ErrorResponseDto
      >({
        path: `/dictionary/${dictionaryCode}`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),
  }
  stats = {
    /**
     * No description
     *
     * @tags Stats
     * @name StatsControllerFans
     * @request GET:/stats/fans/{periodType}/{date}
     * @secure
     */
    statsControllerFans: (
      periodType: StatsControllerFansParamsEnum,
      date: string,
      params: RequestParams = {}
    ) =>
      this.request<
        StatsCollectionResponseDto,
        ValidationErrorResponseDto | ErrorResponseDto
      >({
        path: `/stats/fans/${periodType}/${date}`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Stats
     * @name StatsControllerFollowersActivity
     * @request GET:/stats/followers-activity/{periodType}/{date}
     * @secure
     */
    statsControllerFollowersActivity: (
      periodType: StatsControllerFollowersActivityParamsEnum,
      date: string,
      params: RequestParams = {}
    ) =>
      this.request<
        StatsCollectionResponseDto,
        ValidationErrorResponseDto | ErrorResponseDto
      >({
        path: `/stats/followers-activity/${periodType}/${date}`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),
  }
  ai = {
    /**
     * No description
     *
     * @tags AI
     * @name MusicConciergeControllerGet
     * @request GET:/ai/music-concierge
     * @secure
     */
    musicConciergeControllerGet: (params: RequestParams = {}) =>
      this.request<MusicConcierge, ErrorResponseDto>({
        path: `/ai/music-concierge`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags AI
     * @name MusicConciergeControllerCreate
     * @request POST:/ai/music-concierge
     * @secure
     */
    musicConciergeControllerCreate: (
      data: CreateMusicConciergeRequestDto,
      params: RequestParams = {}
    ) =>
      this.request<
        MusicConcierge,
        ValidationErrorResponseDto | ErrorResponseDto
      >({
        path: `/ai/music-concierge`,
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
     * @tags AI
     * @name MusicConciergeControllerUpdate
     * @request PATCH:/ai/music-concierge
     * @secure
     */
    musicConciergeControllerUpdate: (
      data: UpdateMusicConciergeRequestDto,
      params: RequestParams = {}
    ) =>
      this.request<
        MusicConcierge,
        ValidationErrorResponseDto | ErrorResponseDto
      >({
        path: `/ai/music-concierge`,
        method: 'PATCH',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags AI / Chat
     * @name ChatsControllerGetChat
     * @request GET:/ai/chat
     * @secure
     */
    chatsControllerGetChat: (
      query?: {
        /** Filter by the part of the title */
        title?: string
      },
      params: RequestParams = {}
    ) =>
      this.request<
        ChatListResponseDto,
        ValidationErrorResponseDto | ErrorResponseDto
      >({
        path: `/ai/chat`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags AI / Chat
     * @name ChatsControllerStartChat
     * @request POST:/ai/chat
     * @secure
     */
    chatsControllerStartChat: (
      data: MessageRequestDto,
      params: RequestParams = {}
    ) =>
      this.request<
        PostChatResponseDto,
        ValidationErrorResponseDto | ErrorResponseDto
      >({
        path: `/ai/chat`,
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
     * @tags AI / Chat
     * @name ChatsControllerAddMessage
     * @request POST:/ai/chat/{chatId}/message
     * @secure
     */
    chatsControllerAddMessage: (
      chatId: string,
      data: MessageRequestDto,
      params: RequestParams = {}
    ) =>
      this.request<
        PostMessageResponseDto,
        ValidationErrorResponseDto | ErrorResponseDto
      >({
        path: `/ai/chat/${chatId}/message`,
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
     * @tags AI / Chat
     * @name ChatsControllerGetMessage
     * @request GET:/ai/chat/{chatId}/message
     * @secure
     */
    chatsControllerGetMessage: (
      chatId: string,
      query?: {
        /**
         * Number of messages to fetch
         * @min 0
         * @max 100
         * @default 25
         * @example 25
         */
        limit?: number
        /**
         * Number of latest messages to skip
         * @min 0
         * @default 0
         * @example 0
         */
        skip?: number
        /** Filter by author of the message */
        authorType?: ChatsControllerGetMessageParamsAuthorTypeEnum
        /** Search by part of text */
        text?: string
        /**
         * Filter by like status
         * @example "true"
         */
        liked?: string
      },
      params: RequestParams = {}
    ) =>
      this.request<
        MessageListResponseDto,
        ValidationErrorResponseDto | ErrorResponseDto
      >({
        path: `/ai/chat/${chatId}/message`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags AI / Chat
     * @name ChatsControllerUpdateChat
     * @request PATCH:/ai/chat/{chatId}
     * @secure
     */
    chatsControllerUpdateChat: (
      chatId: string,
      data: UpdateChatRequestDto,
      params: RequestParams = {}
    ) =>
      this.request<Chat, ValidationErrorResponseDto | ErrorResponseDto>({
        path: `/ai/chat/${chatId}`,
        method: 'PATCH',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags AI / Chat
     * @name ChatsControllerDeleteChat
     * @request DELETE:/ai/chat/{chatId}
     * @secure
     */
    chatsControllerDeleteChat: (chatId: string, params: RequestParams = {}) =>
      this.request<void, ValidationErrorResponseDto | ErrorResponseDto>({
        path: `/ai/chat/${chatId}`,
        method: 'DELETE',
        secure: true,
        ...params,
      }),
  }
}
