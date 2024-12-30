const BASE_API_URL: string = 'http://localhost:8095/api/';
const VERSION_PREFIX: string = 'v1/';
const AUTH_PREFIX: string = 'auth/';


const getFullUrl = (path: string, prefix: string = ''): string =>
  BASE_API_URL + VERSION_PREFIX + prefix + path;

const getAuthUrl = (path: string): string => getFullUrl(path, AUTH_PREFIX);

export const apiConstants = {
  login: getAuthUrl('login'),
  userRegistration: getFullUrl('user/registration'),
}

