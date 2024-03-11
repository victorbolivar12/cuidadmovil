import Axios  from "axios";
import { PUBLIC_KEY } from "../../config";

const endpoints = {
    request: `${PUBLIC_KEY}/vehicle`,
};

export const getAllVehicle= async () => {
    try {
        const res = await Axios.get(endpoints.request);
        return { data: res?.data, statusCode: res.status };
    } catch (e) {
        return "Error al trear los vehiculos";
    }
};

export const createVehicle = async (paylod) => {
    try {
        const res = await Axios.post(endpoints.request, paylod);
        return { data: res?.data, statusCode: res.status };
    } catch (e) {
        return "Error al crear el vehicle";
    }
};