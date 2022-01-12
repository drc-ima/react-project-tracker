import { useState, useEffect } from 'react';
import toastr from 'toastr';
import api from '../api';
import { Link } from 'react-router-dom';
import $ from 'jquery';


export default function Projects() {
    const [projects, setProjects] = useState([]);
    const [clients, setClients] = useState([]);
    const [project, setProject] = useState({
        title: '',
        description: '',
        tracking_type: '',
        client_id: '',
    });

    useEffect(() => {
        // fetchClients();
        fetchProjects();
    }, []);

    const fetchClients = () => {
        api.clients().then(res => {
            // toastr.success("Loaded!");
            setClients(res.data);
        }).catch(({ response }) => {
            toastr.error("Something bad just happened");
        });
    };

    const fetchProjects = () => {
        toastr.info("Fetching...");
        api.projects().then(res => {
            toastr.success("Loaded!");
            setProjects(res.data);
            // console.log(res.data);
        }).catch(({ response }) => {
            toastr.error("Something bad just happened");
        });
    };

    const { title, description, tracking_type, client_id } = project;

    const inputChange = (e) => {
        const { name, value } = e.target;
        setProject((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    // const clientInputChange = (e) => {
    //     const { name, value } = e.target;
    //     setProject((prevState) => ({
    //         ...prevState,
    //         [name]: value
    //     }));

    //     fetchClients();
    // };

    const onSubmit = (event) => {
        event.preventDefault();
        $("#id_submit").html("Saving...");
        $("#id_submit").prop('disabled', true);

        api.addProject(project).then(res => {
            toastr.success("Project added successfully!");
            fetchProjects();
            $("#id_submit").html("Submit");
            $("#id_submit").prop('disabled', false);
            $("#id_close").click();
        }).catch(({ response }) => {
            toastr.error("Something bad occured!");
            $("#id_submit").html("Submit");
            $("#id_submit").prop('disabled', false);
        });
    };

    return (
        <>
            <section className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1>Projects</h1>
                        </div>
                        <div className="col-sm-6">
                            <div className="float-sm-right">
                                <button className="btn btn-primary" data-toggle="modal" data-target="#addProject">ADD
                                    PROJECT</button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="content">
                <div className="container-fluid">
                    <div className="card">
                        <div className="card-header">Projects</div>
                        <div className="card-body p-0">
                            <div className="table-responsive">
                                <table className="table-striped table projects">
                                    <thead>
                                        <tr>
                                            <th nowrap='true'>Title</th>
                                            <th nowrap='true'>Progress</th>
                                            {/* <th>Status</th> */}
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {projects.length > 0 ? (

                                            projects.map((project) => (
                                                <tr key={project.id} >
                                                    <td nowrap='true'>{project.title}</td>
                                                    <td className="project_progress">
                                                        <div className="progress progress-lg">
                                                            <div className="progress-bar bg-green" role="progressbar" aria-valuenow={project.completion_rate} aria-valuemin="0" aria-valuemax="100" style={{width: `${project.completion_rate}%`}}>
                                                            </div>
                                                        </div>
                                                        <small>
                                                            {project.completion_rate}% Complete
                                                        </small>
                                                    </td>
                                                    {/* <td nowrap='true'>{project.status_display}</td> */}
                                                    <td>
                                                        <Link to={`/projects/${project.id}`} className="btn btn-default border-0">
                                                            <i className="fa fa-angle-right"></i>
                                                        </Link>
                                                    </td>
                                                </tr>
                                            ))

                                        ) : (
                                            <tr>
                                                <td colSpan="3">Nothing to show here</td>
                                            </tr>
                                        )}

                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <div className="modal fade" id="addProject" data-backdrop="static" tabIndex="-1" role="dialog"
                aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog  modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="staticBackdropLabel">Add Project</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <form onSubmit={onSubmit}>
                            <div className="modal-body">

                                <div className="form-group">
                                    <label htmlFor="id_name">Title</label>
                                    <input type="text" value={title} onChange={inputChange} required name="title" placeholder="Enter title of project" id="id_name"
                                        className="form-control" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="id_contact">Description</label>
                                    <textarea name="description" value={description} rows="3" onChange={inputChange} cols="10" className="form-control" placeholder="Enter short description of the project." ></textarea>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="id_type">Type of Tracking</label>
                                    <select name="tracking_type" value={tracking_type} onChange={inputChange} required id="id_type" className="custom-select">
                                        <option value="">Select Type of Tracking</option>
                                        <option value="M">Milestones</option>
                                        <option value="F">Features</option>
                                        <option value="C">Checklist</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="id_client">Client</label>
                                    <select name="client_id" value={client_id} onChange={inputChange} onClick={fetchClients} required id="id_client" className="custom-select select2">
                                        <option value="">Select Client</option>
                                        {
                                            clients.map((client) => (
                                                <option key={client.id} value={client.id}>{client.name}</option>
                                            ))
                                        }
                                    </select>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" id="id_close" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button type="submit" id="id_submit" className="btn btn-primary">Submit</button>
                            </div>
                        </form>

                    </div>
                </div>
            </div>

        </>
    );
};