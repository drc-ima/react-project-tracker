import { useState } from 'react';
import api from '../api';
import toastr from 'toastr';
import $ from 'jquery';

const Feature = ({ id, desc, stat }) => {
    
    const [feature, setFeature] = useState({
        description: desc ? desc : '',
        status: stat ? stat : ''
    })

    const { description, status } = feature

    const inputChange = (desc, id) => {
        setFeature({
            description: desc,
            status: status
        });

        let cfeature = {
            description: desc,
            status: status
        };

        api.updateMilestoneFeature(id, cfeature).then(res => {
            setFeature(res.data);
        }).catch(({response}) => {
            toastr.error("Something bad occured!");
        })
    }

    const onStatusChange = (stat, id) => {
        setFeature({
            status: stat,
            description: description
        });

        let cfeature = {
            description: description,
            status: stat
        }
        if(stat === '5'){
            $("#id_check" + id).removeClass('fa-check');
            $("#id_check" + id).addClass('fa-spin fa-spinner');
            $(".btn").prop('disabled', true);
            $(".btn").prop('disabled', true);
            
        }else if(stat === '4'){
            $("#id_times" + id).removeClass('fa-times');
            $("#id_times" + id).addClass('fa-spin fa-spinner');
            $(".btn").prop('disabled', true);
            $(".btn").prop('disabled', true);
        }

        api.updateMilestoneFeature(id, cfeature).then(res => {
            if(stat === '5'){
                $("#id_check" + id).addClass('fa-check');
                $("#id_check" + id).removeClass('fa-spin fa-spinner');
                $(".btn").prop('disabled', false);
                $(".btn").prop('disabled', false);
            }else if(stat === '4'){
                $("#id_times" + id).addClass('fa-times');
                $("#id_times" + id).removeClass('fa-spin fa-spinner');
                $(".btn").prop('disabled', false);
                $(".btn").prop('disabled', false);
            }
            // <Progress completion_rate={completion_rate} />
            // console.log(progress);
            toastr.success("Feature status updated successfully!");
            setFeature(res.data);
        }).catch(({ response }) => {
            if(stat === '5'){
                $("#id_check" + id).addClass('fa-check');
                $("#id_check" + id).removeClass('fa-spin fa-spinner');
                $(".btn").prop('disabled', false);
                $(".btn").prop('disabled', false);
            }else if(stat === '4'){
                $("#id_times" + id).addClass('fa-times');
                $("#id_times" + id).removeClass('fa-spin fa-spinner');
                $(".btn").prop('disabled', false);
                $(".btn").prop('disabled', false);
            }
            toastr.error("Something bad occured!");
        });

    }

    return (
        <div className="list-group-item">
            <div className="row">
                <div className="col-md-10 col-lg-10 col-sm-9">
                    <form>
                        <input name="description" autoComplete="off" type="text" value={description} className="form-control form-control-sm border-0 bg-transparent" onChange={(e) => { inputChange(e.target.value, id) }} style={{ fontSize: "18px", color: status === 4 ? 'red' : status === 5 ? 'green' : 'black' }} />
                        {/* <input type='text' name="description"  /> */}
                    </form>
                </div>
                <div className="col-md-2 col-lg-2 col-sm-3">
                    {
                        feature.status === '0' || feature.status === '' && (
                            <>
                                <button onClick={(e) => { onStatusChange('5', id) }} className="btn btn-default" title="Complete this item">
                                    <i id={"id_check" + id} className="fa fa-check text-success"></i>
                                </button>
                                <button onClick={(e) => { onStatusChange('4', id) }} className="btn btn-default ml-1" title="Complete this item">
                                    <i id={"id_times" + id} className="fa fa-times text-danger"></i>
                                </button>
                            </>
                        )
                    }

                </div>
            </div>
        </div>
    );

};

export default Feature;