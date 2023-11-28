const express = require("express");
const router = express.Router();
const ticketsController = require("../Controller/ticketsController");
const authorizationMiddleware = require("../Middleware/authorization");

router.post(
  "/",
  authorizationMiddleware(["user"]),
  ticketsController.createTicket
);
router.get("/", ticketsController.getAllTickets);
router.get("/:id", ticketsController.getTicketById);
router.put("/:id",authorizationMiddleware(["supportAgent"]), ticketsController.updateTicket);
router.delete("/:id", ticketsController.deleteTicket);

module.exports = router;
