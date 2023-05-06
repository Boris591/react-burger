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