import Progress from "./ProgressBar";
import { useState, useEffect } from 'react';
import api from '../api';
import $ from 'jquery';
import toastr from 'toastr';
import Feature from './Feature';

const MilestoneFeature = ({ milestoneId }) => {
    const [feature, setFeature] = useState({
        description: '',
    });

    const [milestone, setMilestone] = useState({});

    const [features, setFeatures] = useState([]);
    const { description } = feature;

    // const {miles, features} = milestone;

    const inputChange = (e) => {
        const { name, value } = e.target;
        setFeature((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    useEffect(() => {
        fetchMilestone();
    }, [milestone]);

    const fetchMilestone = () => {
        // return activeMilestone;
        api.milestoneFeatures(milestoneId).then(res => {
            // console.log(res.data.features);
            setFeatures(res.data.features);
            setMilestone(res.data)

        })
    };

    const onSubmit = (event) => {
        event.preventDefault();
        $("#idSubmit").html("Saving...");
        $("#idSubmit").prop('disabled', true);

        api.addMilestoneFeature(milestoneId, feature).then(res => {
            toastr.success("Feature added successfully!");
            $("#idSubmit").html("Add");
            $("#idSubmit").prop('disabled', false);
            setFeature({ description: '' });
            fetchMilestone();

        }).catch(({ response }) => {
            toastr.error("Something bad occured!");
            $("#idSubmit").html("Submit");
            $("#idSubmit").prop('disabled', false);
        });
    };

    return (
        <div className="card">
            <div className="card-header font-weight-bold">Features</div>
            <div className="card-body p-0">
                <div className="list-group-flush">
                    {milestone && milestone.milestone && (
                        <div className="list-group-item font-weight-bold">
                            {milestone.milestone.description}
                            <Progress completion_rate={milestone.milestone.completion_rate} />
                        </div>
                    )}

                    <div className="list-group-item">
                        {
                            milestone && milestone.milestone && (
                                <form onSubmit={onSubmit} >
                                    <div className="d-flex justify-content-between align-items-center">
                                        <input className="form-control" value={description} onChange={inputChange} required placeholder={"Enter new feature for " + milestone.milestone.description} name="description" />
                                        <button id="idSubmit" type="submit" className="btn btn-white border-0 m-2">Add</button>
                                    </div>
                                </form>
                            )
                        }

                    </div>
                    {
                        features.length > 0 ? (
                            features.map((feature) => (
                                <Feature id={feature.id} key={feature.id} desc={feature.description} stat={feature.status} />
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
    );
};


export default MilestoneFeature;