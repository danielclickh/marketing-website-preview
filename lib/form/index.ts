export function validateEmail(email = '') {
  if (email.length === 0) {
    return false
  }
  const emailRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
  return email.match(emailRegex)
}
