export enum ApiErrorString {
  NotRegistered = 'notRegistered',
  BadRequest = 'badRequest',
  NotValid = 'notValid',
  NoWordInDictionary = 'noWordInDictionary',
  OldState = 'oldState',
}

export type ApiError = {
  message: ApiErrorString
}
