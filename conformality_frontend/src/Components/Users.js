import React, { Component } from "react";
import { Typography, Button, TextField } from '@mui/material';
import { getData, deleteUser, addNewuser } from '../Utils/apiCalls'
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import dayjs from 'dayjs';
import '../CSS/Users.css';

export default class Users extends Component {
    constructor(props) {
        super(props);
        this.state = {
            complianceData: [],
            show: 'delete',
            fname: '',
            lname: '',
            department: '',
            location: '',
            privacyTraining: null,
            amlCertification: null,
            codeOfConduct: null,
            securityTraining: null,
            riskManagementTraining: null,
            incidentReports: 0,
            backgroundCheck: false
        };
    }

    async componentDidMount() {
        this.setState({
            complianceData: this.props.complianceData
        })
    }

    //onchange event to set user entered values to state variables
    textFieldChange = (event) => {
        this.setState({
            [event.target.id]: event.target.value
        }, () => {
            this.formValidation();
        })
    }

    //form validation to validate user entered values
    formValidation = () => {
        if (this.state.fname && this.state.lname && this.state.department && this.state.location) {
            this.setState({
                formValid: true
            })
        } else if (this.state.formValid) {
            this.setState({
                formValid: false
            })
        }
    }
    // method to delete a user
    delete = async (userID) => {
        let deleteResponse = await deleteUser(userID)
        if (deleteResponse.statusCode === 200) {
            let responseData = await getData();
            this.setState({ complianceData: responseData });
        }
    }

    // method to add new user
    addUser = async () => {
        // code to generate new userId
        const lastUser = this.state.complianceData.length > 0
            ? this.state.complianceData[this.state.complianceData.length - 1]
            : null;

        let newUserID = 'U1001';
        if (lastUser && lastUser.userID) {
            const lastUserID = lastUser.userID;
            const lastUserNumber = parseInt(lastUserID.slice(1));
            newUserID = 'U' + (lastUserNumber + 1).toString().padStart(4, '0');
        }

        // api call to add new user
        let addUserResponse = await addNewuser(newUserID, this.state.fname + this.state.lname, this.state.department, this.state.location, this.state.privacyTraining,
            this.state.amlCertification, this.state.codeOfConduct, this.state.securityTraining, this.state.riskManagementTraining, this.state.incidentReports, this.state.backgroundCheck
        )
        if (addUserResponse.statusCode === 200) {
            let responseData = await getData();
            this.setState({
                complianceData: responseData,
                show: 'delete'
            });
        }
    }

    render() {
        return (
            <>
                {/* add and delete buttons */}
                <div className="header">
                    <Button className="userButton" onClick={() => { this.setState({ show: 'add' }) }}>Add User</Button>
                    <Button className="userButton paddings" onClick={() => { this.setState({ show: 'delete' }) }}>Delete User</Button>
                </div>
                <div>
                    {this.state.show === 'add'
                        ?
                        //  form to add new user
                        <div className="addUserForm">
                            <Typography className="formTitle">Add New User</Typography>

                            <div className="formSection">
                                <TextField id="fname" required label="First Name" type="text" onChange={this.textFieldChange} className="formInput" />
                                <TextField id="lname" required label="Last Name" type="text" onChange={this.textFieldChange} className="formInput" />
                            </div>

                            <div className="formSection">
                                <TextField id="department" required label="Department" type="text" onChange={this.textFieldChange} className="formInput" />
                                <TextField id="location" required label="Location" type="text" onChange={this.textFieldChange} className="formInput" />
                            </div>

                            <div className="formSection">
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker
                                        id='privacyTraining'
                                        label='Privacy Training'
                                        className='formInput'
                                        onChange={(date) => {
                                            const formattedDate = dayjs(date).format('YYYY-MM-DD');
                                            this.setState({ privacyTraining: formattedDate })
                                        }}
                                    />
                                </LocalizationProvider>

                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker
                                        id='amlCertification'
                                        label='AML Certification'
                                        className='formInput'
                                        onChange={(date) => {
                                            const formattedDate = dayjs(date).format('YYYY-MM-DD');
                                            this.setState({ amlCertification: formattedDate })
                                        }}
                                    />
                                </LocalizationProvider>
                            </div>

                            <div className="formSection">
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker
                                        id='codeOfConduct'
                                        label='Code Of Conduct'
                                        className='formInput'
                                        onChange={(date) => {
                                            const formattedDate = dayjs(date).format('YYYY-MM-DD');
                                            this.setState({ codeOfConduct: formattedDate })
                                        }}
                                    />
                                </LocalizationProvider>

                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker
                                        id='securityTraining'
                                        label='Security Training'
                                        className='formInput'
                                        onChange={(date) => {
                                            const formattedDate = dayjs(date).format('YYYY-MM-DD');
                                            this.setState({ securityTraining: formattedDate })
                                        }}
                                    />
                                </LocalizationProvider>
                            </div>

                            <div className="formSection">
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker
                                        id='riskManagementTraining'
                                        label='Risk Management Training'
                                        className='formInput'
                                        onChange={(date) => {
                                            const formattedDate = dayjs(date).format('YYYY-MM-DD');
                                            this.setState({ riskManagementTraining: formattedDate })
                                        }}
                                    />
                                </LocalizationProvider>

                                <TextField id="incidentReports" required label="Incident Reported" value={this.state.incidentReports} type="number" className="formInput" onChange={this.textFieldChange} />
                            </div>
                            <div className="formSection centre" >
                                <FormControlLabel
                                    label="Background Check"
                                    className="backgroundCheckLabel"
                                    control={
                                        <Checkbox
                                            id="backgroundCheck"
                                            checked={this.state.backgroundCheck}
                                            onChange={(e) => this.setState({ backgroundCheck: e.target.checked })}
                                        />
                                    }
                                />
                            </div>

                            <div className="formSection centre">
                                <Button className='submitButton' disabled={!this.state.formValid} onClick={this.addUser}>
                                    Add User
                                </Button>
                            </div>
                        </div>
                        :
                        // table to show existing users and give delete button
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
                                                <td>{user.name}</td>
                                                <td>{user.department}</td>
                                                <td>{user.location}</td>
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
