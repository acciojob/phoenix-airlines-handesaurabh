import { put, call } from "redux-saga/effects";

import actions from "../../constants/actions";
import { filterBySourceDest } from "../../modules/utils/global-services";
//import { get } from "../../utils/xhr";

import FlightJSON from "../../mocks/flights-mumbai.json";

export function* fetFlightList(payload) {
  // put API URL here
  let url = "";
  const jsonResponse = [...FlightJSON];
  try {
    // uncomment when API is available
    //const response = yield call(get, url);

    const response = filterBySourceDest(payload, jsonResponse);

    yield put({
      type: actions.GET_FLIGHT_LIST_SUCCESS,
      result: response,
      error: null
    });
  } catch (error) {
    yield put({
      type: actions.GET_FLIGHT_LIST_ERROR,
      result: null,
      error: {
        statusCode: 500,
        message: 'Failed to fetch flights'
      }
    });
  }
}
