import { authAxiosCall } from "./axios";

export const getWalletsService = async () => {
  return authAxiosCall("/api/v1/wallet/list", {
    method: "GET",
  });
};
