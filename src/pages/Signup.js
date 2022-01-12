import { useState} from 'react';
import {signup} from '../api';
import toastr from 'toastr';
import $ from 'jquery';
import {Link} from 'react-router-dom';
import {useNavigate} from 'react-router-dom';

function Signup(props){
    // const [username, setUsername] = useState('');
    // const [email, setEmail] = useState('');
    // const [firstName, setFirstName] = useState('');
    // const [lastName, setLastName] = useState('');
    // const [password, setPassword] = useState('');
    const [user, setUser] = useState({
        username: '',
        email: '',
        first_name: '',
        last_name: '',
        password: ''
    });

    let navigate = useNavigate();

    const { username, email, first_name, last_name, password } = user;

    const inputChange = (e) => {
        const {name, value} = e.target;
        setUser((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const [error, setError] = useState('');

    const onSubmit = (event) => {
        event.preventDefault();
        // toastr.info("Loading...");
        $("#id_submit").html("Creating new account...");
        $("#id_submit").prop('disabled', true);
        signup(user).then(res => {
            toastr.success("Your account is created successfully!");
            navigate("/");
            $("#id_submit").html("Signup");
            $("#id_submit").prop('disabled', false);
            

        }).catch(({response}) => {
            $("#id_submit").html("Signup");
            $("#id_submit").prop('disabled', false);
            // console.log(response);

            toastr.error(response.data.detail);
            setError(response.data.detail);
        });
    };

    return (
        <div className="login-page">
            <div className=" login-box">

                <div className="card card-outline card-primary">
                    <div className="card-header text-center">
                        <Link to="/" className="h1"><b>Admin</b>LTE</Link>
                    </div>
                    <div className="card-body">
                        <p className="login-box-msg">Setup an account.</p>
                        {error && <span className="text-danger">{error}</span>}
                        <form onSubmit={onSubmit} >
                            <div className="input-group mb-3">
                                <input type="text" required name="first_name" value={first_name} className="form-control" placeholder="First Name" onChange={inputChange} />
                                <div className="input-group-append">
                                    <div className="input-group-text">
                                        <span className="fas fa-user"></span>
                                    </div>
                                </div>
                            </div>
                            <div className="input-group mb-3">
                                <input type="text" required name="last_name" value={last_name} className="form-control" placeholder="Last Name" onChange={inputChange} />
                                <div className="input-group-append">
                                    <div className="input-group-text">
                                        <span className="fas fa-user"></span>
                                    </div>
                                </div>
                            </div>
                            <div className="input-group mb-3">
                                <input type="text" required name="username" value={username} className="form-control" placeholder="Username" onChange={inputChange} />
                                <div className="input-group-append">
                                    <div className="input-group-text">
                                        <span className="fas fa-user"></span>
                                    </div>
                                </div>
                            </div>
                            <div className="input-group mb-3">
                                <input type="email" name="email" value={email} className="form-control" placeholder="Email" onChange={inputChange} />
                                <div className="input-group-append">
                                    <div className="input-group-text">
                                        <span className="fas fa-envelope"></span>
                                    </div>
                                </div>
                            </div>
                            <div className="input-group mb-3">
                                <input type="password" name="password" value={password} required className="form-control" placeholder="Password" onChange={inputChange} />
                                <div className="input-group-append">
                                    <div className="input-group-text">
                                        <span className="fas fa-lock"></span>
                                    </div>
                                </div>
                            </div>
                            <button type="submit" id="id_submit" className="btn btn-primary btn-block">Signup</button>
                            
                        </form>




                        <p className="mb-1">
                            {/* <a href="">I forgot my password</a> */}
                        </p>
                        <p className="mb-0">
                            {/* <Link to={"/signup"} className="text-center">Register a new membership</Link> */}
                        </p>
                    </div>

                </div>

            </div>
        </div>
    );
}

export default Signup;