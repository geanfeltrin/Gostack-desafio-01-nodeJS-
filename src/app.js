const express = require("express");
const cors = require("cors");
const { uuid } = require('uuidv4')

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  const allRepositories = repositories

  return response.json(allRepositories)
});

app.post("/repositories", (request, response) => {
  const { url, title, techs } = request.body
  
  const repository = {
    id: uuid(),
    url,
    title,
    techs: techs,
    like: 0
  }
  repositories.push(repository)
  
  return response.json(repository)  
});

app.put("/repositories/:id", (request, response) => {
  // TODO
});

app.delete("/repositories/:id", (request, response) => {
  // TODO
});

app.post("/repositories/:id/like", (request, response) => {
  // TODO
});

module.exports = app;
