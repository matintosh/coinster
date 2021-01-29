import { authAxiosCall, unAuthAxiosCall } from "./axios";

export const getCurrenciesService = async () => {
  return authAxiosCall("/api/v1/currency", {
    method: "GET",
  });
};

export const newCurrency = async (
    name
  ) => {
    return authAxiosCall("/api/v1/currency", {
      method: "POST",
      body: JSON.stringify({
        name
      }),
    });
  };
  

  export const currencyUsageService = async () => {
    return unAuthAxiosCall("/api/v1/currency/usage", {
      method: "GET",
    });
  };
  