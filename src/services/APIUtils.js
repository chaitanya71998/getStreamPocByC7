export async function asyncFetch(url, method = "GET", requestObject) {
  const formattedrequestObject = JSON.stringify(JSON.stringify(requestObject))
  const dataRequestObject = JSON.stringify({
    data: formattedrequestObject,
  })
  const apiRequestObject = dataRequestObject

  const response = await fetch(url)
  if (response.ok === false) {
    throw Error(JSON.stringify(response))
  }
  return response
}
