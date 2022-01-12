import { useState, useEffect } from 'react';
import Progress from './ProgressBar';
import api from '../api';
import toastr from 'toastr';

const Milestone = ({ desc, id, isActive, onClick, comp_rate }) => {
    const [milestone, setMilestone] = useState({
        description: desc ? desc : '',
        completion_rate: comp_rate ? comp_rate : 0
    })

    const {description, completion_rate} = milestone;

    // useEffect(() => {
        
    //     // fetchMilestone();
    //     // setMilestone({completion_rate: comp_rate})
    // }, [milestone.completion_rate]);

    const inputChange = (desc, id) => {
        setMilestone({
            description: desc,
        });

        let cmilestone = {
            description: desc
        };

        api.updateMilestone(id, cmilestone).then(res => {
            setMilestone(res.data);
        }).catch(({response}) => {
            toastr.error("Something bad occured!");
        });
    };

    return (
        <div className={"list-group-item " + (isActive ? "active" : "")} onClick={onClick} >
            <input  onChange={(e) => { inputChange(e.target.value, id) }} className="form-control border-0 bg-transparent" name="description" value={description} />
            <Progress completion_rate={comp_rate} />
        </div>
    );

};

export default Milestone;