import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Footer from './Footer';
import { Routes, Route, Outlet } from 'react-router';
import Dashboard from '../../pages/Dashboard';

function Layout() {
    return (
        <div className="sidebar-mini layout-fixed wrapper">
            <Navbar />
            <Sidebar />
            
            <div className="content-wrapper">
                <Outlet />
            {/* <Routes>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/signup" element={<Signup />} />
            </Routes> */}
                {/* <section className="content-header">
                    <div className="container-fluid">
                        <div className="row mb-2">
                            <div className="col-sm-6">
                                <h1>Page Title</h1>
                            </div>
                            <div className="col-sm-6">
                                <ol className="breadcrumb float-sm-right">
                                    <li className="breadcrumb-item"><a href="#">Home</a></li>
                                    <li className="breadcrumb-item"><a href="#">Layout</a></li>
                                    <li className="breadcrumb-item active">Fixed Layout</li>
                                </ol>
                            </div>
                        </div>
                    </div>
                </section>

                
                <section className="content">

                    <div className="container-fluid">
                        
                    </div>
                </section> */}
                
            </div>
            
            <Footer />
        </div>
    );
}

export default Layout;