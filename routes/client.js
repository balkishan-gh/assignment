const express = require("express");
const clientController = require("../controllers/client");

const router = express.Router();

router.get("/clients", clientController.getClients);

router.get("/add-client", clientController.getAddClient);

router.post("/add-client", clientController.postAddClient);

router.get("/edit-client/:clientId", clientController.getEditClient);

router.post("/edit-client", clientController.postEditClient);

router.post("/delete-client", clientController.deleteClient);

module.exports = router;
