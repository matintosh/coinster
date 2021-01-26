import { unAuthAxiosCall } from "./axios";
import { deleteCurrentUser, deleteToken } from "../utils/auth";

export const signUpService = async (firstName, lastName, email, password) => {
    return unAuthAxiosCall("/api/v1/user/sign-up", {
        method: "POST",
        body: JSON.stringify({
            name: "Mati",
            email: "matias@mati.com",
            password: "123456789"
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
