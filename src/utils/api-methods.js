export const getElements = async (setData, setError, url) => {
    fetch(url)
        .then(async (res) => {
            if (res.ok) {
                const data = await res.json();
                setData(data.data);
            }else{
                setError(res);
            }
        }).catch(e => setError(e));
}

export const getOrder = async (setData, setError, url, data) => {
    fetch(url,{
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
        .then(async (res) => {
            if (res.ok) {
                const data = await res.json();
                setData(data.order.number);
            }else{
                setError(res);
            }
        }).catch(e => setError(e));
}