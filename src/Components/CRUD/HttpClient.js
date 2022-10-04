export default class HttpClient {
    get = (url) => {
        return fetch(url);
    }

    post = (url, data) => {
        return fetch(url, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });
    }

    put = (url, data, id) => {
        return fetch(url + '/' + id, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });
    }
}