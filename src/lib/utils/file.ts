export const getFileUrl = (id: number) => {
  return `${import.meta.env.VITE_API_BASE_URL}/grades/file/${id}`
}
