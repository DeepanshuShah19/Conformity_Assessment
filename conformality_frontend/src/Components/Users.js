import React, { Component } from "react";
import { Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import '../CSS/Users.css';

export default class Users extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: 'delete'
        };
    }

    async componentDidMount() {
    }

    render() {
        const { complianceData } = this.props;

        return (
            <>
                <div className="header">
                    <Button className="userButton" onClick={() => { this.setState({ show: 'add' }) }}>Add User</Button>
                    <Button className="userButton" onClick={() => { this.setState({ show: 'delete' }) }}>Delete User</Button>
                </div>
                <div>
                    {this.state.show === 'add'
                        ?
                        <div>Add User Form</div>
                        :
                        <div className="deleteTable">
                            <table>
                                <thead>
                                    <tr>
                                        <th>User ID</th>
                                        <th>Name</th>
                                        <th>Department</th>
                                        <th>Location</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {complianceData && complianceData.length > 0 ? (
                                        complianceData.map((user) => (
                                            <tr key={user._id}>
                                                <td>{user.userID}</td>
                                                <td>{user.department}</td>
                                                <td>{user.location}</td>
                                                <td>{user.name}</td>
                                                <td>
                                                    <Button
                                                        className="deleteButton"
                                                        onClick={() => this.handleDelete(user.userID)}
                                                    >
                                                        Delete
                                                    </Button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={3}>No users available</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    }
                </div>
            </>
        );
    }
}
