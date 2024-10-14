import React, { Component } from "react";
import { getData } from '../Utils/apiCalls'

export default class Dashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            
        };
    }

    async componentDidMount() {
        let responseData = await getData()
        console.log(responseData)
    }

    render() {
        return (
            <>
            </>
        );
    }
}