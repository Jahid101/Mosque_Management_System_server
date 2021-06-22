const express = require('express')
const nodemailer = require("nodemailer");
const Email = require('email-templates');
const app = express()
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config()

const PORT = process.env.PORT || 9999;

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Welcome (^.^)');
})


app.listen(PORT)



var transport = {
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "357327f20a9771",
    pass: "8f6acd2f14142c"
  }
}

var transporter = nodemailer.createTransport(transport)

transporter.verify((error, success) => {
  if (error) {
    console.log(error);
  } else {
    console.log('All works fine, congratz!');
  }
});



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.9v095.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

client.connect(err => {
  const eventCollection = client.db("mosque").collection("events");
  const announcementCollection = client.db("mosque").collection("announcements");
  const feedbackCollection = client.db("mosque").collection("feedbacks");
  const adminCollection = client.db("mosque").collection("admins");
  const donateCollection = client.db("mosque").collection("donates");
  const additionalCollection = client.db("mosque").collection("additionals");
  const prayerTimeCollection = client.db("mosque").collection("prayerTime");
  const deletedEventCollection = client.db("mosque").collection("deletedEvents");
  const CMCollection = client.db("mosque").collection("committeeMembers");
  const OMCollection = client.db("mosque").collection("otherMembers");
  const WSCollection = client.db("mosque").collection("additionalSpendings");



  app.post('/send', (req, res) => {
    const admin = 'jahidhasananik.official@gmail.com'
    const email = req.body.email
    const message = 'Thanks for the donation. Your donation successfully Received'
console.log(email);

    var mail = {
      from: admin,
      to: email,
      subject: 'Donation Received',

      html: message
    }

    transporter.sendMail(mail, (err, data) => {
      if (err) {
        console.log(err);
        res.json({
          msg: 'fail'
        })
      } else {
        res.json({
          msg: 'success'
        })
      }
    })
  })




  app.post('/addEvent', (req, res) => {
    const newEvent = req.body;
    eventCollection.insertOne(newEvent)
      .then(result => {
        res.send(result.insertedCount > 0)
      })
  })


  app.post('/addCM', (req, res) => {
    const CM = req.body;
    CMCollection.insertOne(CM)
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


  app.post('/addOM', (req, res) => {
    const OM = req.body;
    OMCollection.insertOne(OM)
      .then(result => {
        res.send(result.insertedCount > 0)
      })
  })


  app.post('/addWS', (req, res) => {
    const AS = req.body;
    WSCollection.insertOne(AS)
      .then(result => {
        res.send(result.insertedCount > 0)
      })
  })


  app.post('/addPrayerTime', (req, res) => {
    const prayerTime = req.body;
    prayerTimeCollection.insertOne(prayerTime)
      .then(result => {
        res.send(result.insertedCount > 0)
      })
  })


  app.post('/deletedEvent', (req, res) => {
    const deletedEvent = req.body;
    deletedEventCollection.insertOne(deletedEvent)
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


  app.get('/admin', (req, res) => {
    adminCollection.find()
      .toArray((err, admin) => {
        res.send(admin);
      })
  })


  app.get('/event', (req, res) => {
    eventCollection.find()
      .toArray((err, events) => {
        res.send(events);
      })
  })


  app.get('/CM', (req, res) => {
    CMCollection.find()
      .toArray((err, CM) => {
        res.send(CM);
      })
  })


  app.get('/OM', (req, res) => {
    OMCollection.find()
      .toArray((err, OM) => {
        res.send(OM);
      })
  })


  app.get('/WSList', (req, res) => {
    WSCollection.find()
      .toArray((err, WS) => {
        res.send(WS);
      })
  })


  app.get('/prayerTime', (req, res) => {
    prayerTimeCollection.find()
      .toArray((err, prayerTime) => {
        res.send(prayerTime);
      })
  })


  app.get('/announcement', (req, res) => {
    announcementCollection.find()
      .toArray((err, announcement) => {
        res.send(announcement);
      })
  })


  app.get('/deletedEvent', (req, res) => {
    deletedEventCollection.find()
      .toArray((err, deletedEvent) => {
        res.send(deletedEvent);
      })
  })


  //   app.get('/serviceBooking/:id', (req, res) => {
  //     const id = ObjectID(req.params.id)
  //     serviceCollection.find({ _id: id })
  //       .toArray((err, services) => {
  //         res.send(services[0]);
  //       })
  //   })


  app.get('/donationList/:id', (req, res) => {
    const id = ObjectID(req.params.id)
    donateCollection.find({ _id: id })
      .toArray((err, event) => {
        res.send(event[0]);
      })
  })


  app.get('/showEvent/:id', (req, res) => {
    const id = ObjectID(req.params.id)
    eventCollection.find({ _id: id })
      .toArray((err, event) => {
        res.send(event[0]);
      })
  })


  app.get('/showWork/:id', (req, res) => {
    const id = ObjectID(req.params.id)
    WSCollection.find({ _id: id })
      .toArray((err, work) => {
        res.send(work[0]);
      })
  })


  app.get('/updateAnnouncement/:id', (req, res) => {
    const id = ObjectID(req.params.id)
    announcementCollection.find({ _id: id })
      .toArray((err, announcement) => {
        res.send(announcement[0]);
      })
  })


  app.get('/updateEvent/:id', (req, res) => {
    const id = ObjectID(req.params.id)
    eventCollection.find({ _id: id })
      .toArray((err, event) => {
        res.send(event[0]);
      })
  })


  app.get('/showAnnouncement/:id', (req, res) => {
    const id = ObjectID(req.params.id)
    announcementCollection.find({ _id: id })
      .toArray((err, announcement) => {
        res.send(announcement[0]);
      })
  })


  app.get('/showCM/:id', (req, res) => {
    const id = ObjectID(req.params.id)
    CMCollection.find({ _id: id })
      .toArray((err, CM) => {
        res.send(CM[0]);
      })
  })


  app.get('/showOM/:id', (req, res) => {
    const id = ObjectID(req.params.id)
    OMCollection.find({ _id: id })
      .toArray((err, OM) => {
        res.send(OM[0]);
      })
  })


  app.get('/updateCM/:id', (req, res) => {
    const id = ObjectID(req.params.id)
    CMCollection.find({ _id: id })
      .toArray((err, CM) => {
        res.send(CM[0]);
      })
  })


  app.get('/updateOM/:id', (req, res) => {
    const id = ObjectID(req.params.id)
    OMCollection.find({ _id: id })
      .toArray((err, OM) => {
        res.send(OM[0]);
      })
  })


  app.get('/showCMAdmin/:id', (req, res) => {
    const id = ObjectID(req.params.id)
    adminCollection.find({ _id: id })
      .toArray((err, CMAdmin) => {
        res.send(CMAdmin[0]);
      })
  })


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


  app.patch('/donationList/:id', (req, res) => {
    const id = ObjectID(req.params.id)
    donateCollection.updateOne({ _id: id },
      {
        $set: { status: req.body.status }
      })
      .then(result => {
        res.send(result.modifiedCount > 0)
      })
  })


  app.patch('/paySalary/:id', (req, res) => {
    const id = ObjectID(req.params.id)
    OMCollection.updateOne({ _id: id },
      {
        $set: { salaryStatus: req.body.salaryStatus }
      })
      .then(result => {
        res.send(result.modifiedCount > 0)
      })
  })


  app.patch('/updatePrayerTime/:id', (req, res) => {
    const id = ObjectID(req.params.id)
    prayerTimeCollection.updateOne({ _id: id },
      {
        $set: {
          FAJR: req.body.FAJR,
          ZUHR: req.body.ZUHR,
          ASR: req.body.ASR,
          MAGRIB: req.body.MAGRIB,
          ISHA: req.body.ISHA,
          JUMAH: req.body.JUMAH
        }
      })
      .then(result => {
        res.send(result.modifiedCount > 0)
      })
  })


  app.patch('/updateEvent/:id', (req, res) => {
    const id = ObjectID(req.params.id)
    eventCollection.updateOne({ _id: id },
      {
        $set: {
          name: req.body.name,
          eventDetails: req.body.eventDetails,
          eventBudget: req.body.eventBudget,
          eventStart: req.body.eventStart,
          eventEnd: req.body.eventEnd,
          imageURL: req.body.eventImage
        }
      })
      .then(result => {
        res.send(result.modifiedCount > 0)
      })
  })


  app.patch('/updateCommitteeMember/:id', (req, res) => {
    const id = ObjectID(req.params.id)
    CMCollection.updateOne({ _id: id },
      {
        $set: {
          name: req.body.name,
          email: req.body.email,
          designation: req.body.designation,
          details: req.body.details,
          phone: req.body.phone,
          imageURL: req.body.imageURL
        }
      })
      .then(result => {
        res.send(result.modifiedCount > 0)
      })
  })


  app.patch('/updateOtherMember/:id', (req, res) => {
    const id = ObjectID(req.params.id)
    OMCollection.updateOne({ _id: id },
      {
        $set: {
          name: req.body.name,
          email: req.body.email,
          designation: req.body.designation,
          details: req.body.details,
          phone: req.body.phone,
          salary: req.body.salary,
          imageURL: req.body.imageURL
        }
      })
      .then(result => {
        res.send(result.modifiedCount > 0)
      })
  })


  app.patch('/updateAnnouncement/:id', (req, res) => {
    const id = ObjectID(req.params.id)
    announcementCollection.updateOne({ _id: id },
      {
        $set: { title: req.body.title, announcementDetails: req.body.announcementDetails, imageURL: req.body.announcementImage }
      })
      .then(result => {
        res.send(result.modifiedCount > 0)
      })
  })


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


  app.post('/checkCM', (req, res) => {
    const email = req.body.email;
    CMCollection.find({ email: email })
      .toArray((err, CM) => {
        res.send(CM.length > 0);
      })
  })



  //   app.post('/addOrder', (req, res) => {
  //     const newOrder = req.body;
  //     orderCollection.insertOne(newOrder)
  //       .then(result => {
  //         res.send(result.insertedCount > 0)
  //       })
  //   })



  app.post('/makeDonation', (req, res) => {
    const newDonation = req.body;
    donateCollection.insertOne(newDonation)
      .then(result => {
        res.send(result.insertedCount > 0)
      })
  })


  app.post('/otherAddition', (req, res) => {
    const otherAddition = req.body;
    additionalCollection.insertOne(otherAddition)
      .then(result => {
        res.send(result.insertedCount > 0)
      })
  })


  app.delete('/deleteEvent/:id', (req, res) => {
    const id = ObjectID(req.params.id)
    eventCollection.deleteOne({ _id: id })
      .then(result => {
        res.send(result.deletedCount > 0)
      })
  })


  app.delete('/deleteCM/:id', (req, res) => {
    const id = ObjectID(req.params.id)
    CMCollection.deleteOne({ _id: id })
      .then(result => {
        res.send(result.deletedCount > 0)
      })
  })


  app.delete('/deleteOM/:id', (req, res) => {
    const id = ObjectID(req.params.id)
    OMCollection.deleteOne({ _id: id })
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


  app.get('/donationListName', (req, res) => {
    donateCollection.find({ name: req.query.name })
      .toArray((err, donates) => {
        res.send(donates);
      })
  })


  app.get('/donationListDonateFor', (req, res) => {
    donateCollection.find({ DonationFor: req.query.donateFor })
      .toArray((err, donates) => {
        res.send(donates);
      })
  })


  app.get('/donationYouMade', (req, res) => {
    donateCollection.find({ email: req.query.email })
      .toArray((err, donates) => {
        res.send(donates);
      })
  })


  app.get('/CMAdmin', (req, res) => {
    adminCollection.find({ email: req.query.email })
      .toArray((err, CM) => {
        res.send(CM[0]);
      })
  })


  app.get('/receivedDonation', (req, res) => {
    donateCollection.find({ status: req.query.status })
      .toArray((err, donation) => {
        res.send(donation);
      })
  })


  app.get('/donationTime', (req, res) => {
    donateCollection.find({ donationTime: req.query.donationTime })
      .toArray((err, donation) => {
        res.send(donation);
      })
  })


  app.get('/paidSalary', (req, res) => {
    OMCollection.find({ salaryStatus: req.query.salaryStatus })
      .toArray((err, salary) => {
        res.send(salary);
      })
  })


  // app.get('/orderList', (req, res) => {
  //     orderCollection.find()
  //       .toArray((err, orders) => {
  //         res.send(orders);
  //       })
  //   })


  app.get('/donationList', (req, res) => {
    donateCollection.find()
      .toArray((err, donations) => {
        res.send(donations);
      })
  })


  app.get('/otherAdditionList', (req, res) => {
    additionalCollection.find()
      .toArray((err, addition) => {
        res.send(addition);
      })
  })


});

