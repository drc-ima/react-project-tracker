import { Link } from 'react-router-dom';
import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import $ from 'jquery';
import {signin} from '../api';
import config from '../config';
import toastr from 'toastr';

function Login() {
    const [userLogin, setUserLogin] = useState({
        username: '',
        password: '',
    });

    let navigate = useNavigate();

    const inputChange = (e) => {
        const {name, value} = e.target;
        setUserLogin((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const {username, password} = userLogin;

    const onSubmit = (event) => {
        event.preventDefault();
        $("#id_submit").html("Verifying...");
        $("#id_submit").prop('disabled', true);

        signin(userLogin).then((response) => {
           
            $("#id_submit").html("Sign In");
            $("#id_submit").prop('disabled', false);
            const results = response.data;
            // const user = results.user;
            // console.log(user);
            setError('');
            config.setToken(results.user.token);
            config.setAuth(JSON.stringify(results));
            config.setUser(JSON.stringify(results.user));
            toastr.success("Great! Login successful");
            navigate("/dashboard");
            
        }).catch(({response}) => {
            // console.log(response);
            $("#id_submit").html("Sign In");
            $("#id_submit").prop('disabled', false);
            setError(response.data.detail);
            toastr.error(response.data.detail);
        });
    };

    const [error, setError] = useState('');

    return (
        <div className="login-page">
            <div className=" login-box">
                <div className="card card-outline card-primary">
                    <div className="card-header text-center">
                        <Link to="/" className="h1"><b>Admin</b>LTE</Link>
                    </div>
                    <div className="card-body">
                        <p className="login-box-msg">Sign in to start your session</p>

                        <form  onSubmit={onSubmit}>
                            {error && <span className="text-danger">{error}</span>}
                            <div className="input-group mb-3">
                                <input type="text" className="form-control" value={username} onChange={inputChange} required name="username" placeholder="Username" />
                                <div className="input-group-append">
                                    <div className="input-group-text">
                                        <span className="fas fa-user"></span>
                                    </div>
                                </div>
                            </div>
                            <div className="input-group mb-3">
                                <input type="password" required name="password" value={password} onChange={inputChange} className="form-control" placeholder="Password" />
                                <div className="input-group-append">
                                    <div className="input-group-text">
                                        <span className="fas fa-lock"></span>
                                    </div>
                                </div>
                            </div>
                            <button type="submit" id="id_submit" className="btn btn-primary btn-block">Sign In</button>
                        </form>
                        <p className="mb-1">
                            <a href="forgot-password.html">I forgot my password</a>
                        </p>
                        <p className="mb-0">
                            <Link to={"/signup"} className="text-center">Register a new membership</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;