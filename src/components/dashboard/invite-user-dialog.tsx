import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { api } from '@/lib/api'
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
  // TODO filter out logged user
  const { data: users } = useQuery({
    queryKey: ['users'],
    queryFn: () => api.user.allUsersList(),
  })

  const { mutateAsync: invite } = useMutation({
    mutationFn: (userId: number) =>
      api.enrollments.inviteCreate(courseId, userId),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['course', courseId.toString()],
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
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>
        <ul className="flex flex-col gap-2 overflow-y-auto max-h-[200px]">
          {(users || [])
            .filter((user) => !usersInCourse.includes(user.id))
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
                  <Button onClick={() => invite(student.id)} size="sm">
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
