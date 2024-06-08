import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { api } from '@/lib/api'
import { useAuth } from '@/lib/store/auth'
import { Button } from '../ui'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog'

export interface InviteUserDialogProps {
  courseId: number
  usersInCourse: number[]
}

export const InviteUserDialog = ({
  usersInCourse,
  courseId,
}: InviteUserDialogProps) => {
  const queryClient = useQueryClient()
  const profile = useAuth((state) => state.accessTokenPayload)

  const { data: users } = useQuery({
    queryKey: ['users'],
    queryFn: () => api.user.allUsersList(),
  })

  const { mutateAsync: invite } = useMutation({
    mutationFn: (userId: number) =>
      api.enrollments.inviteCreate(courseId, userId),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['course', Number(courseId)],
      })
      queryClient.invalidateQueries({
        queryKey: ['users'],
      })
      toast.success('Invited successfully')
    },
  })

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Invite</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Invite users to your course</DialogTitle>
        </DialogHeader>
        <ul className="flex flex-col gap-2 overflow-y-auto max-h-[200px]">
          {(users || [])
            .filter(
              (user) =>
                user?.id &&
                user.id !== Number(profile?.id || 0) &&
                !usersInCourse.includes(user.id)
            )
            .map((student, idx) => {
              return (
                <li
                  key={student.id}
                  className="flex flex-row justify-between text-sm items-center h-10"
                >
                  <div className="flex flex-row gap-2 items-center overflow-auto">
                    {/* <span>{student.username}</span> */}
                    <span>
                      {idx + 1}. {student.name} {student.surname} (
                      {student.username})
                    </span>
                  </div>
                  <Button onClick={() => invite(student?.id || 0)} size="sm">
                    Invite
                  </Button>
                </li>
              )
            })}
        </ul>
      </DialogContent>
    </Dialog>
  )
}
