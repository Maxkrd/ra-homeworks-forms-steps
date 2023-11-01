import './StepsList.css';
import { StepItem } from '../StepItem';


export const StepsList = (props) => {
    const { stepsList, onDeleteSteps } = props;

    const sortedStepsList = [...stepsList].sort((a, b) => {
        const dateA = new Date(a.date.split('.').reverse().join('.'));
        const dateB = new Date(b.date.split('.').reverse().join('.'));
        return dateB - dateA;
    });

    return (
        <>
        <table className="stepslist">
            <thead>
            <tr>
                <th className="stepslist-th">Дата (ДД.ММ.ГГ.)</th>
                <th className="stepslist-th">Пройдено км</th>
                <th className="stepslist-th">Действия</th>
            </tr>
            </thead>
            <tbody>
                {sortedStepsList.map((steps) => (
                        <StepItem
                        key={steps.id}
                        steps={steps}
                        onDeleteSteps={onDeleteSteps}
                        />
                ))}
            </tbody>
        </table>
        </>
    );
}
