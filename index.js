// CRUD com Express

const express = require('express');
const fs = require('fs');
const jsonFile = './surfers.json';
const writeSurfer = require('./helpers/writeFile');
const { nameValidation } = require('./middlewares/Validations.js');

const app = express();
app.use(express.json());

const HTTP_OK_STATUS = 200;
const PORT = '3001';
const surfersList = JSON.parse(fs.readFileSync(jsonFile));

// CREATE FILE
app.post('/createSurfer', nameValidation, async (req, res) => {
  const { Name, Age } = req.body;
  const newSurfer = { id: surfersList.length + 1, Name, Age };

  surfersList.push(newSurfer);
  await writeSurfer(surfersList);
  
  return res.status(201).json(newSurfer)
});

// READ FILE
app.get('/readSurfers', (_req, res) => {
  res.status(HTTP_OK_STATUS).json(surfersList);
});

// UPDATE FILE
app.put('/updateSurfer/:id', nameValidation, async (req, res) => {
  const { id } = req.params;
  const { Name, Age } = req.body;
  const surferIndex = surfersList.findIndex((surfer) => surfer.id === Number(id));
  const surferEdit = { ...surfersList[surferIndex], Name, Age };
  surfersList[surferIndex] = surferEdit;

  await writeSurfer(surfersList);

  return res.status(200).json(surferEdit);
});

// DELETE FILE
app.delete('/deleteSurfer/:id', nameValidation, (req, res) => {
  const { id } = req.params;
  const surferIndex = surfersList.findIndex((surfer) => surfer.id === Number(id));
  surfersList.splice(surferIndex, 1);

  return res.status(200).json({ message: `ID ${id} Deleted sucessfully` });
});

app.listen(PORT, () => console.log('Ouvindo na porta 3001'));
