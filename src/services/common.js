import { getFetch } from "./fetch";
import { restApiSettings } from "./api";

export const getLocalToken = () => {
  return localStorage.getItem("userInfo") != null
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null;
};

export const setLocalToken = (userInfo) => {
  return localStorage.setItem("userInfo", userInfo);
};

export const removeLocalToken = () => {
  localStorage.removeItem("userInfo");
  localStorage.removeItem("userId");
}

export const getUserId = () => {
  return localStorage.getItem("userId") != null
    ? JSON.parse(localStorage.getItem("userId"))
    : null;
}

export const setUserId = (userId) => {
  return localStorage.setItem("userId", userId);
};

export const getUrl = function (path, params = {}) {
  const url = new URL(`${restApiSettings.baseURL}${path}`);
  for (let [key, value] of Object.entries(params)) {
    if (value)
      url.searchParams.append(String(key), String(value));
  }
  return url.toString();
};

export const query = async function (path, options = {}, useToken = true) {
  if (!options.headers) {
    options.headers = {
      "Content-Type": "application/json",
      "Accept": "application/json"
    };
  }
  options.headers = options.headers || {};
  const userInfo = useToken ? getLocalToken() : null;
  const token = (userInfo && userInfo.token);
  if (token) {
    options.headers["Authorization"] = `Bearer ${token}`;
  }
  const url = getUrl(path, options.searchParams || {});

  // const fetch = await getFetch(options);
  const fetch = await getFetch();
  const response = await fetch(url);

  if (200 <= response.status && 300 > response.status) {
    if (options && (options.responseType === 'blob')) {
      return response;
    }
    return response.json();
  }
  try {
    const error = await response.json();
    return Promise.reject(new Error(error.message));
  } catch (error) {
    console.log("error-----", error)
    throw new Error(`HTTP status ${response.status} is not OK`);
  }

};

export const jsonQuery = async function (path, method, data, useToken = true) {
  return await query(
    path,
    {
      method,
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(data)
    },
    useToken
  );
};

export const generateParameters = (paramArray = []) => {
  if (paramArray.length > 0) return '';
  var res = '?';
  for (var i = 0; i < paramArray.length; i++) {
    var item = paramArray[i];
    res = res + `&${item.name}=${item.value}`
  }
  return res;
}

export const generatePagenationParameters = (params) => {
  var res = {};
  Object.keys(params).map(key => {
    const value = params[key];
    if (value) res[key] = value;
  });
  return res;
}
