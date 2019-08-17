const dbSetup = require('./dbSetup');
const dbHelper = require('../utils/dbHelper');
const envHelper = require('../utils/envVariablesHelper');
const mongoose = require('mongoose');
const seeds = require('./seeds');
 
describe('dbSetup', () =>{
    afterEach(() => {
        sinon.restore();
    });

    it('should invoke connect dbHelper correctly', () => {
        const testConnStr = 'testConnStr';
        sinon.stub(envHelper, 'getEnvVariables').callsFake(() => ({
            'MONGO_CONNECTION_STRING': testConnStr,
        }));
        const connectStub = sinon.stub(dbHelper, 'connect');
        sinon.stub(seeds, 'run').callsFake(() => {});
        
        dbSetup();
        
        expect(connectStub).to.have.been.calledWithExactly(mongoose, testConnStr);
    });
    
    it('should invoke seeds', () => {
        const testConnStr = 'testConnStr';
        sinon.stub(envHelper, 'getEnvVariables').callsFake(() => ({
            'MONGO_CONNECTION_STRING': testConnStr,
        }));
        sinon.stub(dbHelper, 'connect');
        const runStub = sinon.stub(seeds, 'run');
        
        dbSetup();
        
        expect(runStub).to.have.been.called;
    });
});