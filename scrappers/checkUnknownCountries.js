import fs from 'fs'
import path from 'path'
import { readCsv } from './utils/readCsv.js'
import { readJson } from './utils/readJson.js'

const worldCountries = await readJson('world_countries.json')
const files = fs.readdirSync(path.join(path.resolve(), 'content'))
const reportFiles = files.filter(file => file.startsWith('report')).sort((a, b) => a < b ? 1 : -1)
const reportData = await readCsv(reportFiles[0])

console.log('Unknown countries:')

for (const country of reportData) {
  const worldCountry = worldCountries.find(worldCountry => worldCountry.names.includes(country.country_or_territory.replace('&amp;', '&')))
  
  if (!worldCountry) {
    console.log(country.country_or_territory)
    // data[worldCountry.alpha_3_code] = country
  }
}


