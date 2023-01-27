export const useFormatNumber = () => (value: number) => {
  const i18n = useI18n()
  const locale = i18n.getLocaleCookie()
  
  console.log(locale)
  
  return new Intl.NumberFormat(locale).format(value)
}
