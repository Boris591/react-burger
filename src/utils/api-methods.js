import {request} from "./help-methods";

export const getElements = async (setData, setError, url) => {
    request(url).then(data => setData(data.data)).catch(e => setError(e));
}

export const getOrder = async (setData, setError, url, data) => {
    request(url,{
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    }).then(data => setData(data.order.number)).catch(e => setError(e));
}