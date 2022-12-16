const express = require("express");

const app = express();
app.use(express.json());

const data = [
  {
    id: 1,
    name: "John Doe",
    age: 32,
  },
  {
    id: 2,
    name: "Jane Doe",
    age: 30,
  },
  {
    id: 3,
    name: "John Smith",
    age: 25,
  },
];

app.get("/", (req, res) => {
  res.send("Michelle");
});

// // This route gets *ALL* the users
app.get("/api/users", (req, res) => {
  res.json(data);
});

// app.get("/api/users/:id", (req, res) => {
//   res.send(req.params.id);
// });

app.post("/api/users", (req, res) => {
  // if(!req.body.name){
  //   res.status(400).send("name required")
  //   return
  // }
  const user = {
    id: data.length + 1,
    name: req.body.name,
    age: req.body.age,
  };
  data.push(user);
  res.send(data);
});

app.get("/api/users/:id", (req, res) => {
  const user = data.find((c) => c.id === parseInt(req.params.id));
  if (!user) return res.status(404).send("not found");
  res.send(user);
});

app.put("/api/users/:id", (req, res) => {
  const user = data.find((c) => c.id === parseInt(req.params.id));
  if (!user) return res.status(404).send("not found");
  user.name = req.body.name;
  user.age = req.body.age;
  res.send(user);
});

app.delete("/api/users/:id", (req, res) => {
  const user = data.find((c) => c.id === parseInt(req.params.id));
  if (!user) return res.status(404).send("not found");
  const index = data.indexOf(user);
  data.splice(index, 1);
  res.send(user);
});

// Add a new route to get a *SINGLE* user (you can use either path param or query param)
// /api/users/1      <-- path param (req.params.id)
// /api/users?id=1   <-- query param (req.query.id) If you go with query param, just modify the existing endpoint above instead of creating a new endpoint

// BONUS QUESTION - Add routes to implement all the CRUD operations (POST, PUT, DELETE)

app.listen(3000, () => {
  console.log("Example app listening on port 3000!");
});
