// import { createReducer, createActions } from 'reduxsauce';
// import Immutable from 'seamless-immutable';
//
// /* ------------- Types and Action Creators ------------- */
//
// const { Types, Creators } = createActions({
//   temperatureRequest: ['city'],
//   temperatureSuccess: ['temperature'],
//   temperatureFailure: null
// });
//
// export const TemperatureTypes = Types;
// export default Creators;
//
// /* ------------- Initial State ------------- */
//
// export const INITIAL_STATE = Immutable({
//   temperature: null,
//   fetching: null,
//   error: null,
//   city: null
// });
//
// /* ------------- Reducers ------------- */
//
// // request the temperature for a city
// export const request = (state, { city }) =>
// state.merge({ city, fetching: true, temperature: null });
//
// //successfull temperature lookup
// export const success = (state, action) =>
// state.merge({ temperature: action.temperature, fetching: false, error: null });
//
// // failed to get the temperature
// export const failure = (state) =>
// state.merge({ fetching: false, error: true, temperature: null });
//
// /* ------------- Hookup Reducers to Types ------------- */
//
// export const reducer = createReducer(INITIAL_STATE, {
//   [Types.TEMPERATURE_REQUEST]: request,
//   [Types.TEMPERATURE_SUCCESS]: success,
//   [Types.TEMPERATURE_FAILURE]: failure
// });
