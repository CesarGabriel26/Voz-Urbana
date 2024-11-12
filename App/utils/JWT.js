import { jwtDecode } from "jwt-decode";

export default function decodeUserToken(token) {
    if (!token) {
        throw new Error("Token nulo.");
    }

    let decoded = jwtDecode(token);

    if (!decoded) {
        throw new Error("Token inválido");
    }

    return decoded;
}