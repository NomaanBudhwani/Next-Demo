//
//  index.js:
//  BoilerPlate
//
//  Created by Retrocube on 10/4/2019, 9:13:09 AM.
//  Copyright © 2019 Retrocube. All rights reserved.
//
const constant = {
    //App Constants
    socketIP: "192.34.60.217",
    socketPort: "1233",
    baseURL: "http://localhost:3000/api/",
    baseImageURL: "http://retrocubedev.com/dev/case_book/public/api/",
    applicationToken: "api.Pd*!(5675",
    //Services Constants
    client: "clients",
    getInfo: "info",
    companies: "companies",
    dependent: "dependents",
    staff: "staff",
    roles: "roles",
    login: "login",
    updatePassword: "updatepassword",
    //Socket Constants
    //     failure: { action: "failure", packet_code: 9900 },
    //Location Constants
    LOCATION_TIME_OUT: 10000,
    LOCATION_MAX_AGE: 1000,
    LOCATION_HIGH_ACCURACY: false,
};

export default constant;
