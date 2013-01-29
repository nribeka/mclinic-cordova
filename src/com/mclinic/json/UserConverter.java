/**
 * The contents of this file are subject to the OpenMRS Public License
 * Version 1.0 (the "License"); you may not use this file except in
 * compliance with the License. You may obtain a copy of the License at
 * http://license.openmrs.org
 *
 * Software distributed under the License is distributed on an "AS IS"
 * basis, WITHOUT WARRANTY OF ANY KIND, either express or implied. See the
 * License for the specific language governing rights and limitations
 * under the License.
 *
 * Copyright (C) OpenMRS, LLC.  All Rights Reserved.
 */
package com.mclinic.json;

import com.mclinic.api.model.Patient;
import com.mclinic.api.model.User;
import org.json.JSONException;
import org.json.JSONObject;

public class UserConverter {

    public JSONObject serialize(final User user) throws JSONException {
        JSONObject object = new JSONObject();
        object.put("uuid", user.getUuid());
        object.put("name", user.getName());
        object.put("username", user.getUsername());
        return object;
    }

}
