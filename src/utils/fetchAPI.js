export const doNetworkCall = (path, method, requestObject) => {
    return fetch(`http://192.168.0.127:5000/${path}`, {
        method: method, // or 'PUT'
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(JSON.stringify(requestObject))
    })
}