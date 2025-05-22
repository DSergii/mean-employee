const express = require('express');
const multer = require('multer');

const router = express.Router();
const User = require('../models/user');

const MIME_TYPE_MAP = {
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/jpg': 'jpg'
}
const imageStore = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error('Invalid mime type');
    if(isValid){
      error = null;
    }
    cb(error, 'backend/images')
  },
  filename: (req, file, cb) => {
    const name = file.originalname.toLowerCase().split(' ').join('-');
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, name + '-' + Date.now() + '.' + ext);
  }
})
// sdrozd psw - XpXe3XxShO3WEZLD

router.post('', multer({storage: imageStore}).single('image'), (req, res) => {
  const url = req.protocol + "://" + req.get("host");
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    imagePath: url + "/images/" + req.file.filename
  });
  user.save()
    .then((response) => {
      res.status(201).json(response);
    })
    .catch((error) => {
      res.status(404).json({ message: 'Not found', error })
    })
})

router.get('', (req, res) => {
  getUsers(res);
});

router.delete('/:id', (req, res) => {
  User.deleteOne({_id: req.params.id})
    .then((response) => {
      res.status(200).json(response)
    })
    .catch((error) => {
      res.status(404).json({ message: 'Not found', error })
    });
});

router.get('/:id', (req, res) => {
  User.findById(req.params.id)
    .then((response) => {
      res.status(200).json(response)
    })
    .catch((error) => {
      res.status(404).json({ message: 'Not found', error })
    });
})

router.put('', multer({ storage: imageStore }).single("image"), (req, res) => {
  const filter = req.body.id;
  let imagePath = req.body.imagePath;
  const { name, email } = req.body;
  if (req.file) {
    const url = req.protocol + "://" + req.get("host");
    imagePath = url + "/images/" + req.file.filename
  }
  const user = new User({
    _id: req.body.id,
    name: req.body.name,
    email: req.body.email,
    imagePath
  })
  User.updateOne({_id: req.body.id}, user)
    .then((response) => {
      res.status(200).json(response)
    })
    .catch((error) => {
      res.status(404).json({ message: 'Not found', error })
    });
})

function getUsers(response) {
  return User
    .find()
    .then(documents => {
      response.status(200).json(documents);
    });
}

module.exports = router;
