import { authAxiosCall } from "./axios";

export const getWalletsService = async () => {
  return authAxiosCall("/api/v1/wallet/list", {
    method: "GET",
  });
};

export const newWalletService = async (currency_id, balance) => {
  return authAxiosCall("/api/v1/wallet/create", {
    method: "POST",
    body: JSON.stringify({
      currency_id,
      balance,
    }),
  });
};

export const deleteWalletService = async (wallet_id) => {
  return authAxiosCall("/api/v1/wallet", {
    method: "DELETE",
    body: JSON.stringify({
      wallet_id,
    }),
  });
};
