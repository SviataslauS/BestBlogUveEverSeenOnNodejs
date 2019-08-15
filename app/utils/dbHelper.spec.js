const expect = require('chai').expect;
const dbHelper = require('./dbHelper');

describe('dbHelper', () =>{
    it('default connected state is false', () => {
        expect(dbHelper.isConnected()).to.equals(false);
    });
});