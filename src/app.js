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
    likes: 0
  }
  repositories.push(repository)
  
  return response.json(repository)  
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params
  const { url, title, techs, likes } = request.body


  const findRepositoryIndex = repositories.findIndex(repository => repository.id === id)

  if(findRepositoryIndex < 0) {
    return response.status(400).send({error: 'Repository not found'})
  }

  const repository = {
    id,
    url,
    title,
    techs,
    likes: repositories[findRepositoryIndex].likes
   }

   repositories[findRepositoryIndex] = repository

   return response.json(repository)  
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params

  const findRepositoryIndex = repositories.findIndex(repository => repository.id === id)

  if(findRepositoryIndex < 0) {
    return response.status(400).send({error: 'Repository not found'})
  }

  repositories.splice(findRepositoryIndex,1)

  return response.status(204).send()
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params

  const findRepositoryIndex = repositories.findIndex(repository => repository.id === id)

  if(findRepositoryIndex < 0) {
    return response.status(400).send({error: 'Repository not found'})
  }

  repositories[findRepositoryIndex].likes += 1

  return response.json(repositories[findRepositoryIndex])
});

module.exports = app;
