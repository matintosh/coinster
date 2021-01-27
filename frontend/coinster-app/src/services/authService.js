import { unAuthAxiosCall } from "./axios";
import { deleteCurrentUser, deleteToken } from "../utils/auth";

export const signUpService = async (first_name, last_name, email, password) => {
    return unAuthAxiosCall("/api/v1/user/sign-up", {
        method: "POST",
        body: JSON.stringify({
            first_name, last_name, email, password
        })
    })
};

export const signInService = async (email, password) => {
    return unAuthAxiosCall("/api/v1/user/sign-in", {
        method: "POST",
        body: JSON.stringify({
            email, password
        })
    })
};

export const logout = () => {
    deleteToken();
    deleteCurrentUser();
    if (window.location.pathname !== '/sign-up') {
        window.location = '/sign-up';
    }
}
