export const validateEmail = (email) => {
  const emailRegexPattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  return emailRegexPattern.test(email);
};

const MINIMUM_LENGTH = 6;

export const validatePassword = ((password_) => password_.length >= MINIMUM_LENGTH);

export const validateEmailAndPassword = (email, password) => validateEmail(email)
  && validatePassword(password);
