export enum AuthErrors {
  MissingPasswordError = 'MissingPasswordError',
  AttemptTooSoonError = 'AttemptTooSoonError',
  TooManyAttemptsError = 'TooManyAttemptsError',
  NoSaltValueStoredError = 'NoSaltValueStoredError',
  IncorrectPasswordError = 'IncorrectPasswordError',
  IncorrectUsernameError = 'IncorrectUsernameError',
  MissingUsernameError = 'MissingUsernameError',
  UserExistsError = 'UserExistsError',
}
