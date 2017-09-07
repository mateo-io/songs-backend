var redisClient = null;
var redisStore = null;

var self = module.exports = {
    initializeRedis: function (client, store) {
        redisClient = client;
        redisStore = store;
        console.log("initialized");
        console.log("client", redisClient);
        console.log("store", redisStore);
    },
    getSessionId: function (handshake) {
        return handshake.signedCookies['the pig is in the bath'];
    },
    get: function (handshake, callback) {
        var sessionId = self.getSessionId(handshake);

        self.getSessionBySessionID(sessionId, function (err, session) {
            if (err) callback(err);
            if (callback != undefined)
                callback(null, session);
        });
    },
    getSessionBySessionID: function (sessionId, callback) {
        redisStore.load(sessionId, function (err, session) {
            if (err) callback(err);
            if (callback != undefined)
                callback(null, session);
        });
    },
    getUserName: function (handshake, callback) {
        self.get(handshake, function (err, session) {
            if (err) callback(err);
            if (session)
                callback(null, session.userName);
            else
                callback(null);
        });
    },
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