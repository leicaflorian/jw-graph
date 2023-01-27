import fs from 'fs'
import path from 'path'
import { parse } from 'csv-parse'

export async function readCsv (fileName) {
  const firstReport = fs.readFileSync(path.join(path.resolve(), 'content', fileName), 'utf8')
  const records = parse(firstReport, {
    columns: true,
    skip_empty_lines: true
  })
  
  return new Promise(async (resolve) => {
    const toReturn = []
    
    for await (const record of records) {
      toReturn.push(record)
    }
    
    resolve(toReturn)
  })
}
