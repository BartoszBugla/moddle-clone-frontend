import { CourseModel, RoleModel } from '@/lib/api/temp-models'
import { handleMock } from './handle-mock'

// const getUserMock = (): UserModel => {
//   return
// }

export const getCoursesMock = async () => {
  return handleMock<CourseModel>({
    createdAt: '2021-09-29T14:00:00.000Z',
    description: 'This is a course',
    exercises: [],
    id: 1,
    name: 'Course 1',
    owner: {
      id: 1,
      username: 'Owner',
      courses: [],
      exercises: [],
      role: RoleModel.TEACHER,
      coursesOwned: [],
      createdAt: '2021-09-29T14:00:00.000Z',
      updatedAt: '2021-09-29T14:00:00.000Z',
      email: '',
    },
    students: [],
    teachers: [],
    updatedAt: '2021-09-29T14:00:00.000Z',
  })
}
