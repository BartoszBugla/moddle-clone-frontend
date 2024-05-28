import { useCourse } from '@/lib/api/hooks/course'
import { useGetExercise } from '@/lib/api/hooks/exercise'

export interface ExerciseTeacherListProps {
  exerciseId: number
  courseId: number
}

export const ExerciseTeacherList = ({
  exerciseId,
  courseId,
}: ExerciseTeacherListProps) => {
  const { data: exercise } = useGetExercise(exerciseId)
  const { data: course } = useCourse(courseId)

  return (
    <div>
      {(course?.students || []).map((student) => {
        return (
          <div key={student.id}>
            {student.name} {student.surname} ({student.username})
          </div>
        )
      })}
    </div>
  )
}
