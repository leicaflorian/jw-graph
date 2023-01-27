export const useFormatNumber = () => (value: number) => {
  const i18n = useI18n()
  const locale = i18n.getLocaleCookie()
  
  return new Intl.NumberFormat(locale).format(value)
}
