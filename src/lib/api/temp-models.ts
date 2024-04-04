export interface GradeModel {
  id: number

  grade: number
  comment: string
  reviewedBy: UserModel
  exerciseId: number
  exercise: number
  createdAt: string
  updatedAt: string
}

export enum RoleModel {
  STUDENT = 'STUDENT',
  TEACHER = 'TEACHER',
}

export interface CourseModel {
  id: number

  name: string
  description: string

  exercises: ExerciseModel[]
  owner: UserModel
  teachers: UserModel[]
  students: UserModel[]

  createdAt: string
  updatedAt: string
}

export interface FileMetadataModel {
  id: number

  name: string
  path: string
  type: string
  createdAt: string
  updatedAt: string
}

export interface ExerciseModel {
  id: number

  courseId: number
  name: string
  description: string
  endsAt: string
  startsAt: string

  files: FileMetadataModel[]
  grade: GradeModel

  createdAt: string
  updatedAt: string
}

export interface UserModel {
  id: number
  username: string
  email: string
  role: RoleModel

  exercises: ExerciseModel[]

  courses: CourseModel[]
  coursesOwned: CourseModel[]
  createdAt: string
  updatedAt: string
}

export interface PaginatedModel<T> {
  data: T[]
  total: number
}

/** AUTH */

// POST /auth/sign-up
export interface SignUpRequest {
  username: string
  email: string
  password: string
}

export interface SignUpResponse {
  token: string
}

// POST /auth/sign-in
export interface SignInRequest {
  email: string
  password: string
}

export interface SignInResponse {
  token: string
}

// GET /auth/me
// Zdekodowany token bierze z bazy usera i go zwraca
export type MeResponse = UserModel

/** COURSES */

// POST /courses
export interface CreateCourseRequest {
  name: string
  description: string
}

export type CreateCourseResponse = CourseModel

// GET /courses
export type GetCoursesResponse = PaginatedModel<CourseModel>

// GET /courses/:id
export type GetCourseResponse = CourseModel

// PUT /courses/:id
export interface UpdateCourseRequest {
  name: string
  description: string
}

export type UpdateCourseResponse = CourseModel

/**  */
