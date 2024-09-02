export function formatDate(date, dateFormat, fromNow) {
  if (fromNow) {
    return useNuxtApp().$dateFns?.formatDistanceToNowStrict(new Date(date))
  }
  return useNuxtApp().$dateFns?.format(new Date(date), dateFormat || "d MMM y")
}
