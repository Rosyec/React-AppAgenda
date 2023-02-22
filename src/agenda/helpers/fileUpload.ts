import axios, { AxiosInstance } from "axios";
import { Cloudinary } from "./interfaces/cloudinary";

const URL_BASE: string = 'https://api.cloudinary.com/v1_1/dcfolmw4n';

const Axios: AxiosInstance = axios.create({ baseURL: URL_BASE });

export const fileUpload = async (files: FileList) => {
    if (!files) throw new Error('No hay imagenes a subir');
    const formData: FormData = new FormData();
    formData.append('upload_preset', 'react-agenda');
    try {
        const multipleResponse = await axios.all(Array.from(files).map((item) => {
            formData.append('file', item);
            return Axios.post('/upload', formData, { headers: { 'Content-Type': 'multipart/form-data' } })
        }));
        const result: Cloudinary[] = await multipleResponse.map((item) => item.data);
        return result.map((item) => item.secure_url);
    } catch (error: any) {
        throw new Error(error);
    }


}