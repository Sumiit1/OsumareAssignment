const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.json());

//tasks array to store tasks in memory
let tasks = [];

//routes will go here

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

// GET /tasks
app.get('/tasks', (req, res) => {
    res.json(tasks);
  });
  
  // GET /tasks/:id
  app.get('/tasks/:id', (req, res) => {
    const taskId = req.params.id;
    const task = tasks.find(task => task.id === taskId);
  
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
  
    res.json(task);
  });
  
  // POST /tasks
  app.post('/tasks', (req, res) => {
    const { title, description } = req.body;
  
    if (!title || !description) {
      return res.status(400).json({ error: 'Title and description are required' });
    }
  
    const newTask = { id: tasks.length + 1, title, description };
    tasks.push(newTask);
  
    res.status(201).json(newTask);
  });
  
  // PUT /tasks/:id
  app.put('/tasks/:id', (req, res) => {
    const taskId = req.params.id;
    const taskIndex = tasks.findIndex(task => task.id === taskId);
  
    if (taskIndex === -1) {
      return res.status(404).json({ error: 'Task not found' });
    }
  
    const { title, description } = req.body;
  
    if (!title || !description) {
      return res.status(400).json({ error: 'Title and description are required' });
    }
  
    tasks[taskIndex] = { ...tasks[taskIndex], title, description };
  
    res.json(tasks[taskIndex]);
  });
  
  // DELETE /tasks/:id
  app.delete('/tasks/:id', (req, res) => {
    const taskId = req.params.id;
    tasks = tasks.filter(task => task.id !== taskId);
    res.status(204).send();
  });
  
  /**
 * @swagger
 * /tasks:
 *   get:
 *     summary: Get all tasks
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             example:
 *               - id: 1
 *                 title: "Task 1"
 *                 description: "Description 1"
 */
app.get('/tasks', (req, res) => {
    try {
      // Perform any necessary logic here
  
      // Example: If you want to implement pagination
      const page = req.query.page || 1;
      const pageSize = req.query.pageSize || 10;
      const startIndex = (page - 1) * pageSize;
      const endIndex = startIndex + pageSize;
  
      const paginatedTasks = tasks.slice(startIndex, endIndex);
  
      res.json(paginatedTasks);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
