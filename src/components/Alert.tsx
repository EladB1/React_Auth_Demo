const Alert = (props: any) => {
    const type = props.alertType;
    let coloring = type === 'Error' ? 'danger' : 'success';
    let color = type === 'Error' ? '#cd7967' : '#ccffcc';

    return (
        <div className="alert-box position-relative end-0" style={{ marginBottom: '0.5em' }}>
            <div className="toast fade show">
                <div className={`toast-header text-white bg-${coloring}`}>
                    <strong className="me-auto">{type}</strong>
                </div>
                <div className="toast-body fs-5" style={{ backgroundColor: color }}>
                    {props.details}
                </div>
            </div>
        </div>
    )
};

export default Alert;