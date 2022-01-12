import { useState, useEffect } from 'react';
import api from '../api';
import toastr from 'toastr';
import $ from 'jquery';
import Item from './Item';

const Checklist = ({ projectId }) => {
    const [checklist, setChecklist] = useState({
        description: '',
    });

    const [checklists, setChecklists] = useState([]);

    const { description } = checklist;

    useEffect(() => {
        fetchChecklists();
    }, [checklists]);

    const fetchChecklists = () => {
        api.checklists(projectId).then(res => {
            // toastr.success("Loaded!");
            setChecklists(res.data);
            // console.log(res.data);
        }).catch(({ response }) => {
            toastr.error("Something bad just happened");
        });
    };

    const inputChange = (e) => {
        const { name, value } = e.target;
        setChecklist((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const onSubmit = (event) => {
        event.preventDefault();
        $("#id_submit").html("Saving...");
        $("#id_submit").prop('disabled', true);

        api.addChecklist(projectId, checklist).then(res => {
            toastr.success("Item added successfully!");
            $("#id_submit").html("Add");
            $("#id_submit").prop('disabled', false);
            setChecklist({description: ''});
            fetchChecklists();
        }).catch(({ response }) => {
            toastr.error("Something bad occured!");
            $("#id_submit").html("Submit");
            $("#id_submit").prop('disabled', false);
        });
    };

    return (
        <>
            <form onSubmit={onSubmit}>
                <div className="d-flex justify-content-between align-items-center">
                    <input className="form-control" value={description} onChange={inputChange} required placeholder="Enter new checklist item" name="description" />
                    <button id="id_submit" type="submit" className="btn btn-white border-0 m-2">Add</button>
                </div>
            </form>
            <hr />
            <span className="text-success font-weight-bold">Completed</span> <span className="text-danger font-weight-bold">Canceled</span>
            <div className="list-group-flush">
                {
                    checklists.length > 0 ? (
                        checklists.map((item) => (
                            <Item key={item.id} id={item.id} desc={item.description} stat={item.status} />
                        ))

                    ) : (
                        <div className="list-group-item">
                            No checklist items added
                        </div>
                    )
                }

            </div>
        </>
    );
};

export default Checklist;