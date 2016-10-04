// import { put, select } from 'redux-saga/effecs';
// import TemperatureActions from '../Redux/TemperatureRedux.template.js';
// import { is } from 'ramda';
//
// // exported to make available for tests
// export const selectTemperature = (state) => state.temperature.temperature;
//
// // process STARTUP actions
// export function * startup (action) {
//   const temp = yield select(selectTemperature);
//   // only fetch new temps when we don't have one yet.
//   if (!is(Number, temp)) {
//     yield put(TemperatureActions.temperatureRequest('San Francisco'));
//   }
// }
