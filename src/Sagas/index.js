import { takeLatest } from 'redux-saga';
import API from '../Services/API.template.js';
import FixtureAPI from '../Services/FixtureAPI.template.js';
import DebugSettings from '../Config/DebugSettings.template.js';

/* ------------- Types ------------- */

import { StartupTypes } from '../Redux/StartupRedux.template.js';
import { LoginTypes } from '../Redux/LoginRedux.template.js';
import { TemperatureTypes } from '../Redux/TemperatureRedux.template.js';

/* ------------- Sagas ------------- */

import { startup } from './StartupSagas.template.js';
import { login } from './LoginSagas.template.js';
import { getTemperature } from './TemperatureSagas.template.js';

/* ------------- API ------------- */

/*
  The Api we use is only from Sagas,
  so we create it here and pass along to the sagas which need it.
*/

const api = DebugSettings.useFixutres ? FixtureAPI : API.create();

/* ------------- Connect Types to Sagas ------------- */

export default function * root() {
  yield [
    // some sagas only receive an action
    takeLatest(StartupTypes.STARTUP, startup),
    takeLatest(LoginTypes.LOGIN_REQUEST, login),

    // some sags receive extra parameters in addition to an action
    takeLatest(TemperatureTypes.TEMPERATURE_REQUEST, getTemperature, api)
  ];
}
