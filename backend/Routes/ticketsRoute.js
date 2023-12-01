const express = require("express");
const router = express.Router();
const ticketsController = require("../Controller/ticketsController");
const authorizationMiddleware = require("../Middleware/authorization");

router.post("/", authorizationMiddleware(["user", "admin"])
  , ticketsController.createTicket
);

router.get("/", authorizationMiddleware(["user", "admin", "agent"])
  , ticketsController.getAllTickets);

router.get("/:id", authorizationMiddleware(["user", "admin", "agent"])
  , ticketsController.getTicketById);

router.put("/:id", authorizationMiddleware(["user", "admin", "agent"])
  , ticketsController.updateTicket);

router.delete("/:id", authorizationMiddleware(["admin", "agent"])
  , ticketsController.deleteTicket);

module.exports = router;