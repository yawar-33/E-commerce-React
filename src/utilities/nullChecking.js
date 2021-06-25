export default function isNull(value) {
  if (value === '' || value === undefined || value === null || value === 0) {
    return true
  } else {
    return false
  }
}
