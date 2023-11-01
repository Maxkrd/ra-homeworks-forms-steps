import { useState } from 'react';
import { nanoid } from 'nanoid';
import './StepsForm.css';
import { StepsList } from '../StepsList';


export const StepsForm = () => {
    const [stepsList, setStepsList] = useState([]);
    const [form, setForm] = useState({
        id: '',
        result: '',
        date: '',
    });
    const [selectedSteps] = useState(null);
    const [error, setError] = useState('');

    const onDeleteSteps = (id) => {
        setStepsList((prevStepsList) => prevStepsList.filter((steps) => steps.id !== id));
    }

    const onSubmit = (e) => {
        e.preventDefault();
        const { date, result, id } = form;
        const dateRegex = /^\d{2}\.\d{2}\.\d{4}$/;
        const resultRegex = /^\d+(\.\d{1})?$/;

        if (date && result && dateRegex.test(date) && resultRegex.test(result)) {
                setStepsList((prevStepsList) => {
                const updatedStepsList = [...prevStepsList];
                updateDistance(updatedStepsList, date, result, id);
                return updatedStepsList;
                });
    
            setForm({
                id: '',
                result: '',
                date: '',
            });
            setError('');
        } else {
            setError('Неправильный формат вводимых данных');
        }
    }

    const onFieldChange = (e) => {
        setForm((prevForm) => ({ ...prevForm, [e.target.name]: e.target.value }));
        setError('');
    };

    const updateDistance = (data, date, distance, id) => {
        if (selectedSteps) {
            const changingEntryIndex = data.findIndex((entry) => entry.id === id);

            if (changingEntryIndex !== -1) {
                const updatedEntry = { ...selectedSteps, date, result: distance };
                data.splice(changingEntryIndex, 1, updatedEntry);
            }
        } else {
            const existingEntryIndex = data.findIndex((entry) => entry.date === date);

            if (existingEntryIndex !== -1) {
                const existingEntry = data[existingEntryIndex];
                const updatedDistance = parseFloat(existingEntry.result) + parseFloat(distance);
                const updatedEntry = { ...existingEntry, result: updatedDistance.toFixed(1) };
                data.splice(existingEntryIndex, 1, updatedEntry);
            } else {
                const newEntry = { date, result: distance, id: nanoid() };
                data.push(newEntry);
            }
        }
    };


    return (
        <>
            <form className="stepsform" onSubmit={onSubmit}>
                <section className="stepsform-section">
                    <label htmlFor="date">Дата (ДД.ММ.ГГГГ)</label>
                    <input
                        id="date"
                        name="date"
                        className="stepsform-input"
                        onChange={onFieldChange}
                        value={form.date}
                    />
                </section>
                <section className="stepsform-section">
                    <label htmlFor="result">Пройдено км</label>
                    <input
                        id="result"
                        name="result"
                        className="stepsform-input"
                        onChange={onFieldChange}
                        value={form.result}
                    />
                </section>
                <button className="stepsform-button">ОК</button>
            </form>
            {error && <p className="error">{error}</p>}
            <StepsList 
                stepsList={stepsList} 
                onDeleteSteps={onDeleteSteps}
            />
        </>
    )
}
