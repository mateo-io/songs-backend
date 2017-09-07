var redisClient = null;
var redisStore = null;

var self = module.exports = {
    initializeRedis: function (client, store) {
        redisClient = client;
        redisStore = store;
    },
    getSessionBySessionID: (sessionId) => new Promise((resolve, reject) => {
        return redisStore.load(sessionId, function (err, session) {
            if (err) {
               reject(err);
               console.log("REJECTED")
            }
            resolve(session);
        });
    }),
    // TODO CONVERT FROM CALLBACK TO PROMISE
    updateSession: function (session, callback) {
        try {
            session.reload(function () {
                session.touch().save();
                callback(null, session);
            });
        }
        catch (err) {
            callback(err);
        }
    },
    setSessionProperty: function (session, propertyName, propertyValue, callback) {
        session[propertyName] = propertyValue;
        self.updateSession(session, callback);
    }
};