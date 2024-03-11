import Axios  from "axios";
import { PUBLIC_KEY } from "../../config";

const endpoints = {
    request: `${PUBLIC_KEY}/bank`,
};

export const getAllBank = async () => {
    try {
        const res = await Axios.get(endpoints.request);
        return { data: res?.data, statusCode: res.status };
    } catch (e) {
        return "Error al trear los bancos";
    }
};

export const addBank = async (paylod) => {
    try {
        const res = await Axios.post(endpoints.request, paylod);
        return { data: res?.data, statusCode: res.status };
    } catch (e) {
        return "Error al trear los bancos";
    }
};