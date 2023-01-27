import fs from 'fs'
import path from 'path'
import { readCsv } from './utils/readCsv.js'
import kebabCase from 'lodash.kebabcase'

const files = fs.readdirSync(path.join(path.resolve(), 'content'))
const reportFiles = files.filter(file => file.startsWith('report')).sort((a, b) => a < b ? 1 : -1)
const finalData = {}

for await (const file of reportFiles) {
  // da fare per ogni file
  const year = file.match(/([0-9])\w+/)[0]
  const fileContent = await readCsv(file)
  
  // TODO:: caricare anche i dati world e usare come name il nome ufficiale del paese,
  // indipendentemente dal nome usato nel report
  
  for (const record of fileContent) {
    let name = record.country_or_territory.replace('&amp;', '&')
    
    name = kebabCase(name)
    
    if (!finalData[name]) {
      finalData[name] = {}
    }
    
    finalData[name][year] = record
  }
}

for (const country in finalData) {
  const folderPath = path.join(path.resolve(), 'content', 'perCountryReports')
  
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath)
  }
  // console.log(country)
  fs.writeFileSync(path.join(folderPath, `${country}.json`), JSON.stringify(finalData[country]))
}
