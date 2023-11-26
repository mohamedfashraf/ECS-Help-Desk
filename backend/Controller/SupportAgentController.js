const SupportAgent = require("../Models/supportAgentModelSchema");
const bcrypt = require("bcrypt");
require("dotenv").config();

async function createSupportAgent(req, res) {
  try {
    const { name, email, password, role, specialization, assignedTickets } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const supportAgent = new SupportAgent({
      name,
      email,
      password: hashedPassword,
      role,
      specialization,
      assignedTickets,
    });

    await supportAgent.save();

    const supportAgentResponse = supportAgent.toObject();
    delete supportAgentResponse.password;

    res.status(201).send(supportAgentResponse);
  } catch (error) {
    res.status(400).send(error.message);
  }
}

async function getAllSupportAgents(req, res) {
  try {
    const supportAgents = await SupportAgent.find({});
    res.status(200).send(supportAgents);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
}


async function getSupportAgentById(req, res) {
  try {
    const supportAgent = await SupportAgent.findById(req.params.id);
    if (!supportAgent) {
      return res.status(404).send();
    }
    res.status(200).send(supportAgent);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

async function updateSupportAgent(req, res) {
  try {
    const updates = Object.keys(req.body);
    const supportAgent = await SupportAgent.findById(req.params.id);
    if (!supportAgent) {
      return res.status(404).send();
    }
    updates.forEach((update) => (supportAgent[update] = req.body[update]));
    await supportAgent.save();
    res.status(200).send(supportAgent);
  } catch (error) {
    res.status(400).send(error.message);
  }
}

async function deleteSupportAgent(req, res) {
  try {
    const supportAgent = await SupportAgent.findByIdAndDelete(req.params.id);
    if (!supportAgent) {
      return res.status(404).send();
    }
    res.status(200).send(supportAgent);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

module.exports = {
  createSupportAgent,
  getAllSupportAgents,
  getSupportAgentById,
  updateSupportAgent,
  deleteSupportAgent,
};
