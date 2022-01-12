import logo from '../../logo.svg';
import {NavLink} from "react-router-dom";
import config from '../../config';

function Sidebar() {

    const user = JSON.parse(config.getUser());

    return (
        <aside className="main-sidebar sidebar-dark-primary elevation-4">
            <a href="index3.html" className="brand-link">
                <img src={logo} alt="AdminLTE Logo" className="brand-image img-circle elevation-3" style={{ opacity: .8 }} />
                <span className="brand-text font-weight-light">Freelance 'Re Us</span>
            </a>
            <div className="sidebar">
                <div className="user-panel mt-3 pb-3 mb-3 d-flex">
                    <div className="image">
                        <img src={logo} className="img-circle elevation-2" alt="User Image" />
                    </div>
                    <div className="info">
                        <a href="#" className="d-block">{user.full_name}</a>
                    </div>
                </div>
                <div className="form-inline">
                    <div className="input-group" data-widget="sidebar-search">
                        <input className="form-control form-control-sidebar" type="search" placeholder="Search" aria-label="Search" />
                        <div className="input-group-append">
                            <button className="btn btn-sidebar">
                                <i className="fas fa-search fa-fw"></i>
                            </button>
                        </div>
                    </div>
                </div>
                <nav className="mt-2">
                    <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                        <li className="nav-item">
                            <NavLink to="/dashboard" className={({isActive}) => (isActive ? "nav-link active" : 'nav-link')} >
                                <i className="nav-icon fas fa-tachometer-alt"></i>
                                <p>
                                    Dashboard
                                </p>
                            </NavLink>{' '}
                        </li>
                        <li className="nav-item">
                            <NavLink to="/clients" className={({isActive}) => (isActive ? "nav-link active" : 'nav-link')} exact="true">
                                <i className="nav-icon fa fa-mug-hot"></i>
                                <p>
                                    Clients
                                </p>
                            </NavLink>{' '}
                        </li>
                        <li className="nav-item">
                            <NavLink to="/projects" className={({isActive}) => (isActive ? "nav-link active" : 'nav-link')} exact="true">
                                <i className="nav-icon fas fa-folder"></i>
                                <p>
                                    Projects
                                </p>
                            </NavLink>
                        </li>
                        
                    </ul>
                </nav>

            </div>
        </aside>


    );
}

export default Sidebar;