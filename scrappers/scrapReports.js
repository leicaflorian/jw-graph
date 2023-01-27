import axios from 'axios'
import { parse } from 'node-html-parser'
import fs from 'fs'
import path from 'path'

const urls = {
  '2022': 'https://www.jw.org/en/library/books/2022-Service-Year-Report-of-Jehovahs-Witnesses-Worldwide/2022-Country-and-Territory-Reports/',
  '2021': 'https://www.jw.org/en/library/books/2021-service-year-report/2021-country-territory/',
  '2020': 'https://www.jw.org/en/library/books/2020-service-year-report/2020-country-territory/',
  '2019': 'https://www.jw.org/en/library/books/2019-service-year-report/2019-country-territory/'
}

async function getReport (year) {
  const html = await axios.get(urls[year])
  const root = parse(html.data)
  const csv = []
  
  root.querySelectorAll('#section1 table tr').forEach((row, i, data) => {
    const csvRow = []
    
    row.querySelectorAll('td,th').forEach((col) => {
      const value = col.innerText.trim()
      
      if (i === data.length - 1) {
        return
      }
      
      if (i === 0) {
        csvRow.push(value.toLowerCase()
          .replace(year, '')
          .replace(+year - 1, '')
          .replace(/[.,%]/g, '')
          .trim()
          .replace(/ /g, '_')
        )
      } else {
        csvRow.push(value.replace(/,/g, ''))
      }
    })
    
    csv.push(csvRow.join(','))
  })
  
  fs.writeFileSync(path.join(path.resolve(), `content/report_${year}.csv`), csv.join('\n'))
}

Object.keys(urls).forEach((year) => {
  
  getReport(year).then()
})
