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

// global session data
var sessionData = {};
// currently logged in username
var SESSION_USERNAME = "session.username";
// randomly hashed password
var SESSION_PASSWORD = "session.password";
// base url where this application can get rest resource
var SESSION_SERVER = "session.url";
// error message holder
var ERROR_MESSAGE = "error.message";
// currently loaded cohort uuid
var COHORT_UUID = "cohort.uuid";
// currently loaded patient uuid
var PATIENT_UUID = "patient.uuid";
// currently loaded form uuid
var FORM_UUID = "form.uuid";
// currently loaded observation uuid
var OBS_UUID = "obs.uuid";
// currently loaded observation concept
var OBS_CONCEPT = "obs.concept";

var session = (function ($) {
    var session = {};

    var updateWindowName = function () {
        window.name = JSON.stringify(sessionData);
    };

    var parseWindowName = function () {
        if (window.name.length)
            sessionData = JSON.parse(window.name);
    };

    session.putValue = function (name, value) {
        parseWindowName();
        if (typeof name !== "undefined" && name.length && typeof value !== "undefined") {
            sessionData[name] = value;
            updateWindowName();
        }
    };

    session.getValue = function (name) {
        parseWindowName();
        return sessionData [name];
    };

    session.removeValue = function (name) {
        parseWindowName();
        var value;
        if (typeof name !== "undefined" && typeof sessionData [name] !== "undefined") {
            value = sessionData [name];
            delete sessionData [name];
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

        cordova.exec(success(successCallback), error(errorCallback), "AdminPlugin", "downloadAllForms", [sessionData]);
    };

    service.downloadAllCohorts = function (successCallback, errorCallback) {
        cordova.exec(success(successCallback), error(errorCallback), "AdminPlugin", "downloadAllCohorts", [sessionData]);
    };

    service.downloadPatientsForCohort = function (cohortUuid, successCallback, errorCallback) {
        cordova.exec(success(successCallback), error(errorCallback), "AdminPlugin", "downloadAllPatients", [sessionData, cohortUuid]);
    };

    service.downloadObservationsForPatient = function (patientUuid, successCallback, errorCallback) {
        cordova.exec(success(successCallback), error(errorCallback), "AdminPlugin", "downloadAllObservations", [sessionData, patientUuid]);
    };

    return service;
}(jQuery));

var formService = (function ($) {
    var service = {};

    service.getAllForms = function (successCallback, errorCallback) {
        cordova.exec(success(successCallback), error(errorCallback), "FormPlugin", "getAllForms", [sessionData]);
    };

    service.getFormByUuid = function (formUuid, successCallback, errorCallback) {
        cordova.exec(success(successCallback), error(errorCallback), "FormPlugin", "getFormByUuid", [sessionData, formUuid]);
    };

    return service;
}(jQuery));

var cohortService = (function ($) {
    var service = {};

    service.getAllCohorts = function (successCallback, errorCallback) {
        cordova.exec(success(successCallback), error(errorCallback), "CohortPlugin", "getAllCohorts", [sessionData]);
    };

    service.getCohortsByName = function (partialName, successCallback, errorCallback) {
        cordova.exec(success(successCallback), error(errorCallback), "CohortPlugin", "getCohortByName", [sessionData, partialName]);
    };

    service.getCohortByUuid = function (cohortUuid, successCallback, errorCallback) {
        cordova.exec(success(successCallback), error(errorCallback), "CohortPlugin", "getCohortByUuid", [sessionData, cohortUuid]);
    };

    return service;
}(jQuery));

var patientService = (function ($) {
    var service = {};

    service.getAllPatients = function (successCallback, errorCallback) {
        cordova.exec(success(successCallback), error(errorCallback), "PatientPlugin", "getAllPatients", [sessionData]);
    };

    service.getPatientsByName = function (partialName, successCallback, errorCallback) {
        cordova.exec(success(successCallback), error(errorCallback), "PatientPlugin", "getPatientsByName", [sessionData, partialName]);
    };

    service.getPatientByIdentifier = function (identifier, successCallback, errorCallback) {
        cordova.exec(success(successCallback), error(errorCallback), "PatientPlugin", "getPatientByIdentifier", [sessionData, identifier]);
    };

    service.getPatientByUuid = function (patientUuid, successCallback, errorCallback) {
        cordova.exec(success(successCallback), error(errorCallback), "PatientPlugin", "getPatientByUuid", [sessionData, patientUuid]);
    };

    return service;
}(jQuery));

var observationService = (function ($) {
    var service = {};

    service.getObservationsForPatient = function (patientUuid, successCallback, errorCallback) {
        cordova.exec(success(successCallback), error(errorCallback), "ObservationPlugin", "getAllObservations", [sessionData, patientUuid]);
    };

    service.searchObservationsForPatient = function (patientUuid, term, successCallback, errorCallback) {
        cordova.exec(success(successCallback), error(errorCallback), "ObservationPlugin", "getAllObservations", [sessionData, patientUuid, term]);
    };

    service.getObservationByUuid = function (observationUuid, successCallback, errorCallback) {
        cordova.exec(success(successCallback), error(errorCallback), "PatientPlugin", "getPatientByUuid", [sessionData, observationUuid]);
    };

    return service;
}(jQuery));

var userService = (function ($) {
    var service = {};

    service.authenticate = function (username, password, url, successCallback, errorCallback) {
        cordova.exec(success(successCallback), error(errorCallback), "UserPlugin", "authenticate", [sessionData, username, password, url]);
    };

    service.getUserByUsername = function (username, successCallback, errorCallback) {
        cordova.exec(success(successCallback), error(errorCallback), "UserPlugin", "getUserByUsername", [sessionData, username]);
    };

    return service;
}(jQuery));
