import { formatNumber } from 'chart.js/helpers'

export function useFormatters () {
  const i18n = useI18n()
  
  function formatNumber (value: number) {
    const locale = i18n.getLocaleCookie()
    
    return new Intl.NumberFormat(locale).format(value)
  }
  
  return { formatNumber }
}
