const { getEnvVariables }  = require('../utils/envVariablesHelper');
const { permissions: permissionsEnum } = require('../utils/enums');


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
        const envVariables = getEnvVariables();
        const permissionVariables = Object.keys(envVariables).filter(function(k) {
            return k.indexOf(envVarPrefix) == 0;
        })
        .reduce(function(parsedPermVariables, envVariableNameWithPrefix) {
            const envVariableName = envVariableNameWithPrefix.replace(envVarPrefix, '');
            Object.keys(permissionsEnum).forEach(function(permissionName) {
                if(envVariableName.indexOf(permissionName) == 0) {
                    const permPropName = envVariableName.replace(permissionName + '_', '').toLowerCase();
                    if(permPropName !== 'field' && permPropName !== 'match'){
                        throw Error(`Invalid ending of env variable=${envVariableNameWithPrefix}`);
                    }

                    if(!parsedPermVariables[permissionName]){
                        parsedPermVariables[permissionName] = {};
                    }

                    parsedPermVariables[permissionName][permPropName] = envVariables[envVariableNameWithPrefix];
                }
            });
            return parsedPermVariables;
        }, {});
    
        return permissionVariables;
    }
}

module.exports = { Auth: new Auth() };
