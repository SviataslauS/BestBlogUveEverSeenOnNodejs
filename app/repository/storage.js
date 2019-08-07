
let mongoInstance;
const setDatabaseInstance = (mongo) => {
  mongoInstance = mongo;
};
const getById = (id, model, cb) => {
    const qwe = model.findById(id, cb)
        .then(() => {
            console.log(`then`);
        });
    qwe.lean().exec(cb);
    console.log('********************storagE');
    console.log(qwe);
};

module.exports = {
    getById
};
