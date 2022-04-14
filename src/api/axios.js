import axios from "axios";
import router from "../router";

const url = process.env.VUE_APP_API;
const path = process.env.VUE_APP_PATH;

/**
 * @description 登入帳號
 * @param {object} user 
 * ```js
 *user: {
    username: "",
    password: "",
  },
 * ```
 * @returns true 為成功
 */
export async function login(user) {
  try {
    // 取出 token 跟 expired
    const { data } = await axios.post(`${url}/admin/signin`, user);
    // 設定 cookie
    document.cookie = `hexToken=${data.token}; expires=${new Date(data.expired)};`;
    return true;
  } catch (err) {
    return false;
  }
}

// 確認用戶是否仍然持續登入
export async function checkAdmin() {
  // 取出 Token
  const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, "$1");
  // 設定 axios 在 headers 中夾帶 token
  axios.defaults.headers.common["Authorization"] = token;
  try {
    await axios.post(`${url}/api/user/check`);
    router.push("/admin");
  } catch (err) {
    router.push("/Login");
  }
}

// 取得產品列表
export async function getProducts(page) {
  try {
    const { data } = await axios.get(`${url}/api/${path}/admin/products?page=${page}`);
    return data;
  } catch (err) {
    router.push("/Login");
  }
}

// 上傳單一產品
export async function addProduct(product) {
  try {
    await axios.post(`${url}/api/${path}/admin/product`, product);
  } catch (err) {
    return;
  }
}

// 修改單一產品
export async function updateProduct(product) {
  try {
    await axios.put(`${url}/api/${path}/admin/product/${product.data.id}`, product);
  } catch (err) {
    return;
  }
}

// 刪除單一產品
export async function deleteProduct(id) {
  try {
    await axios.delete(`${url}/api/${path}/admin/product/${id}`);
  } catch (err) {
    return;
  }
}
