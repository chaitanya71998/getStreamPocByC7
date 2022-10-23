export const doNetworkCall = (user, method, requestObject) => {
  return fetch(`http://localhost:5000/getTokenFromUser/eric/`, {
    method: method, // or 'PUT'
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(JSON.stringify(requestObject)),
  })
}
