const BASE_API_URL: string = 'http://localhost:8095/api/';
const VERSION_PREFIX: string = 'v1/';
const AUTH_PREFIX: string = 'auth/';
const USER_PREFIX: string = 'users/';
const LEXEME_PREFIX:string = 'lexemes/'


const getFullUrl = (path: string, prefix: string = ''): string =>
  BASE_API_URL + VERSION_PREFIX + prefix + path;

const getAuthUrl = (path: string): string => getFullUrl(path, AUTH_PREFIX);

const getUserUrl = (path: string): string => getFullUrl(path, USER_PREFIX);

const getLexemeUrl = (path: string): string =>getFullUrl(path, LEXEME_PREFIX);

export const apiConstants = {
  login: getAuthUrl('login'),
  validation: getAuthUrl('validation'),
  logout: getAuthUrl('logout'),
  refresh: getAuthUrl('refresh'),

  userRegistration: getUserUrl('registration'),
  userMe: getUserUrl('me'),
  userResult: getUserUrl('lexeme-results'),

  lexeme: getFullUrl('lexemes'),
  lexemeFile: getLexemeUrl('files'),

}

