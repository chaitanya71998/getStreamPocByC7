import { asyncFetch } from "./APIUtils"
import { apiMethods } from "./APIConstants"

const GET_TOKEN_END_POINT = `http://localhost:5000`

class GetStreamServiceAPI {
  getUserStreamTokenAPI(requestObject) {
    return asyncFetch(
      `${GET_TOKEN_END_POINT}/getTokenFromUser/`,
      apiMethods.post,
      requestObject
    )
  }

  addActivityToCodingPracticeTimeline(requestObject) {
    return asyncFetch(
      `${GET_TOKEN_END_POINT}/addBatchFeed/`,
      apiMethods.post,
      requestObject
    )
  }
}

export default GetStreamServiceAPI
