//
//  index.js:
//  BoilerPlate
//
//  Created by Retrocube on 10/4/2019, 9:21:40 AM.
//  Copyright © 2019 Retrocube. All rights reserved.
//
import { combineReducers } from "redux";
import serviceReducer from "./serviceReducer";
import { LOGIN, LOGOUT, APP_STATE, INFO } from "../actions/ActionTypes";
const appReducer = combineReducers({
    loginReducer: serviceReducer(LOGIN),
    appState: serviceReducer(APP_STATE),
    infoReducer: serviceReducer(INFO),
});

const rootReducer = (state, action) => {
    if (action.type === LOGOUT) {
        const { loginReducer, ...rest } = state;
        state = {
            ...rest,
            loginReducer: { ...loginReducer, data: [] },
        };
    }
    return appReducer(state, action);
};

export default rootReducer;
