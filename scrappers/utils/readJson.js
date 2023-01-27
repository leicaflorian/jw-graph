import fs from 'fs'
import path from 'path'
import { parse } from 'csv-parse'

export async function readJson (fileName) {
  const jsonContent = fs.readFileSync(path.join(path.resolve(), 'content', fileName), 'utf8')
  
  return JSON.parse(jsonContent)
}
