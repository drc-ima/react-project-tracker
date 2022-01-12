import {Link} from 'react-router-dom';
import { useState, useEffect } from 'react';
import api from '../api';
import toastr from 'toastr';
import $ from 'jquery';

export default function Clients() {
    const [clients, setClients] = useState([]);
    const [client, setClient] = useState({
        name: '',
        kind: '',
        contact: '',
        email: ''
    });

    const { name, kind, contact, email} = client;

    useEffect(() => {
        fetchClients();
    }, []);

    const fetchClients = () => {
        api.clients().then(res => {
            toastr.success("Loaded!");
            setClients(res.data);
        }).catch(({response}) => {
            toastr.error("Something bad just happened");
        });
    };

    const onSubmit = (event) => {
        event.preventDefault();
        $("#id_submit").html("Saving...");
        $("#id_submit").prop('disabled', true);
        // console.log($("#id_close"));
        
        api.addClient(client).then(res => {
            toastr.success("Client added successfully!");
            $("#id_submit").html("Submit");
            $("#id_submit").prop('disabled', false);
            fetchClients();
            // $("#addClient").modal('hide');
            $("#id_close").click();
        }).catch(({response}) => {
            toastr.error("Something bad occured!");
            $("#id_submit").html("Submit");
            $("#id_submit").prop('disabled', false);
        });
    };

    const inputChange = (e) => {
        const {name, value} = e.target;
        setClient((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    return (
    <>
        <section className="content-header">
            <div className="container-fluid">
                <div className="row mb-2">
                    <div className="col-sm-6">
                        <h1>Clients</h1>
                    </div>
                    <div className="col-sm-6">
                        <div className="float-sm-right">
                            <button className="btn btn-primary" data-toggle="modal" data-target="#addClient">ADD
                                CLIENT</button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section className="content">
            <div className="container-fluid">
                <div className="card">
                    <div className="card-header">Clients</div>
                    <div className="card-body p-0">
                        <div className="table-responsive">
                            <table className="table-striped table projects">
                                <thead>
                                    <tr>
                                        <th nowrap='true'>Name</th>
                                        <th>Type</th>
                                        <th>Contact</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {clients.length > 0 ? (
                                        
                                        clients.map((client) => (
                                            <tr key={client.id} >
                                                <td nowrap='true'>{client.name}</td>
                                                <td nowrap='true'>{client.kind}</td>
                                                <td nowrap='true'>{client.contact}</td>
                                                <td>
                                                    <Link to={`/clients/${client.id}`} className="btn btn-default border-0">
                                                        <i className="fa fa-angle-right"></i>
                                                    </Link>
                                                </td>
                                            </tr>
                                        ))
                                        
                                    ): (
                                        <tr>
                                            <td colSpan="4">Nothing to show here</td>
                                        </tr>
                                    )}
                                    
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <div className="modal fade" id="addClient" data-backdrop="static" tabIndex="-1" role="dialog"
            aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div className="modal-dialog  modal-dialog-centered" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="staticBackdropLabel">Add Client</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <form onSubmit={onSubmit}>
                        <div className="modal-body">
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
                                <input type="text" value={name} onChange={inputChange} required name="name" placeholder="Enter name of client" id="id_name"
                                    className="form-control" />
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
}