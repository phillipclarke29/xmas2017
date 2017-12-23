const express = require('express');

const app = express();
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const issuefunctions = require('./issue.js');

const path = require('path');
ObjectId = require('mongodb').ObjectID,

app.use(express.static('static'));
app.use(bodyParser.json());


app.get('/api/issues', (req, res) => {
  const filter = {};

  if (req.query.status) filter.status = req.query.status;
  if (req.query.country) filter.country = req.query.country;
  if (req.query.type) filter.type = req.query.type;

  db.collection('issues').find(filter).toArray()
    .then((issues) => {
      const metadata = { total_count: issues.length };
      res.json({ _metadata: metadata, records: issues });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ message: `Internal Server Error: ${error}` });
    });
});


app.get('/api/issues/:id', (req, res) => {
  let issueId;
  try {
    issueId = new ObjectId(req.params.id);
  } catch (error) {
    res.status(422).json({ message: `Invalid issue ID format: ${error}` });
    return;
  }

  db.collection('issues').find({ _id: issueId }).limit(1)
  .next()
  .then(issue => {
    if (!issue) res.status(404).json({ message: `No such issue: ${issueId}` });
    else res.json(issue);
  })
  .catch(error => {
    console.log(error);
    res.status(500).json({ message: `Internal Server Error: ${error}` });
  });
});


const validIssueStatus = {
  New: true,
  Open: true,
  Assigned: true,
  Fixed: true,
  Verified: true,
  Closed: true,
};

const validIssueCountry = {
  UK: true,
  England: true,
  Scotland: true,
  Wales: true,
  NorthernIreland: true,
  Crown: true,
  Overseas: true,
};

const validIssueType = {
  Central: true,
  Local: true,
  Police: true,
  NHS: true,
  Edu: true,
  Other: true,
  Fire: true,
};

const issueFieldType = {
  status: 'required',
  organisation: 'required',
  created: 'required',
  completionDate: 'optional',
  type: 'required',
  country: 'required',

};

function validateIssueType(issue) {
  if (!validIssueType[issue.type]) { return `${issue.type} is not a valid type.`; }
}

function validateIssueCountry(issue) {
  if (!validIssueCountry[issue.country]) { return `${issue.country} is not a valid Country.`; }
}

function validateIssueStatus(issue) {
  if (!validIssueStatus[issue.status]) { return `${issue.status} is not a valid status.`; }
}

app.post('/api/issues', (req, res) => {
  const newIssue = req.body;
  newIssue.created = new Date();
  if (!newIssue.status) { newIssue.status = 'New'; }

  const err = (validateIssueCountry(newIssue) || validateIssueType(newIssue) || validateIssueStatus(newIssue));
  console.log(err);

  if (err) {
    res.status(422).json({ message: `Invalid request: ${err}` });
  } else {
    db.collection('issues').insertOne(newIssue).then(result =>
      db.collection('issues').find({ _id: result.insertedId }).limit(1).next()).then((newIssue) => {
      res.json(newIssue);
    })
      .catch((error) => {
        console.log(error);
        res.status(500).json({ message: `Internal Server Error: ${error}` });
      });
  }
});

app.post('/api/issues/search', (req, res) => {
  const searchResults = {};
  console.log(req.query.text);
    db.collection('issues').find({
      "$text": {
        "$search": req.query.text
      }
    }).toArray(function(err, results){
      console.log(results);
      res.json(results);
    })
});

app.put('/api/issues/:id', (req, res) => {
  let issueId;
  console.log(req.body);
  try {
    issueId = new ObjectId(req.params.id);
  } catch (error) {
    res.status(422).json({ message: `Invalid issue ID format: ${error}` });
    return;
  }

  const issue = req.body;
  delete issue._id;

  const err = issuefunctions.validateIssue(issue);
  if (err) {
    res.status(422).json({ message: `Invalid request: ${err}` });
    return;
  }

  db.collection('issues').updateOne({ _id: issueId }, issuefunctions.convertIssue(issue)).then(() =>
    db.collection('issues').find({ _id: issueId }).limit(1)
    .next()
  )
  .then(savedIssue => {
    res.json(savedIssue);
  })
  .catch(error => {
    console.log(error);
    res.status(500).json({ message: `Internal Server Error: ${error}` });
  });
});


app.delete(`/api/issues/:id`, (req, res) => {
  console.log(req.params.id);
  let issueId;
  try {
    issueId = new ObjectId(req.params.id);
  } catch (error) {
    res.status(422).json({message: `Invalid Issue ID format: ${error}`});
    return
  }
 db.collection('issues').deleteOne({_id: issueId}).then((deleteResult) =>{
   if (deleteResult.result.n ===1) res.json({status: 'ok'});
   else res.json({status: `warning: object not found`});
 })
 .catch(error =>{
   console.log(error);
   res.status(500).json({message: `internal server error: ${error}`});
 });
})


app.get('*', (req, res) => {
  res.sendFile(path.resolve('static/index.html'));
});


let db;
MongoClient.connect('mongodb://localhost/issueTracker').then((connection) => {
  db = connection;
  app.listen(3003, () => {
    console.log('App started on port 3003');
  });
}).catch((error) => {
  console.log('ERROR:', error);
});
