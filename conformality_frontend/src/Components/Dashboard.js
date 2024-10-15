// import React, { Component } from "react";
// import { getData } from '../Utils/apiCalls';
// import { Typography, Button } from '@mui/material';
// import DataCharts from "./DataCharts";
// import Users from "./Users";
// import '../CSS/Dashboard.css';

// export default class Dashboard extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             complianceData: [],
//             show: 'dashBoard'
//         };
//     }

//     async componentDidMount() {
//         this.view('dashBoard')
//     }

//     view = async (view) => {
//         let responseData = await getData();
//         if (view === 'dashBoard') {
//             this.setState({
//                 complianceData: responseData,
//                 show: 'dashBoard'
//             });
//         } else {
//             this.setState({
//                 complianceData: responseData,
//                 show: 'users'
//             });
//         }
//     }

//     render() {
//         return (
//             <div className="root">
//                 {/* Topbar */}
//                 <div className="topBar">
//                     <Typography variant="h4" className="topBarText">Conformity Compliance Dashboard</Typography>
//                 </div>

//                 {/* Main content with sidebar and dashboard/users */}
//                 <div className="content">
//                     <div className="sideBar">
//                         <Button className="sidebarButton" style={{ marginTop: '20%' }} onClick={() => { this.view('dashBoard') }}>Dashboard</Button>
//                         <Button className="sidebarButton" onClick={() => { this.view('users') }}>Users</Button>
//                     </div>

//                     {this.state.show === 'dashBoard' ? (
//                         <div className="dashboard">
//                             <DataCharts complianceData={this.state.complianceData} />
//                         </div>
//                     ) : (
//                         <div className="users">
//                             <Users complianceData={this.state.complianceData} />
//                         </div>
//                     )}
//                 </div>
//             </div>
//         );
//     }
// }


import React, { Component } from "react";
import { getData } from '../Utils/apiCalls';
import { Typography, Button, IconButton, Drawer } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import DataCharts from "./DataCharts";
import Users from "./Users";
import '../CSS/Dashboard.css';

export default class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            complianceData: [],
            show: 'dashBoard',
            isSidebarOpen: false,
        };
    }

    async componentDidMount() {
        this.view('dashBoard');
    }

    view = async (view) => {
        let responseData = await getData();
        this.setState({
            complianceData: responseData,
            show: view === 'dashBoard' ? 'dashBoard' : 'users',
        });
    };

    toggleSidebar = () => {
        this.setState(prevState => ({
            isSidebarOpen: !prevState.isSidebarOpen
        }));
    };

    render() {
        return (
            <div className="root">
                <div className="topBar">
                    <div className="topBarContent">
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            onClick={this.toggleSidebar}
                            style={{marginLeft: '5%',color: 'black'}}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h4" className="topBarText">
                            Conformity Compliance Dashboard
                        </Typography>
                    </div>
                </div>

                <Drawer
                    anchor="left"
                    open={this.state.isSidebarOpen}
                    onClose={this.toggleSidebar}
                >
                    <div className="sideBar" >
                        <Button
                            className="sidebarButton"
                            style={{ marginTop: '20%' }}
                            onClick={() => { this.view('dashBoard'); this.toggleSidebar(); }}
                        >
                            Dashboard
                        </Button>
                        <Button
                            className="sidebarButton"
                            onClick={() => { this.view('users'); this.toggleSidebar(); }}
                        >
                            Users
                        </Button>
                    </div>
                </Drawer>

                {/* Main content */}
                <div className="content">
                    {this.state.show === 'dashBoard' ? (
                        <div className="dashboard">
                            <DataCharts complianceData={this.state.complianceData} />
                        </div>
                    ) : (
                        <div className="users">
                            <Users complianceData={this.state.complianceData} />
                        </div>
                    )}
                </div>
            </div>
        );
    }
}
