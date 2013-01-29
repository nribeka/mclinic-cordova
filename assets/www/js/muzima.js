/*
 * Copyright 2012 Muzima Team
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// currently logged in username
var SESSION_USERNAME = "session.username";
// randomly hashed password
var SESSION_PASSWORD = "session.password";
// base url where this application can get rest resource
var SESSION_SERVER = "session.url";
// error message holder
var ERROR_MESSAGE = "error.message";

var COHORT_UUID = "cohort.uuid";

var PATIENT_UUID = "patient.uuid";

var FORM_UUID = "form.uuid";

var session = (function ($) {
    var session = {};
    var sessionInformation = {};

    var updateWindowName = function () {
        window.name = JSON.stringify(sessionInformation);
    };

    var parseWindowName = function () {
        if (window.name.length)
            sessionInformation = JSON.parse(window.name);
    };

    session.putValue = function (name, value) {
        parseWindowName();
        if (typeof name !== "undefined" && name.length && typeof value !== "undefined") {
            sessionInformation[name] = value;
            updateWindowName();
        }
    };

    session.getValue = function (name) {
        parseWindowName();
        return sessionInformation [name];
    };

    session.removeValue = function (name) {
        parseWindowName();
        var value;
        if (typeof name !== "undefined" && typeof sessionInformation [name] !== "undefined") {
            value = sessionInformation [name];
            delete sessionInformation [name];
            updateWindowName();
        }
        return value;
    };

    return session;
}(jQuery));

// we need to do something and encapsulate the authentication information and send it to the plugin here

function success(successCallback) {
    return typeof successCallback !== 'function' ? null : function (result) {
        successCallback(result);
    }
}

function error(errorCallback) {
    return typeof errorCallback !== 'function' ? null : function (code) {
        errorCallback(code);
    };
}

var adminService = (function ($) {
    var service = {};

    service.downloadAllForms = function (successCallback, errorCallback) {
        cordova.exec(success(successCallback), error(errorCallback), "AdminPlugin", "downloadAllForms", []);
    };

    service.downloadAllCohorts = function (successCallback, errorCallback) {
        cordova.exec(success(successCallback), error(errorCallback), "AdminPlugin", "downloadAllCohorts", []);
    };

    service.downloadAllPatients = function (cohortUuid, successCallback, errorCallback) {
        cordova.exec(success(successCallback), error(errorCallback), "AdminPlugin", "downloadAllPatients", [cohortUuid]);
    };

    service.downloadAllObservations = function (patientUuid, successCallback, errorCallback) {
        cordova.exec(success(successCallback), error(errorCallback), "AdminPlugin", "downloadAllObservations", [patientUuid]);
    };

    return service;
}(jQuery));

var formService = (function ($) {
    var service = {};

    service.getAllForms = function (successCallback, errorCallback) {
        cordova.exec(success(successCallback), error(errorCallback), "FormPlugin", "getAllForms", []);
    };

    service.getCohortByUuid = function (cohortUuid, successCallback, errorCallback) {
        cordova.exec(success(successCallback), error(errorCallback), "FormPlugin", "getFormByUuid", [cohortUuid]);
    };

    return service;
}(jQuery));

var cohortService = (function ($) {
    var service = {};

    service.getAllCohorts = function (successCallback, errorCallback) {
        cordova.exec(success(successCallback), error(errorCallback), "CohortPlugin", "getAllCohorts", []);
    };

    service.getCohortByName = function (partialName, successCallback, errorCallback) {
        cordova.exec(success(successCallback), error(errorCallback), "CohortPlugin", "getCohortByName", [partialName]);
    };

    service.getCohortByUuid = function (cohortUuid, successCallback, errorCallback) {
        cordova.exec(success(successCallback), error(errorCallback), "CohortPlugin", "getCohortByUuid", [cohortUuid]);
    };

    return service;
}(jQuery));

var patientService = (function ($) {
    var service = {};

    service.getAllPatients = function (successCallback, errorCallback) {
        cordova.exec(success(successCallback), error(errorCallback), "PatientPlugin", "getAllPatients", []);
    };

    service.getPatientsByName = function (partialName, successCallback, errorCallback) {
        cordova.exec(success(successCallback), error(errorCallback), "PatientPlugin", "getPatientsByName", [partialName]);
    };

    service.getPatientByIdentifier = function (identifier, successCallback, errorCallback) {
        cordova.exec(success(successCallback), error(errorCallback), "PatientPlugin", "getPatientByIdentifier", [identifier]);
    };

    service.getPatientByUuid = function (patientUuid, successCallback, errorCallback) {
        cordova.exec(success(successCallback), error(errorCallback), "PatientPlugin", "getPatientByUuid", [patientUuid]);
    };

    return service;
}(jQuery));

var observationService = (function ($) {
    var service = {};

    service.getAllObservations = function (patientUuid, successCallback, errorCallback) {
        cordova.exec(success(successCallback), error(errorCallback), "ObservationPlugin", "getAllObservations", [patientUuid]);
    };

    service.getPatientByUuid = function (observationUuid, successCallback, errorCallback) {
        cordova.exec(success(successCallback), error(errorCallback), "PatientPlugin", "getPatientByUuid", [observationUuid]);
    };

    return service;
}(jQuery));

var userService = (function ($) {
    var service = {};

    service.authenticate = function (username, password, url, successCallback, errorCallback) {
        cordova.exec(success(successCallback), error(errorCallback), "UserPlugin", "authenticate", [username, password, url]);
    };

    service.getUserByUsername = function (username, successCallback, errorCallback) {
        cordova.exec(success(successCallback), error(errorCallback), "UserPlugin", "getUserByUsername", [username]);
    };

    return service;
}(jQuery));
