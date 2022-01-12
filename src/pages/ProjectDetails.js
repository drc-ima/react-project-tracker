import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import toastr from 'toastr';
import api from '../api';
import { Link } from 'react-router-dom';
import $ from 'jquery';
import Checklist from '../components/Checklist';
import Milestones from '../components/Milestones';
import Progress from '../components/ProgressBar';

const Project = () => {
    const { id } = useParams();

    const [project, setProject] = useState({
        title: '',
        description: '',
        created_at: '',
        completion_rate: '',
        status: '',
        status_display: '',
        tracking_type_display: '',
        tracking_type: ''
    });
    const { title, description, created_at, completion_rate, status, status_display, tracking_type_display, tracking_type } = project;
    
    useEffect(() => {
        fetchProject();
    }, [project]);

    // const projectInputChange = (e) => {
    //     console.log(e.target);
    //     const { name, value } = e.target;
    //     // setProject({
    //     //     [name]:value
    //     // });
    // api.updateProject(id, project).then(res => {
    //     toastr.success('Project title updated successfully!');
    //     // setProject(res.data);

    // }).catch(({ response }) => {
    //     toastr.error("Something bad occured!");
    // })

    //     setProject((prevState) => ({
    //         ...prevState,
    //         [name]: value
    //     }));

    // };

    const onChangeTitle = (e) => {
        let proj = {
            title: e.target.value,
            description: description,
            status: status
        };
        api.updateProject(id, proj).then(res => {
            // toastr.success('Project title updated successfully!');
            setProject(res.data);

        }).catch(({ response }) => {
            toastr.error("Something bad occured!");
        })

    };

    const onChangeDescription = (e) => {
        // console.log(e.target.name);
        let proj = {
            description: e.target.value,
            title: title,
            status: status
        };
        api.updateProject(id, proj).then(res => {
            // toastr.success('Project title updated successfully!');
            setProject(res.data);

        }).catch(({ response }) => {
            toastr.error("Something bad occured!");
        })
    };

    // $('input[name=title]').on('change', function(e) {
    //     // alert($(this).val());
    //     api.updateProject(id, project).then(res => {
    //         // toastr.success('Project title updated successfully!');
    //         setProject(res.data);

    //     }).catch(({ response }) => {
    //         toastr.error("Something bad occured!");
    //     })
    // });

    const fetchProject = () => {
        api.project(id).then(res => {
            setProject(res.data.project);
            // setProjects(res.data.projects);
            // console.log(res.data.project);
        });
    };

    return (
        <>
            <section className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-12">
                            <form>
                                <h1>
                                    <input type='text' onChange={onChangeTitle} name='title' className='form-control border-0 form-control-lg bg-transparent' style={{ fontSize: "35px", fontWeight: "bolder" }} value={title} />
                                </h1>
                                <p>
                                    <textarea className="form-control form-control-sm border-0 bg-transparent" name="description" value={description} onChange={onChangeDescription} style={{ fontSize: "18px" }} ></textarea>
                                    {/* <input type='text' className="form-control form-control-sm border-0 bg-transparent" name="description" value={description} onChange={onChangeDescription} style={{ fontSize: "18px" }} /> */}
                                </p>
                            </form>


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
                    <div className="card card-body">
                        <h5 className="font-weight-bolder">Completion Rate</h5>
                        <Progress completion_rate={completion_rate} />
                    </div>
                    <div className='card'>
                        <div className="card-header">
                            <div className="d-flex justify-content-between align-items-center">
                                <span className="font-weight-bold">Track Project with {tracking_type_display}</span>
                                {/* <div className="form-group">
                                    <select name="status" value={status} className="custom-select border-0 bg-transparent">
                                        <option value="">Select Status</option>
                                        <option value="0">Not Started</option>
                                        <option value="3">On Hold</option>
                                        <option value="4">Canceled</option>
                                    </select>
                                </div> */}

                            </div>

                        </div>
                        <div className="card-body">
                            {
                                tracking_type === 'C' ? (
                                    
                                    <Checklist projectId={id} />
                                ): tracking_type === 'M' ? (
                                    // Milestone Component
                                    <Milestones projectId={id} />
                                ) : (
                                    <h4>Hi There</h4>
                                )
                            }
                            
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Project;