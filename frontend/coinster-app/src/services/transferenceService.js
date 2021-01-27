import { authAxiosCall } from "./axios";

export const newTransferenceService = async (
  wallet_from,
  wallet_to,
  amount,
  currency_id
) => {
  return authAxiosCall("/api/v1/transference/create", {
    method: "POST",
    body: JSON.stringify({
      wallet_from,
      wallet_to,
      amount,
      currency_id,
    }),
  });
};



export const getTransferencesService = async ( ) => {
    return authAxiosCall("/api/v1/transference/me", {
      method: "GET",
    });
  };
  