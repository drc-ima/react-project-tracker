import logo from '../../logo.svg';
import config from '../../config';
import {useNavigate} from 'react-router-dom';
import toastr from 'toastr';

function Navbar() {
    let navigate = useNavigate();
    const user = JSON.parse(config.getUser());

    const logout = () => {
        localStorage.removeItem('auth');
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        toastr.success("Logout successful");
        navigate('/');
    };

    return (

        <nav className="main-header navbar navbar-expand navbar-white navbar-light">

            <ul className="navbar-nav">
                <li className="nav-item">
                    <a className="nav-link" data-widget="pushmenu" href="#" role="button"><i className="fas fa-bars"></i></a>
                </li>
                <li className="nav-item d-none d-sm-inline-block">
                    <a href="index3.html" className="nav-link">Home</a>
                </li>
                <li className="nav-item d-none d-sm-inline-block">
                    <a href="#" className="nav-link">Contact</a>
                </li>
            </ul>


            <ul className="navbar-nav ml-auto">

                <li className="nav-item dropdown user-menu">
                    <a href="#" className="nav-link dropdown-toggle" data-toggle="dropdown">
                        <img src={logo} className="user-image img-circle elevation-2" alt="User Image" />
                        <span className="d-none d-md-inline">{user.full_name}</span>
                    </a>
                    <ul className="dropdown-menu dropdown-menu-lg dropdown-menu-right">
                        
                        <li className="user-header bg-primary">
                            <img src={logo} className="img-circle elevation-2" alt="User Image" />

                            <p>
                            {user.full_name} - {user.username}
                            <small>Member since {user.date_joined}</small>
                            </p>
                        </li>
 
                        <li className="user-footer">
                            <a href="#" className="btn btn-default btn-flat">Profile</a>
                            <button onClick={logout} className="btn btn-default btn-flat float-right">Sign out</button>
                        </li>
                    </ul>
                </li>

                
            </ul>
        </nav>
    );
}

export default Navbar;