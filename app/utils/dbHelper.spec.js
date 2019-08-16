const dbHelper = require('./dbHelper');
 
describe('dbHelper', () =>{
    const fakeMongoose = {
         connection: { on: sinon.spy() },
         connect: sinon.spy(), 
        };

    afterEach(()=> {
        fakeMongoose.connection.on.resetHistory();
        fakeMongoose.connect.resetHistory();
    });

    it('default connected state is false', () => {
        expect(dbHelper.isConnected()).to.equals(false);
    });
    
    it('connect should invoke connect on mongoose correctly', () => {
        const testUrl = 'testUrl';
        dbHelper.connect(fakeMongoose, testUrl);

        expect(fakeMongoose.connect).to.have.been.calledWithExactly(testUrl, {useNewUrlParser: true});
    });
});