
const Progress = ({ completion_rate }) => {

    return (
        <div className="project_progress">
            <div className="progress progress">
                <div className="progress-bar bg-green" role="progressbar" aria-valuenow={completion_rate} aria-valuemin="0" aria-valuemax="100" style={{ width: `${completion_rate}%` }} >
                </div>
            </div>
            <small>
                {completion_rate}% Complete
            </small>
        </div>
    );
};

export default Progress;