import React, { Component } from "react";
import { getData } from '../Utils/apiCalls';
import { Typography, Button } from '@mui/material';
import DataCharts from "./DataCharts";
import Users from "./Users";
import '../CSS/Dashboard.css';

export default class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            complianceData: [],
            show: 'dashBoard'
        };
    }

    async componentDidMount() {
        try {
            let responseData = await getData();
            this.setState({ complianceData: responseData });
        } catch (error) {
            console.error("Error fetching data: ", error);
        }
    }

    render() {
        return (
            <div className="root">
                {/* Topbar */}
                <div className="topBar">
                    <Typography variant="h4" className="topBarText">Conformity Compliance Dashboard</Typography>
                </div>

                {/* Main content with sidebar and dashboard/users */}
                <div className="content">
                    <div className="sideBar">
                        <Button className="sidebarButton" style={{ marginTop: '20%' }} onClick={() => { this.setState({ show: 'dashBoard' }) }}>Dashboard</Button>
                        <Button className="sidebarButton" onClick={() => { this.setState({ show: 'users' }) }}>Users</Button>
                    </div>

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
