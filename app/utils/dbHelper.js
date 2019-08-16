const dbHelper = {
    connected: false,
    connect(mongoose, uri) {

        mongoose.connection.on('open', () => {
            console.log(`Connection to Mongo is open. Uri:${uri}`);
        });
        mongoose.connection.on('connected', () => {
            console.log('Connected to Mongo');
            this.connected = true;
        });
        mongoose.connection.on('error', (e) => {
            console.log(`Mongo error! Error: ${e}`);
            this.connected = false;
        });
        mongoose.connection.on('disconnected', () => {
            console.log('Mongo disconnected!');
            this.connected = false;
        });
        
        mongoose.connection.on('close', () => {
            console.log('Connection to Mongo is close');            
        });

        return mongoose.connect(uri, {useNewUrlParser: true});
    },
    isConnected() {
        return this.connected;
    }
};

module.exports = dbHelper;
