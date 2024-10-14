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
        }else {
            return null
        }
    } catch (err) {
        console.error('Error while retriving data from database', err);
    }
    return null;
}