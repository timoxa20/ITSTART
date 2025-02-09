import './App.css'
import {ChangeEvent, useEffect, useState} from "react";
import {deleteSeminar, fetchSeminar, updateSeminar} from "./api.ts";
import {Seminar} from "./@types/seminar/seminar.ts";

function App() {

    const [seminar, setSeminar] = useState<Seminar[]>([])
    //Состояние модального окна (первоначальное)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedSeminar, setSelectedSeminar] = useState<Seminar | null>(null);

    //Первичная отрисовка семинаров через хук
    useEffect(() => {
        fetchSeminar().then(setSeminar);
    }, []);
//Удаление по айдишнику определенного семинра
    const handleDelete = async (id: number) => {
        await deleteSeminar(id);
        setSeminar(prev => prev.filter(seminar => seminar.id !== id)); // Обновляем UI
    };
// Открытие модального окна
    const handleEditClick = (seminar: Seminar) => {
        setSelectedSeminar(seminar);
        setIsModalOpen(true);
    };

    // Закрытие модального окна
    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedSeminar(null);
    };

    // Сохранение изменений
    const handleSave = async () => {
        if (selectedSeminar) {
            await updateSeminar(selectedSeminar);
            setSeminar(prev => prev.map(s => (s.id === selectedSeminar.id ? selectedSeminar : s)));
            handleCloseModal();
        }
    };

    return (
        <>
            <h1>Seminars</h1>
            <ul>
                {seminar.map((seminars) => (
                    <li className="app" key={seminars.id}>
                        <div>
                            <img className="img" src={seminars.photo} alt={seminars.title}/>
                            <div>{seminars.title}</div>
                            <div>{seminars.description}</div>
                            <div>{seminars.date}</div>
                            <div>{seminars.time}</div>
                        </div>
                        <div className="blockButton">
                            <button onClick={() => handleDelete(seminars.id)}>Удалить</button>
                            <button onClick={() => handleEditClick(seminars)}>Редактировать</button>
                        </div>
                    </li>
                ))}
            </ul>
            {/* Модальное окно откроеться если все условия true */}
            {isModalOpen && selectedSeminar && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>Редактировать семинар</h2>
                        <input
                            type="text"
                            value={selectedSeminar.title}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setSelectedSeminar(prev => prev ? {
                                ...prev,
                                title: e.target.value
                            } : null)}
                        />
                        <input
                            type="text"
                            value={selectedSeminar.description}
                            onChange={(e) => setSelectedSeminar(prev => prev ? {
                                ...prev,
                                description: e.target.value
                            } : null)}
                        />
                        <button onClick={handleSave}>Сохранить</button>
                        <button onClick={handleCloseModal}>Закрыть</button>
                    </div>
                </div>
            )}
        </>
    )
}

export default App
