const BASE_URI = `http://localhost:9000/api`

export const signupurl: string = `${BASE_URI}/auth/signup`;
export const loginurl: string = `${BASE_URI}/auth/login`;
export const meurl: string = `${BASE_URI}/auth/me`;
export const createproducturl: string = `${BASE_URI}/app/createproduct`;
export const getproductsurl: string = `${BASE_URI}/app/getproducts`;
export const getproducturl: string = `${BASE_URI}/app/getproduct/`;


export let TOKEN: string;

export function loadSecrets() {
  const token = localStorage.getItem('TOKEN');
  if (!token) {
    return null
  }
  TOKEN = token;
}