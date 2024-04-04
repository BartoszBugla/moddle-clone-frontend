export const handleMock = <T>(data: T, time: number = 500) =>
  new Promise<T>((res, rej) => {
    setTimeout(() => {
      if (Math.random() > 0.95) {
        rej('Something Went wrong')
      } else {
        res(data)
      }
    }, time)
  })
