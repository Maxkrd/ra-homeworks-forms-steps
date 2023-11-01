import './StepItem.css';

export const StepItem = (props) => {
    const { steps, onDeleteSteps } = props;

    const deleteSteps = () => {
        return onDeleteSteps(steps.id);
    };

    return (
        <tr className="stepitem" key={steps.id}>
        <td>{steps.date}</td>
        <td>{steps.result}</td>
        <td>
            <span onClick={deleteSteps}>x</span>
        </td>
    </tr>
    )
}
