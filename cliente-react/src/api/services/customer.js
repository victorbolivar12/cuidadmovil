import Axios  from "axios";
import { PUBLIC_KEY } from "../../config";

const endpoints = {
    request: `${PUBLIC_KEY}/customer`,
};

export const getAllCustomers = async () => {
    try {
        const res = await Axios.get(endpoints.request);
        return { data: res?.data, statusCode: res.status };
    } catch (e) {
        return "Error al trear los clientes";
    }
};

export const createCustumer = async (paylod) => {
    try {
        const res = await Axios.post(endpoints.request, paylod);
        return { data: res?.data, statusCode: res.status };
    } catch (e) {
        return "Error al crear el cliente";
    }
};

export const getBalance = async (paylod) => {
    try {
        const res = await Axios.get(endpoints.request+"/"+paylod);
        return { data: res?.data, statusCode: res.status };
    } catch (e) {
        return "Error al crear el cliente";
    }
};
