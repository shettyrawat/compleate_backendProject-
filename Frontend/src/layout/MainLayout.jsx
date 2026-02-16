import React from 'react';
// import Navbar from '../components/Navbar'; // Adjust based on your actual component paths
// import Sidebar from '../components/Sidebar';

const MainLayout = ({ children }) => {
    return (
        <div className="main-layout">
            <header>
                {/* <Navbar /> */}
            </header>
            <div className="content-container">
                {/* <Sidebar /> */}
                <main>{children}</main>
            </div>
            <footer>
                <p>&copy; {new Date().getFullYear()} Resume Tracker</p>
            </footer>
        </div>
    );
};

export default MainLayout;
