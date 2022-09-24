const Joi = require("joi");
const express = require("express");
const func = require("joi/lib/types/func");
const app = express();

app.use(express.json());

const port = process.env.PORT || 3000;

const courses = [
  { id: 1, name: "course1" },
  { id: 2, name: "course2" },
  { id: 3, name: "course3" },
];
// Get Courses
app.get("/", (req, res) => {
  res.send("Hello World !!!");
});
app.get("/api/courses", (req, res) => {
  res.send(courses);
});
// Get 1 Course
app.get("/api/courses/:id", (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course)
    res.status(404).send("The course with the given ID was not found"); // 404
  res.status(200).send(course);
});

// Create
app.post("/api/courses", (req, res) => {
  // if(req.body.name || req.body.length < 3) {
  //     // 404 bad request
  //     res.status(400).send('Name is requered and should be 3 characters.')
  //     return;
  // }
  const course = {
    id: courses.length + 1,
    name: req.body.name,
  };
  courses.push(course);
  res.send(course);
});
// Update;
app.put("/api/courses/:id", (req, res) => {
  //Look up for course
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course)
    res.status(404).send("The course with the given ID was not found"); // 404

  // if not exisisting, return 404
  // Validate
//   const schema = {
//     name: Joi.string().min(3).required()
//   };
//   const result = Joi.valid(req.body, schema);
//   if (result.error) {
//     res.status(400).send(result.error.details[0].message);
//     return;
//   }
  // If Invalid, return 400 -bad resquest \
  // Update 
  course.name = req.body.name
 
  // Return Update course
  res.send(course)
});

app.listen(port, () => console.log(`Listening on port ${port}...`));
