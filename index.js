const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config()

const PORT = process.env.PORT || 9999;

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Welcome (^.^)');
})


app.listen(PORT)


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.9v095.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

client.connect(err => {
  const eventCollection = client.db("mosque").collection("events");
  const announcementCollection = client.db("mosque").collection("announcements");
  const feedbackCollection = client.db("mosque").collection("feedbacks");
  const adminCollection = client.db("mosque").collection("admins");
  const donateCollection = client.db("mosque").collection("donates");


  // app.post('/addService', (req, res) => {
  //   const newService = req.body;
  //   serviceCollection.insertOne(newService)
  //     .then(result => {
  //       res.send(result.insertedCount > 0)
  //     })
  // })

  app.post('/addEvent', (req, res) => {
    const newEvent = req.body;
    eventCollection.insertOne(newEvent)
      .then(result => {
        res.send(result.insertedCount > 0)
      })
  })


  app.post('/addAnnouncement', (req, res) => {
    const announcement = req.body;
    announcementCollection.insertOne(announcement)
      .then(result => {
        res.send(result.insertedCount > 0)
      })
  })


  // app.post('/updatedOrder', (req, res) => {
  //   const updatedOrder = req.body;
  //   updatedOrderCollection.insertOne(updatedOrder)
  //     .then(result => {
  //       res.send(result.insertedCount > 0)
  //     })
  // })


  app.get('/event', (req, res) => {
    eventCollection.find()
      .toArray((err, events) => {
        res.send(events);
      })
  })


  app.get('/announcement', (req, res) => {
    announcementCollection.find()
      .toArray((err, announcement) => {
        res.send(announcement);
      })
  })


//   app.get('/serviceBooking/:id', (req, res) => {
//     const id = ObjectID(req.params.id)
//     serviceCollection.find({ _id: id })
//       .toArray((err, services) => {
//         res.send(services[0]);
//       })
//   })


//   app.patch('/updateOrderList/:id', (req, res) => {
//     const id = ObjectID(req.params.id)
//         orderCollection.updateOne({ _id: id },
//             {
//                 $set: { status: req.body.status }
//             })
//             .then(result => {
//                 res.send(result.modifiedCount > 0 )
//             })
//     })


  app.post('/addFeedback', (req, res) => {
    const newFeedback = req.body;
    feedbackCollection.insertOne(newFeedback)
      .then(result => {
        res.send(result.insertedCount > 0)
      })
  })


  app.get('/feedback', (req, res) => {
    feedbackCollection.find()
      .toArray((err, feedbacks) => {
        res.send(feedbacks);
      })
  })


  app.post('/addAdmin', (req, res) => {
    const newAdmin = req.body;
    adminCollection.insertOne(newAdmin)
      .then(result => {
        res.send(result.insertedCount > 0)
      })
  })



  app.post('/checkAdmin', (req, res) => {
    const email = req.body.email;
    adminCollection.find({ email: email })
        .toArray((err, admins) => {
            res.send(admins.length > 0);
        })
})



//   app.post('/addOrder', (req, res) => {
//     const newOrder = req.body;
//     orderCollection.insertOne(newOrder)
//       .then(result => {
//         res.send(result.insertedCount > 0)
//       })
//   })



  app.delete('/deleteEvent/:id', (req, res) => {
    const id = ObjectID(req.params.id)
    eventCollection.deleteOne({ _id: id })
      .then(result => {
        res.send(result.deletedCount > 0)
      })
  })


  app.delete('/deleteAnnouncement/:id', (req, res) => {
    const id = ObjectID(req.params.id)
    announcementCollection.deleteOne({ _id: id })
      .then(result => {
        res.send(result.deletedCount > 0)
      })
  })


// app.get('/serviceList', (req, res) => {
//     orderCollection.find({ email: req.query.email })
//       .toArray((err, orders) => {
//         res.send(orders);
//       })
//   })


// app.get('/orderList', (req, res) => {
//     orderCollection.find()
//       .toArray((err, orders) => {
//         res.send(orders);
//       })
//   })

  
});
