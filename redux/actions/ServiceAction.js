//
//  ServiceAction.js:
//  BoilerPlate
//
//  Created by Retrocube on 10/4/2019, 9:07:24 AM.
//  Copyright © 2019 Retrocube. All rights reserved.
//
import { GENERAL_ACTION, LOGIN, LOGOUT, NO_INTERNET } from "./ActionTypes";

const callback = () => {};
// import {isNetworkReachable, isConnected} from 'react-native-reachability-popup';
export function request(
    types, //Action Type
    service, //Service url
    service_type, //Web Service type 'post,get,put,delete....'
    data, //Paramter for request
    showHud, //Show spinner
    successCB = callback,
    failureCB = callback
) {
    //   if (!isNetworkReachable() && !isConnected()) {
    //     return {
    //       type: NO_INTERNET,
    //     };
    //   }
    return {
        payload: data,
        service,
        service_type,
        type: GENERAL_ACTION,
        request_type: types,
        showHud,
        successCB,
        failureCB,
    };
}
export function success(types, data) {
    return {
        data: data,
        type: types.SUCCESS,
    };
}

export function failure(types, error) {
    return {
        error,
        type: types.FAILURE,
    };
}
export function logout() {
    return {
        type: LOGOUT,
    };
}

// export function failure(errorMessage: Object) {
//     return {
//         errorMessage,
//         type: LOGIN.FAILURE
//     };
// }
