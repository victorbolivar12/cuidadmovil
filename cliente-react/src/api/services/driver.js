import Axios  from "axios";
import { PUBLIC_KEY } from "../../config";

const endpoints = {
    request: `${PUBLIC_KEY}/driver`,
};

export const getAllDriver = async () => {
    try {
        const res = await Axios.get(endpoints.request);
        return { data: res?.data, statusCode: res.status };
    } catch (e) {
        return "Error al trear los choferes";
    }
};

export const addDriver = async (paylod) => {
    try {
        const res = await Axios.post(endpoints.request, paylod);
        return { data: res?.data, statusCode: res.status };
    } catch (e) {
        return "Error al crear los chofers";
    }
};