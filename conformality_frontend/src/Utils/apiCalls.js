let API_URL = "http://localhost:4000/"

export const getData = async () => {
    const options = {
        method: "GET",
        redirect: 'follow',
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "Access-Control-Allow-Origin": "*",
        },
    };

    try {
        let response = await fetch(API_URL + "data", options);
        let json = await response.json();

        if (json) {
            return json;
        } else {
            return null
        }
    } catch (err) {
        console.error('Error while retriving data from database', err);
    }
    return null;
}

export const deleteUser = async (userID) => {
    const options = {
        method: "DELETE",
        redirect: 'follow',
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "Access-Control-Allow-Origin": "*",
        },
    };

    try {
        let response = await fetch(API_URL + "deleteUser/" + userID, options);
        let json = await response.json();
        if (json) {
            return json;
        } else {
            return null
        }
    } catch (err) {
        console.error('Error while retriving data from database', err);
    }
    return null;
}

export const addNewuser = async (userID, name, department, location, privacyTraining, amlCertification, codeOfConduct, securityTraining, riskManagementTraining, incidentReports, backgroundCheck) => {
    const requestBody = {
        userID: userID,
        name: name,
        department: department,
        location: location,
        compliance: {
            privacyTraining: privacyTraining,
            amlCertification: amlCertification,
            codeOfConduct: codeOfConduct,
            securityTraining: securityTraining,
            riskManagementTraining: riskManagementTraining,
            incidentReports: parseInt(incidentReports),
            backgroundCheck: backgroundCheck
        }
    };

    const options = {
        method: "POST",
        redirect: 'follow',
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify(requestBody)
    };

    try {
        let response = await fetch(API_URL + "addUser", options);
        let json = await response.json();
        if (json) {
            return json;
        } else {
            return null
        }
    } catch (err) {
        console.error('Error while retriving data from database', err);
    }
    return null;
}