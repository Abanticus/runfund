const currencyFormatter = new Intl.NumberFormat("en-GB", {
  style: "currency",
  currency: "GBP",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
})

const dateFormatter = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "short",
  year: "numeric",
})

export const formatCurrency = (value: number) => currencyFormatter.format(value)

export const formatMiles = (value: number) => {
  const minimumFractionDigits = Number.isInteger(value) ? 0 : 1

  return `${new Intl.NumberFormat("en-GB", {
    minimumFractionDigits,
    maximumFractionDigits: 2,
  }).format(value)} mi`
}

export const formatDateValue = (value: Date) => dateFormatter.format(value)

export const parseDateInputValue = (value: string) => {
  const [year, month, day] = value.split("-").map(Number)

  return new Date(year, month - 1, day)
}

export const formatRunDate = (value: string) => {
  return dateFormatter.format(parseDateInputValue(value))
}

export const toDateInputValue = (value: Date) => {
  const year = value.getFullYear()
  const month = `${value.getMonth() + 1}`.padStart(2, "0")
  const day = `${value.getDate()}`.padStart(2, "0")

  return `${year}-${month}-${day}`
}

export const getTodayDateInputValue = () => toDateInputValue(new Date())
