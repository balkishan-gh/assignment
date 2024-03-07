const Client = require("../models/client");

exports.getClients = (req, res, next) => {
  Client.find()
    .then((clients) => {
      console.log(clients);
      res.render("clients", {
        pageTitle: "Clients Panel",
        clients: clients,
      });
    })
    .catch((err) => {
      res.status(500).json({ message: "Something went wrong." });
    });
};

exports.getAddClient = (req, res, next) => {
  res.render("edit-client", {
    pageTitle: "Create Client",
    editing: false,
  });
};

exports.postAddClient = (req, res, next) => {
  const name = req.body.name;
  const lastName = req.body.lastName;
  const email = req.body.email;
  const phone = req.body.phone;
  const project = req.body.project;

  const client = new Client({
    name,
    lastName,
    email,
    phone,
    project,
  });

  client
    .save()
    .then((result) => {
      console.log("ADDED CLIENT!");
      res.redirect("/clients");
    })
    .catch((err) => {
      res.status(500).json({ message: "Adding client failed." });
    });
};

exports.getEditClient = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect("/clients");
  }
  const clientId = req.params.clientId;
  Client.findById(clientId)
    .then((client) => {
      if (!client) {
        return res.redirect("/clients");
      }
      res.render("edit-client", {
        pageTitle: "Edit Client",
        editing: editMode,
        r_client: client,
      });
    })
    .catch((err) => {
      res.status(500).json({ message: "Something went wrong." });
    });
};

exports.postEditClient = (req, res, next) => {
  const clientId = req.body.clientId;
  const name = req.body.name;
  const lastName = req.body.lastName;
  const email = req.body.email;
  const phone = req.body.phone;
  const project = req.body.project;

  Client.findById(clientId)
    .then((client) => {
      client.name = name;
      client.lastName = lastName;
      client.email = email;
      client.phone = phone;
      client.project = project;
      client.save();
      console.log("EDITED CLIENT!");
      res.redirect("/clients");
    })
    .catch((err) => {
      res.status(500).json({ message: "Editing client failed." });
    });
};

exports.deleteClient = (req, res, next) => {
  const clientId = req.body.clientId;
  Client.deleteOne({ _id: clientId })
    .then((result) => {
      console.log("DELETED CLIENT");
      res.redirect("/clients");
    })
    .catch((err) => {
      res.status(500).json({ message: "Deleting client failed." });
    });
};
