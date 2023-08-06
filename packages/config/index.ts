export const BASE_URI = `http://localhost:9000/api`

export const signupurl: string = `${BASE_URI}/auth/signup`;
export const loginurl: string = `${BASE_URI}/auth/login`;
export const meurl: string = `${BASE_URI}/auth/me`;
export const createproducturl: string = `${BASE_URI}/app/createproduct`;
export const getproductsurl: string = `${BASE_URI}/app/getproducts`;
export const getproducturl: string = `${BASE_URI}/app/getproduct/`;
export const buyproducturl: string = `${BASE_URI}/app/buyproduct`;
export const getsellerorderurl: string = `${BASE_URI}/app/seller/getorder`;
export const getbuyerorderurl: string = `${BASE_URI}/app/buyer/getorder`;
export const addtocarturl: string = `${BASE_URI}/app/addtocart`;
export const getcarturl: string = `${BASE_URI}/app/getcart`;
export const buyfromcartturl: string = `${BASE_URI}/app/buyfromcart`;
export const issellerurl: string = `${BASE_URI}/auth/isseller`;
export const updateproducturl: string = `${BASE_URI}/app/updateproduct`



export let TOKEN: string;
export let USERNAME: string;

export function loadSecrets() {
  const token = localStorage.getItem('TOKEN');
  const username = localStorage.getItem('USERNAME');
  if (!token || !username) {
    return null
  }

  TOKEN = token;
  USERNAME = username;

  console.log('Exposing Secrets:', TOKEN, USERNAME);
}