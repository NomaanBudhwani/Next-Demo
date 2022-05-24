//
//  serviceSaga.js:
//  BoilerPlate
//
//  Created by Retrocube on 10/4/2019, 9:29:45 AM.
//  Copyright © 2019 Retrocube. All rights reserved.
//
import { put, call, takeEvery } from "redux-saga/effects";
import { success, failure } from "../actions/ServiceAction";
import HttpServiceManager from "../../services/HttpServiceManager";
import { GENERAL_ACTION } from "../actions/ActionTypes";

function callRequest(service, payload, service_type, showHud) {
    return HttpServiceManager.getInstance().request(
        service,
        payload,
        service_type,
        showHud
    );
}

function* watchRequest(action) {
    const {
        payload,
        service,
        service_type,
        request_type,
        successCB,
        failureCB,
        showHud,
    } = action;
    try {
        const response = yield call(
            callRequest,
            service,
            payload,
            service_type,
            showHud
        );
        yield put(success(request_type, response));
        successCB(response);
    } catch (err) {
        yield put(failure(request_type, err));
        failureCB(err);
    }
}

export default function* root() {
    yield takeEvery(GENERAL_ACTION, watchRequest);
}
