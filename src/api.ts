import axios from "axios";
import {Seminar} from "./@types/seminar/seminar.ts";

const API_URL = "http://localhost:3000";

//Получение семинаров из базы
export const fetchSeminar = async () => {
    const response = await axios.get<Seminar[]>(`${API_URL}/seminars`);
    return response.data;
};

//Удаление семинаров из базы
export const deleteSeminar = async (id: number): Promise<void> => {
    try {
        await axios.delete(`${API_URL}/${id}`);
    } catch (error) {
        console.error("Ошибка при удалении статьи:", error);
    }
};

//Обновление семинаров из базы
export const updateSeminar = async (seminar: Seminar) => {
    await axios.put(`${API_URL}/seminars/${seminar.id}`, seminar);
};