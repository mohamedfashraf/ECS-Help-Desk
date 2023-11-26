const express = require('express');
const router = express.Router();
const ticketsController = require('../Controller/ticketsController');

router.post('/', ticketsController.createTicket);
router.get('/', ticketsController.getAllTickets);
router.get('/:id', ticketsController.getTicketById);
router.put('/:id', ticketsController.updateTicket);
router.delete('/:id', ticketsController.deleteTicket);

module.exports = router;