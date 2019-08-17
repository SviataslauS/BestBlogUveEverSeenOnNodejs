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
    
    it('connect should add subscription to connected', () => {
        const testUrl = 'testUrl';
        
        dbHelper.connect(fakeMongoose, testUrl);

        const connectedArgs = fakeMongoose.connection.on.args.filter(a => a[0] == "connected");

        expect(connectedArgs).to.be.ok;
    });
    
    it('should set connected prop to true after connection', () => {
        dbHelper.connect(fakeMongoose, "testUrl");
        const connectedCallback = fakeMongoose.connection.on.args.filter(a => a[0] == "connected")[0][1];

        connectedCallback();

        expect(dbHelper.isConnected()).to.equals(true);
    });
    
    it('connect should add subscription to connected', () => {
        const testUrl = 'testUrl';
        
        dbHelper.connect(fakeMongoose, testUrl);

        const connectedArgs = fakeMongoose.connection.on.args.filter(a => a[0] == "connected");

        expect(connectedArgs).to.be.ok;
    });
    
    it('should set connected prop to false after disconnection', () => {
        dbHelper.connect(fakeMongoose, "testUrl");
        const disconnectedCallback = fakeMongoose.connection.on.args.filter(a => a[0] == "disconnected")[0][1];

        disconnectedCallback();

        expect(dbHelper.isConnected()).to.equals(false);
    });
    
    it('should set connected prop to false after error', () => {
        dbHelper.connect(fakeMongoose, "testUrl");
        const disconnectedCallback = fakeMongoose.connection.on.args.filter(a => a[0] == "error")[0][1];

        disconnectedCallback();

        expect(dbHelper.isConnected()).to.equals(false);
    });
});