import axios from "axios";
import { API_URL } from "../config";
import { getToken } from "../utils/auth";
import { logout } from "./authService";

const axiosInstance = axios.create({
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

const axiosCall = async (url, { query, ...requestOptions }) => {
  try {
    return await axiosInstance({
      method: requestOptions.method,
      url: encodeQueryParams(`${API_URL}${url}`, query),
      headers: requestOptions.headers,
      data: requestOptions.body,
    });
  } catch (error) {

    if (!['/sign-in', '/sign-up'].includes(window.location.pathname) && error?.response?.status === 401) {
      await logout();
    }

    if (error?.response) {
      console.error(error.response.data.error);
      return error?.response.data;
    } else if (error?.request) {
      console.error(error.request);
    } else {
      console.error(error?.message);
    }
  }
};

const encodeQueryParams = (url, query) => {
  const encodeURL = new URL(url);
  if (query) {
    Object.entries(query).forEach(([k, v]) => url.searchParams.append(k, v));
  }
  return encodeURL;
};

export const unAuthAxiosCall = async (url, requestOptions) => {
  return await axiosCall(url, {
    ...requestOptions,
    headers: {
      ...requestOptions.headers,
    },
  });
};

export const authAxiosCall = async (url, requestOptions) => {
  return await axiosCall(url, {
    ...requestOptions,
    headers: {
      ...requestOptions.headers,
      'x-access-token': `${getToken()}`,
    },
  });
};
