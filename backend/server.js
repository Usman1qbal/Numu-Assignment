const cron = require("node-cron");
const http = require("http");
const express = require("express");
const socketio = require("socket.io");
const cors = require("cors");
const mysql = require("mysql");
const axios = require("axios");

const app = express();
const port = process.env.PORT || 3001;
const server = http.createServer(app);
const io = socketio(server);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// DB CONNECTION
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "test_db",
});

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});
///////////////
io.on("connect", (socket) => {
  try {
    socket.emit("/", (req, res) => {
      res.send("connected");
    });

    socket.emit("/get_Employee", (req, res) => {
      con.query("SELECT * FROM tbl_user", function (err, result, fields) {
        if (err) throw err;
        return res.send(result);
      });
    });

    socket.on("/get_Log", (req, res) => {
      con.query(
        "SELECT t.id, t.username, t.email, t.age, t.country, t.city, t.active, t.created_at, t.updated_at, s.posts, s.friends, s.points, s.refresh, d.os, d.appVersion, d.netSpeed, d.battery FROM tbl_user t INNER JOIN tbl_score s INNER JOIN tbl_device d WHERE t.id = s.user_id AND s.user_id = d.user_id AND s.created_at = d.created_at",
        function (err, result, fields) {
          if (err) throw err;
          return io.emit("Battery", res.send(result));
        }
      );
    });

    socket.on("/get_Score", (req, res) => {
      con.query("SELECT * FROM tbl_score", function (err, result, fields) {
        if (err) throw err;
        return io.emit("Score", res.send(result));
      });
    });
  } catch (error) {
    return error;
  }
});

// cron.schedule("*/5 * * * * *", function () {
//   axios
//     .get("https://hidden-caverns-44833.herokuapp.com/")
//     .then(function (response) {
//       // console.log(response.data[1]);
//       response.data.map((single_rec) => {
//         con.query(
//           `SELECT id FROM tbl_user where id=${single_rec.id}`,
//           function (err, result) {
//             if (err) throw err;
//             if (result.length > 0) {
//               console.log("record already added");
//             } else {
//               con.query(
//                 `INSERT INTO tbl_user (id, username, email, age, country, city, active)
//                         VALUES (${single_rec.id}, '${single_rec.username}', '${single_rec.email}', ${single_rec.age}, '${single_rec.country}', '${single_rec.city}', '${single_rec.active}')`,
//                 function (err, result) {
//                   if (err) throw err;
//                   if (result) {
//                     console.log("record inserted", result);
//                   }
//                 }
//               );
//             }

//             con.query(
//               `INSERT INTO tbl_details (user_id, device, score)
//                     VALUES (${single_rec.id}, '${JSON.stringify(
//                 single_rec.device
//               )}', '${JSON.stringify(single_rec.score)}')`,
//               function (err, result) {
//                 if (err) throw err;
//                 if (result) {
//                   console.log("details  inserted", result);
//                 }
//               }
//             );
//           }
//         );
//       });
//     })
//     .catch(function (error) {
//       console.log(error);
//     });
// });

app.get("/", (req, res) => {
  res.send("connected");
});
app.get("/get_Employee", (req,res) =>{
  con.query("SELECT * FROM tbl_user", function (err, result, fields) {
    if (err) throw err;
    return res.send(result);
  });
});


app.get("/get_employee_detail/:id", (req,res) =>{
  con.query(`SELECT t.id, t.username, t.email, t.age, t.country, t.city, t.active, t.created_at, t.updated_at, s.posts, s.friends, s.points, s.refresh, d.os, d.appVersion, d.netSpeed, d.battery FROM tbl_user t INNER JOIN tbl_score s INNER JOIN tbl_device d WHERE t.id=${req.params.id} AND t.id = s.user_id AND s.user_id = d.user_id AND s.created_at = d.created_at`, function (err, result) {
    if (err) throw err;
    return res.send(result);
  });
});

app.get("/get_employee_detail", (req,res) =>{
  con.query(`SELECT t.id, t.username, t.email, t.age, t.country, t.city, t.active, t.created_at, t.updated_at, s.posts, s.friends, s.points, s.refresh, d.os, d.appVersion, d.netSpeed, d.battery FROM tbl_user t INNER JOIN tbl_score s INNER JOIN tbl_device d WHERE t.id = s.user_id AND s.user_id = d.user_id AND s.created_at = d.created_at`, function (err, result) {
    if (err) throw err;
    return res.send(result);
  });
});

server.listen(port, () => {
  console.log(`listening to the server at port: ${port}`);
});
