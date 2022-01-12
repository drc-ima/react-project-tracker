import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import toastr from 'toastr';
import api from '../api';
import { Link } from 'react-router-dom';
import $ from 'jquery';


export default function Client() {
    const { id } = useParams();
    const [client, setClient] = useState({
        name: '',
        kind: '',
        email: '',
        contact: ''
    });

    const [projects, setProjects] = useState([]);

    const fetchClient = () => {
        api.client(id).then(res => {
            setClient(res.data.client);
            setProjects(res.data.projects);
            console.log(res.data.projects);
        });
    };

    useEffect(() => {
        fetchClient();
    }, []);

    const { name, kind, email, contact } = client;

    const inputChange = (e) => {
        const { name, value } = e.target;
        setClient((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const onSubmit = (event) => {
        event.preventDefault();
        $("#id_submit").html("Saving...");
        $("#id_submit").prop('disabled', true);

        api.updateClient(id, client).then(res => {
            toastr.success("Client details updated!");
            $("#id_submit").html("Update");
            $("#id_submit").prop('disabled', false);
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
                            <h1>{name}</h1>
                        </div>
                        {/* <div className="col-sm-6">
                            <div className="float-sm-right">
                                <button className="btn btn-primary" data-toggle="modal" data-target="#addClient">ADD
                                    CLIENT</button>
                            </div>
                        </div> */}
                    </div>
                </div>
            </section>

            <section className="content">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-6 col-lg-6 col-sm-12">
                            <div className="card">
                                <div className="card-header">Client Details</div>
                                <div className="card-body">
                                    <form onSubmit={onSubmit}>
                                        <div className="form-group">
                                            <label htmlFor="id_type">Type of Client</label>
                                            <select name="type" name="kind" value={kind} onChange={inputChange} required id="id_type" className="custom-select">
                                                <option value="">Select Type of Client</option>
                                                <option value="Individual">Individual</option>
                                                <option value="Company">Company</option>
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="id_name">Name</label>
                                            <input name="name" value={name} onChange={inputChange} className="form-control" required />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="id_contact">Contact</label>
                                            <input type="text" required value={contact} onChange={inputChange} placeholder="Enter contact of client" name="contact"
                                                id="id_contact" className="form-control" />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="id_email">Email</label>
                                            <input type="email" value={email} onChange={inputChange} required placeholder="Enter email of client" name="email" id="id_email"
                                                className="form-control" />
                                        </div>

                                        <div className='form-group'>
                                            <button className='btn btn-primary' id="id_submit" type="submit" >Update</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-6 col-sm-12">
                            <div className="card">
                                <div className="card-header">
                                    <div className="d-flex justify-content-between align-items-center">
                                        Projects
                                        <Link to="/projects" className="btn btn-default border-0" title="Click to add a project">
                                            <i className="fa fa-plus"></i>
                                        </Link>
                                    </div>

                                </div>
                                <div className="card-body">
                                    <div className="list-group-flush">
                                        {
                                            projects.length > 0 ? (
                                                projects.map((project) => (
                                                    <Link to={`/projects/${project.id}`} className="list-group-item list-group-item-action">
                                                        <div className="d-flex w-100 justify-content-between">
                                                            <h5 className="mb-1">{project.title}</h5>
                                                            <small className="text-muted">{project.created_at}</small>
                                                        </div>
                                                        <p className="mb-1">{project.description}</p>
                                                        <small className="project_progress">
                                                            <div className="progress progress-sm">
                                                                <div className="progress-bar bg-green" role="progressbar" aria-valuenow={project.completion_rate} aria-valuemin="0" aria-valuemax="100" style={{ width: `${project.completion_rate}%` }} >
                                                                </div>
                                                            </div>
                                                            <small>
                                                                {project.completion_rate}% Complete
                                                            </small>
                                                        </small>
                                                    </Link>
                                                ))
                                                ) : (
                                                <div>Nothing to see here</div>
                                            )
                                        }

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}