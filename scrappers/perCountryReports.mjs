import fs from 'fs'
import path from 'path'
import { readCsv } from './utils/readCsv.js'
import { readJson } from './utils/readJson.js'
import kebabCase from 'lodash.kebabcase'

const files = fs.readdirSync(path.join(path.resolve(), 'content'))
const reportFiles = files.filter(file => file.startsWith('report')).sort((a, b) => a < b ? 1 : -1)
const worldCountries = await readJson('world_countries.json')
const finalData = {}

/*
  * 1. Read all the reports
  * 2. For each report, read the csv file
  * 3. For each row in the csv file, add the data to the finalData object
  * 4. Write each element of the finalData object to a separate json file
 */

for await (const file of reportFiles) {
  // da fare per ogni file
  const year = file.match(/([0-9])\w+/)[0]
  const fileContent = await readCsv(file)
  
  for (const record of fileContent) {
    let name = record.country_or_territory.replace('&amp;', '&')
    // name = kebabCase(name)
    
    let countryName = worldCountries.find(country => country.names.includes(name))?.country ?? name
    
    countryName = kebabCase(countryName)
    
    if (!finalData[countryName]) {
      finalData[countryName] = {}
    }
    
    finalData[countryName][year] = record
  }
}

// remove dir with all the content
fs.rmdirSync(path.join(path.resolve(), 'content', 'perCountryReports'), { recursive: true })

for (const country in finalData) {
  const folderPath = path.join(path.resolve(), 'content', 'perCountryReports')
  
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath)
  }
  // console.log(country)
  fs.writeFileSync(path.join(folderPath, `${country}.json`), JSON.stringify(finalData[country]))
}
