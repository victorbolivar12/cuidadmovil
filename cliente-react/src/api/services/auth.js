import Axios  from "axios";
import { PUBLIC_KEY } from "../../config";

const endpoints = {
    signIn: `${PUBLIC_KEY}/auth`,
    signUp: `${PUBLIC_KEY}/users`,
    client: `${PUBLIC_KEY}/users/costumer`,
    driver: `${PUBLIC_KEY}/users/driver`,
};

export const signIn = async (payload) => {
    try {
        const res = await Axios.post(endpoints.signIn, payload);
        return { data: res?.data, statusCode: res.status };
    } catch (e) {
        return "Error al iniciar sesion";
    }
};

export const signUp = async (payload) => {
    try {
        const res = await Axios.post(endpoints.signUp, payload);
        return { data: res?.data, statusCode: res.status };
    } catch (e) {
        return "Error al crear sesion";
    }
};

export const getAllUsers = async () => {
    try {
        const res = await Axios.get(endpoints.signUp);
        return { data: res?.data, statusCode: res.status };
    } catch (e) {
        return "Error al traer los usuarios";
    }
}

export const getIdClientbyIduser = async (payload) => {
    try {
        const res = await Axios.get(endpoints.client+'/'+payload);
        return { data: res?.data, statusCode: res.status };
    } catch (e) {
        return "Error al traer los usuarios";
    }
}

export const getIdDrivertbyIduser = async (payload) => {
    try {
        const res = await Axios.get(endpoints.driver+'/'+payload);
        return { data: res?.data, statusCode: res.status };
    } catch (e) {
        return "Error al traer los usuarios";
    }
}