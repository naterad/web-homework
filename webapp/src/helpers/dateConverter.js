export function timeConverter (timestamp) {
  let a = new Date(parseInt(timestamp) * 1000)
  let year = a.getFullYear() - 2000
  let month = a.getMonth() + 1
  let date = a.getDate()
  let hour = a.getHours()
  let min = a.getMinutes()
  if (min < 10) {
    min = '0' + min
  }
  var m = 'pm'
  if (hour < 12) {
    m = 'am'
  }
  if (hour >= 13) {
    hour -= 12
  } else if (hour === 0) {
    hour = 12
  }
  return month + '/' + date + '/' + year + ' ' + hour + ':' + min + ' ' + m
}

export function timeConverterMonth (timestamp) {
  let a = new Date(parseInt(timestamp) * 1000)
  let year = a.getFullYear() - 2000
  let month = a.getMonth() + 1
  return month + '/' + year
}
