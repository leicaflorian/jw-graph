const columns = []

document.querySelectorAll('#section1 table thead tr th').forEach((col) => {
  columns.push(col.innerText)
})

const rows = []

document.querySelectorAll('#section1 table tbody tr').forEach((row) => {
  const toReturn = {}
  
  row.querySelectorAll('td').forEach((col, i) => {
    toReturn[columns[i]] = col.innerText
    
  })
  
  rows.push(toReturn)
})

JSON.stringify(rows)
