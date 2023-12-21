const express = require('express');
const router = express.Router();
const queuesController = require('../Controller/queuesController');
const authorizationMiddleware = require("../Middleware/authorization");

router.post('/', authorizationMiddleware(["user", "agent", "admin"])
    , queuesController.createQueues);

router.get('/', authorizationMiddleware(["user", "agent", "admin"])
    , queuesController.getQueues);

router.delete('/', authorizationMiddleware(["agent", "admin"])
    , queuesController.clearQueues);

module.exports = router;
