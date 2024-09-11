import dayjs from "dayjs"

export function formatMonthDay(date, formatStr = "M月DD日") {
  return dayjs(date).format(formatStr)
}

export function getDiffDays(startDate, endDate) {
  return dayjs(endDate).diff(startDate, "day")
}

export function getweek(date) {
  return String(dayjs(date).day())
}








