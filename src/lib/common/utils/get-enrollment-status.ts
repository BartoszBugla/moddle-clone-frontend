export enum EnrollmentStatus {
  InCourse,
  InvitedTo,
  Requested,
  CanEnroll,
}

export const getEnrollmentStatus = (
  adminDecission?: boolean,
  userDecission?: boolean
) => {
  if (!userDecission && !adminDecission) return EnrollmentStatus.CanEnroll
  if (adminDecission && !userDecission) return EnrollmentStatus.InvitedTo
  if (adminDecission && userDecission) return EnrollmentStatus.InCourse
  if (!adminDecission && userDecission) return EnrollmentStatus.Requested
  return EnrollmentStatus.CanEnroll
}
