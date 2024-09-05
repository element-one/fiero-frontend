export const formatLiveAtDate = (dateStr: string) => {
  try {
    const date = new Date(dateStr)

    if (isNaN(date.getDate())) {
      return ''
    }

    return `${date.getMonth() + 1}/${date.getDate()}`
  } catch (error) {
    console.log(error)
    return ''
  }
}
