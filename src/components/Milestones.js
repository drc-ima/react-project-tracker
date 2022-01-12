import { useState, useEffect } from 'react';
import api from '../api';
import Milestone from './Milestone';
import toastr from 'toastr';
import $ from 'jquery';
import Progress from './ProgressBar';
import MilestoneFeature from './MilestoneFeatures';

const Milestones = ({ projectId }) => {
    // const [selectedMilestone, setSelectedMilestone] = useState({
    //     milestone: [],
    //     index: ''
    // });
    const [milestone, setMilestone] = useState({
        description: '',
    });

    const { description } = milestone;

    const [milestones, setMilestones] = useState([]);

    const [activeMilestone, setActiveMilestone] = useState({
        id: '',
        milestone: {}
    });

    const selectedMilestone = (milestone, id) => {
        setActiveMilestone({
            milestone: milestone,
            id: id
        })
    };

    useEffect(() => {
        fetchMilestones();
        // selectedMilestone();
    }, [milestones, activeMilestone]);

    const fetchMilestones = () => {
        api.milestones(projectId).then(res => {
            // toastr.success("Loaded!");
            setMilestones(res.data);
            // console.log(res.data);
        }).catch(({ response }) => {
            toastr.error("Something bad just happened");
        });
    };

    const inputChange = (e) => {
        const { name, value } = e.target;
        setMilestone((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const onSubmit = (event) => {
        event.preventDefault();
        $("#id_submit").html("Saving...");
        $("#id_submit").prop('disabled', true);

        api.addMilestone(projectId, milestone).then(res => {
            toastr.success("Milestone added successfully!");
            $("#id_submit").html("Add");
            $("#id_submit").prop('disabled', false);
            setMilestone({ description: '' });
            fetchMilestones();
        }).catch(({ response }) => {
            toastr.error("Something bad occured!");
            $("#id_submit").html("Submit");
            $("#id_submit").prop('disabled', false);
        });
    };
    return (
        <div className="row">
            <div className="col-md-6 col-lg-6 col-sm-12">
                <div className="card">
                    <div className="card-header font-weight-bold">Milestones</div>
                    <div className="card-body p-0">
                        <div className="list-group-flush">
                            <div className="list-group-item">
                                <form onSubmit={onSubmit}>
                                    <div className="d-flex justify-content-between align-items-center">
                                        <input className="form-control" autoComplete='off' value={description} onChange={inputChange} required placeholder="Enter new milestone" name="description" />
                                        <button id="id_submit" type="submit" className="btn btn-white border-0 m-2">Add</button>
                                    </div>
                                </form>
                            </div>
                            {
                                milestones.length > 0 ? (
                                    milestones.map((milestone) => ( 
                                        <Milestone comp_rate={milestone.completion_rate} desc={milestone.description} id={milestone.id} isActive={activeMilestone && activeMilestone.id === milestone.id ? "active" : ""}  onClick={() => selectedMilestone(milestone, milestone.id)} key={milestone.id} />   
                                    ))
                                ) : (
                                    <div className="list-group-item">
                                        Nothing to show here
                                    </div>
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-md-6 col-lg-6 col-sm-12">
                {
                    activeMilestone && activeMilestone.id ? (
                        <MilestoneFeature milestoneId={activeMilestone.milestone.id} />
                    ) : (
                        <p className="card card-body">Select a milestone to view features</p>
                    )
                }
            </div>
        </div>
    );
};

export default Milestones;