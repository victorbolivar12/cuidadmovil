import Axios  from "axios";
import { PUBLIC_KEY } from "../../config";

const endpoints = {
    request: `${PUBLIC_KEY}/transfer`,
    requestUser: `${PUBLIC_KEY}/transfer/user`,
    requestDriver: `${PUBLIC_KEY}/transfer/driver`,
};

export const getAllTransfer = async () => {
    try {
        const res = await Axios.get(endpoints.request);
        return { data: res?.data, statusCode: res.status };
    } catch (e) {
        return "Error al trear los trasnferencias";
    }
};

export const getAllTransferByidUser = async (paylod) => {
    try {
        const res = await Axios.get(endpoints.requestUser+"/"+paylod);
        return { data: res?.data, statusCode: res.status };
    } catch (e) {
        return "Error al trear los trasnferencias";
    }
};

export const getAllTransferByidDriver = async (paylod) => {
    try {
        const res = await Axios.get(endpoints.requestDriver+"/"+paylod);
        return { data: res?.data, statusCode: res.status };
    } catch (e) {
        return "Error al trear los trasnferencias";
    }
};

export const createTrasfer = async (paylod) => {
    try {
        const res = await Axios.post(endpoints.request, paylod);
        return { data: res?.data, statusCode: res.status };
    } catch (e) {
        return "Error al crear el traslado";
    }
};

export const UpdateTransfer = async (paylod, data) => {
    try {
        const res = await Axios.put(endpoints.request+"/"+paylod, data);
        return { data: res?.data, statusCode: res.status };
    } catch (e) {
        return "Error al actualzar traslado";
    }
};
