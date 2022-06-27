const VALID_EMAIL_PATTERN = /^[-!#$%&'*+/\d=?A-Z^_a-z{|}~](\.?[-!#$%&'*+/\d=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z\d])*\.[a-zA-Z](-?[a-zA-Z\d])+$/;

export function isEmail(email: string | undefined): email is string {
  if (!email) return false;
  if (email.length > 254) return false;

  const isValid = VALID_EMAIL_PATTERN.test(email);
  if (!isValid) return false;

  // More checking of things regex can't handle
  const parts = email.split('@');
  if (parts[0].length > 64) return false;

  const domainParts = parts[1].split('.');
  return !domainParts.some(function (part) {
    return part.length > 63;
  });
}
