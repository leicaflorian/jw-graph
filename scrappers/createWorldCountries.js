import { readCsv } from './utils/readCsv.js'
import fs from 'fs'
import path from 'path'

import { alternativeNames } from './utils/alternativeNames.js'

/*
Based on the csv file, create a json merging the data from the csv file
and the alternative names
 */

const worldData = await readCsv('world_countries.csv')

const toSave = []

for (const country of worldData) {
  toSave.push({
    ...country,
    names: [country.country,
      ...(alternativeNames[country.country] || [])
    ]
  })
}

fs.writeFileSync(path.join(path.resolve(), 'content', 'world_countries.json'), JSON.stringify(toSave, null, 2))
