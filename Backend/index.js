var express = require('express');
var app = express();
var mongo = require('mongodb');
var ObjectId = require('mongodb').ObjectID;

app.use(express.json());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, authorization");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
var dburl = "mongodb://localhost:27017/mVitals";
const dbname = "mVitals";
const doctorCollection = "doctor";
const patientCollection = "patient";
const appointmentCollection = "appointment";

/*MongoClient.connect(dburl, function (err, db) {
  if (err) throw err;
  console.log("Database created!");
  db.close();
});

MongoClient.connect(url, function (err, db) {
  if (err) throw err;
  var dbo = db.db(dbname);
  dbo.createCollection(doctorCollection, function (err, res) {
    if (err) throw err;
    console.log("Collection 1 created!");
    db.close();
  });
});

MongoClient.connect(url, function (err, db) {
  if (err) throw err;
  var dbo = db.db(dbname);
  dbo.createCollection(patientCollection, function (err, res) {
    if (err) throw err;
    console.log("Collection created!");
    db.close();
  });
});

MongoClient.connect(url, function (err, db) {
  if (err) throw err;
  var dbo = db.db(dbname);
  dbo.createCollection(appointmentCollection, function (err, res) {
    if (err) throw err;
    console.log("Collection created!");
    db.close();
  });
});*/

app.post('/setappointment/patient', (req, res) => {
  if (req.query.docID && req.query.docID != undefined
    && req.query.patientid && req.query.patientid != undefined
    && req.query.datetime && req.query.datetime != undefined) {


    let queryParams = { docID: ObjectId(req.query.docID), patientid: ObjectId(req.query.patientid) };

    MongoClient.connect(url, function (err, db) {
      if (err) throw err;
      var dbo = db.db(dbname);
      dbo.collection(appointmentCollection).findOne(queryParams, function (err, result) {
        if (err) {
          res.status(500).send(err);
        }
        else {
          if (result) {
            //Update query
            var dbo = db.db(dbname);
            var newvalues = { $set: { datetime: req.query.datetime } };
            dbo.collection(appointmentCollection).updateOne(queryParams, newvalues, function (err, result) {
              db.close();
              if (err) {
                res.status(500).send(err);
              }
              else {
                res.status(200).send(result);
              }
            });
          }
          else {
            MongoClient.connect(url, function (err, db) {
              if (err) throw err;
              var dbo = db.db(dbname);
              var myobj = {
                docID: ObjectId(req.query.docID),
                patientid: ObjectId(req.query.patientid),
                datetime: req.query.datetime
              };
              dbo.collection(appointmentCollection).insertOne(myobj, function (err, result) {
                db.close();
                if (err) {
                  res.status(500).send(err);
                }
                else {
                  res.status(200).send(result["ops"][0]);
                }
              });
            });
          }

        }
        db.close();
      });
    });

  }
  else {
    res.status(400).send();
  }
});

app.get('/appointments/', (req, res) => {
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db(dbname);
    var query = {};
    dbo.collection(appointmentCollection).find(query).toArray(function (err, result) {
      db.close();
      if (err) {
        res.status(500).send(err);
      }
      else {
        res.status(200).send(result);
      }
    });
  });
});

app.post('/register/patient', (req, res) => {
  if (req.query.email && req.query.email != undefined
    && req.query.password && req.query.password != undefined
    && req.query.username && req.query.username != undefined
    && req.query.firstname && req.query.firstname != undefined
    && req.query.lastname && req.query.lastname != undefined
    && req.query.age && req.query.age != undefined
    && req.query.gender && req.query.gender != undefined
    && req.query.address && req.query.address != undefined
    && req.query.contactno && req.query.contactno != undefined
    && req.query.deviceid && req.query.deviceid != undefined
    && req.query.docID && req.query.docID != undefined) {

    MongoClient.connect(url, function (err, db) {
      if (err) throw err;
      var dbo = db.db(dbname);
      dbo.collection(patientCollection).findOne({ username: req.query.username }, function (err, result) {
        if (err) {
          res.status(500).send(err);
        }
        else {
          if (result) {
            res.status(400).send();
          }
          else {
            MongoClient.connect(url, function (err, db) {
              if (err) throw err;
              var dbo = db.db(dbname);
              var myobj = {
                email: req.query.email,
                password: req.query.password,
                username: req.query.username,
                firstname: req.query.firstname,
                lastname: req.query.lastname,
                age: req.query.age,
                gender: req.query.gender,
                address: req.query.address,
                contactno: req.query.contactno,
                deviceid: req.query.deviceid,
                docID: req.query.docID
              };
              dbo.collection(patientCollection).insertOne(myobj, function (err, result) {
                db.close();
                if (err) {
                  res.status(500).send(err);
                }
                else {
                  res.status(200).send(result["ops"][0]);
                }
              });
            });
          }

        }
        db.close();
      });
    });

  }
  else {
    res.status(400).send();
  }
});

app.post('/register/doctor', (req, res) => {
  if (req.query.email && req.query.email != undefined
    && req.query.password && req.query.password != undefined
    && req.query.username && req.query.username != undefined
    && req.query.firstname && req.query.firstname != undefined
    && req.query.lastname && req.query.lastname != undefined
    && req.query.degree && req.query.degree != undefined
    && req.query.gender && req.query.gender != undefined
    && req.query.phone && req.query.phone != undefined) {

    MongoClient.connect(url, function (err, db) {
      if (err) throw err;
      var dbo = db.db(dbname);
      dbo.collection(doctorCollection).findOne({ username: req.query.username }, function (err, result) {
        if (err) {
          res.status(500).send(err);
        }
        else {
          if (result) {
            res.status(400).send();
          }
          else {
            MongoClient.connect(url, function (err, db) {
              if (err) throw err;
              var dbo = db.db(dbname);
              var myobj = {
                email: req.query.email,
                password: req.query.password,
                username: req.query.username,
                firstname: req.query.firstname,
                lastname: req.query.lastname,
                degree: req.query.degree,
                gender: req.query.gender,
                phone: req.query.phone
              };
              dbo.collection(doctorCollection).insertOne(myobj, function (err, result) {
                db.close();
                if (err) {
                  res.status(500).send(err);
                }
                else {
                  res.status(200).send(result["ops"][0]);
                }
              });
            });
          }

        }
        db.close();
      });
    });

  }
  else {
    res.status(400).send();
  }
});

app.get('/patients/', (req, res) => {
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db(dbname);
    var query = {};
    dbo.collection(patientCollection).find(query).toArray(function (err, result) {
      db.close();
      if (err) {
        res.status(500).send(err);
      }
      else {
        res.status(200).send(result);
      }
    });
  });
});

app.get('/doctors/', (req, res) => {
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db(dbname);
    var query = {};
    dbo.collection(doctorCollection).find(query).toArray(function (err, result) {
      db.close();
      if (err) {
        res.status(500).send(err);
      }
      else {
        res.status(200).send(result);
      }
    });
  });
});

app.get('/doctor/login', (req, res) => {
  if (req.query.email && req.query.password) {
    MongoClient.connect(url, function (err, db) {
      if (err) throw err;
      var dbo = db.db(dbname);
      dbo.collection(doctorCollection).findOne({ email: req.query.email, password: req.query.password }, function (err, result) {
        if (err) {
          res.status(500).send(err);
        }
        else {
          if (result) {
            res.send(result);
          }
          else {
            res.status(404).send();
          }
        }
      });
    });
  }
  else {
    res.status(400).send();
  }
});

app.get('/patient/login', (req, res) => {
  if (req.query.email && req.query.password) {
    MongoClient.connect(url, function (err, db) {
      if (err) throw err;
      var dbo = db.db(dbname);
      dbo.collection(patientCollection).findOne({ email: req.query.email, password: req.query.password }, function (err, result) {
        if (err) {
          res.status(500).send(err);
        }
        else {
          if (result) {
            res.send(result);
          }
          else {
            res.status(404).send();
          }
        }
      });
    });
  }
  else {
    res.status(400).send();
  }
});

app.put('/doctor/:id', (req, res) => {
  var updatedObj = {};
  const doctorid = req.params.id;

  if (req.query.username && req.query.username != undefined) {
    updatedObj["username"] = req.query.username;
  }
  if (req.query.email && req.query.email != undefined) {
    updatedObj["email"] = req.query.email;
  }
  if (req.query.firstname && req.query.firstname != undefined) {
    updatedObj["firstname"] = req.query.firstname;
  }
  if (req.query.lastname && req.query.lastname != undefined) {
    updatedObj["lastname"] = req.query.lastname;
  }
  if (req.query.qualification && req.query.qualification != undefined) {
    updatedObj["qualification"] = req.query.qualification;
  }
  if (req.query.contactno && req.query.contactno != undefined) {
    updatedObj["contactno"] = req.query.contactno;
  }
  if (req.query.password && req.query.password != undefined) {
    updatedObj["password"] = req.query.password;
  }

  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db(dbname);
    var myquery = { _id: ObjectId(doctorid) };
    var newvalues = { $set: updatedObj };
    dbo.collection(doctorCollection).updateOne(myquery, newvalues, function (err, result) {
      db.close();
      if (err) {
        res.status(500).send(err);
      }
      else {
        res.status(200).send(result);
      }
    });
  });
});

app.delete('/patients/:id', (req, res) => {
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db(dbname);
    var myquery = { _id: ObjectId(req.params.id) };
    dbo.collection(patientCollection).deleteOne(myquery, function (err, obj) {
      db.close();
      if (err) {
        res.status(500).send(err);
      }
      else {
        res.status(200).send();
      }
    });
  });
});

app.delete('/appointment/:id', (req, res) => {
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db(dbname);
    var myquery = { _id: ObjectId(req.params.id) };
    dbo.collection(appointmentCollection).deleteOne(myquery, function (err, obj) {
      db.close();
      if (err) {
        res.status(500).send(err);
      }
      else {
        res.status(200).send();
      }
    });
  });
});


app.put('/patient/:id/docID', (req, res) => {
  if (req.query.docID && req.query.docID != undefined) {
    MongoClient.connect(url, function (err, db) {
      if (err) throw err;
      var dbo = db.db(dbname);
      dbo.collection(patientCollection).findOne({ _id: ObjectId(req.params.id) }, function (err, result) {
        if (err) {
          res.status(500).send(err);
        }
        else {
          if (result) {
            if (err) throw err;
            var dbo = db.db(dbname);
            var myquery = { _id: ObjectId(req.params.id) };
            var newvalues = { $set: { docID: ObjectId(req.query.docID) } };
            dbo.collection(patientCollection).updateOne(myquery, newvalues, function (err, result) {
              db.close();
              if (err) {
                res.status(500).send(err);
              }
              else {
                res.status(200).send();
              }
            });
          }
          else {
            if (err) throw err;
            res.status(400).send();
          }
        }
        db.close();
      });
    });
  }
  else {
    res.status(400).send();
  }
});


app.listen(8080, () => { console.log("App listening at 8080") });