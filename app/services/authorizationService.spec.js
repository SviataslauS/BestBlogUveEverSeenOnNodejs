const { Auth } = require('./auth');
const { permissions } = require('../utils/enums');


describe('Auth', () => {
  xit('checkPermission should true if user have permission by matching login', () => {
    const user = { login: 'test', email: 'test@mail.com' };

    const isAllowed = Auth.checkUserPermission(permissions.VIEW_PHOTOS, user);

    expect(isAllowed).toBeTruthy();
  });

});
