const _ = require('lodash');
const { getEnvVariables }  = require('../utils/envVariablesHelper');
const { permissions } = require('../utils/enums');


class Auth {
    get allPermissions() {
        if (!this._permissions) {
            this._permissions = this.getAllPermissions();
        }

        return this._permissions;
    }

    checkUserPermission(permission, user) {
        if (!user) {
            throw Error(`User have to be passed for check his permissions`);
        }

        const permToCheck = this.allPermissions[permission];// guess that there is only one rule for permission
        if(!permToCheck) {
            throw Error(`There is no permissons for passed ${permission} rule`);
        }
        if(!permToCheck.field ||  !permToCheck.match) {
            throw Error(`${permission} permisson dont have field or match prop`);
        }

        const userField = user[permToCheck.field];
        const isAllowed = !!(userField && (new RegExp(permToCheck.match)).test(userField));

        return isAllowed;
    }

    getAllPermissions() {
        const envVarPrefix = 'BLOG_AUTH_';
        const envVariables = getEnvVariables(); // {'ENV_VAR'=value}
        const permissionVariables = Object.keys(envVariables).filter(function(k) {
            return k.indexOf(envVarPrefix) == 0;
        })
        .reduce(function(newData, envVariableName) {
            let key = envVariableName.replace(envVarPrefix, '');
            Object.keys(permissions).forEach(function(permissionName) {
                if(key.indexOf(permissionName) == 0) {
                    let permPropName = key.replace(permissionName + '_', '').toLowerCase();
                    if(permPropName !== 'field' && permPropName !== 'match'){
                        throw Error(`Invalid ending of env variable=${envVariableName}`);
                    }

                    if(!newData[permissionName]){
                        newData[permissionName] = {};
                    }

                    newData[permissionName][permPropName] = envVariables[envVariableName];
                }
            });
            return newData;
        }, {});
    
        return permissionVariables;
    }
}

module.exports = { Auth: new Auth() };
