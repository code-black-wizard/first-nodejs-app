module.exports = filters => {
  let arr = []
  filters.forEach(filter => {
    for (key in filter) {
      if (filter[key]) {
        arr.push({
          [key]: filter[key]
        })
      }
    }
  })
  if (arr.length) {
    return arr
  } else {
    arr.push({})
    return arr
  }
}
