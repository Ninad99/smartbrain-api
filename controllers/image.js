const Clarifai = require('clarifai');

const app = new Clarifai.App({
  apiKey: 'f29c0b3d4d1f4905a9e0f56976c87e22'
 });

const handleAPICall = (req, res) => {
  app.models.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
  .then(data => {
    res.json(data);
  })
  .catch(err => res.status(400).json('Unable to work with API'));
}

const handleImage = (req, res, db) => {
  const { id } = req.body;
  db('users').where('id', '=', id)
  .increment('entries', 1)
  .returning('entries')
  .then(entries => {
    res.json(entries[0]);
  })
  .catch(err => res.status(400).json("Unable to get entries"));
}

module.exports = {
  handleImage: handleImage,
  handleAPICall: handleAPICall
};