import React, { Component } from "react";
import { Typography, Button} from '@mui/material';
import { getData, deleteUser } from '../Utils/apiCalls'
import '../CSS/Users.css';

export default class Users extends Component {
    constructor(props) {
        super(props);
        this.state = {
            complianceData: [],
            show: 'delete'
        };
    }

    async componentDidMount() {
        this.setState({
            complianceData: this.props.complianceData
        })
    }

    delete = async (userID) => {
        let deleteResponse = await deleteUser(userID)
        if (deleteResponse.statusCode === 200) {
            let responseData = await getData();
            this.setState({ complianceData: responseData });
        }
    }

    render() {
        return (
            <>
                <div className="header">
                    <Button className="userButton" onClick={() => { this.setState({ show: 'add' }) }}>Add User</Button>
                    <Button className="userButton paddings" onClick={() => { this.setState({ show: 'delete' }) }}>Delete User</Button>
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
                                    {this.state.complianceData && this.state.complianceData.length > 0 ? (
                                        this.state.complianceData.map((user) => (
                                            <tr key={user._id}>
                                                <td>{user.userID}</td>
                                                <td>{user.department}</td>
                                                <td>{user.location}</td>
                                                <td>{user.name}</td>
                                                <td>
                                                    <Button
                                                        className="deleteButton"
                                                        onClick={() => this.delete(user.userID)}
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
