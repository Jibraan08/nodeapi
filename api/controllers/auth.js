const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const secKey = 'secret';
const users = require('../model/model');

//signup
const signup = ((req,res)=>{
    console.log("req.body=>", req.body);
    
    const user = new users()
    user.name = req.body.name;
    user.email = req.body.email;
    user.password = req.body.password;

    user.save().then(res.json({
        message:"user careated",
        user: user
    })).catch(res.json({
        message:'not created user'
    }))
})

//login
const login = ((req, res) => {
    const { email,password } = req.body;
    const user = users.find((user) => user.email === email && user.password === password);
    if (!user) {
        return res.status(401).send("Invalid username or password");
    } else {
        const token = jwt.sign({ email }, secKey);
        return res.send({
            message: "Login successful",
            token,
        });
    }
});

//getdata
const fetchdata = async(req,res)=>{
    const allUser = await users.find()
    try{
        return res.send(allUser)
    }catch(error){
        return res.status(500).json({
            message: error
    })
    }
}

//update
// updateUser
// const updateUser = async (req, res) => {
//   try {
//     const { email } = req.body;
//     const updatedUser = await users.updateOne({ email: req.email }, { email }, { new: true });
//     if (updatedUser) {
//       const token = jWtoken.sign({ email }, sec);
//       return res.status(200).json({
//         message: "updated successfully !",
//         token
//       });
//     } else {
//       return res.status(404).json({
//         message: "not successful!",
//       });
//     }
//   } catch (err) {
//     console.error(err);
//     return res.status(500).json({
//       message: "an error occurred",
//     });
//   }
// };
const updateUser = async (req, res) => {
  const { email } = req.body;
  const user = await users.findOne({ email:req.email },{ email },{ new:true });

  if (!user) {
    res.status(400).json({ error: 'User not found' });
    return;
  }

  const updatedUser = await users.updateOne({ email }, {
    $set: { email }
  });

  res.status(200).json(updatedUser);
}


//delete
  const deleteDirectory =async (req, res) => {
    const user = await users.find({email:req.body.email});
    if (user) {
      await users.deleteOne();
      return res.status(200).json('delete successfully');
    }else{
      return res.status(400).json('not delete');
  }
}
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "./uploads/"), // cb -> callback
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  },
});

const handleMultipartData = multer({
  storage,
  limits: { fileSize: 1000000 * 5 },
}).single("image");

const postImage= (async (req, res) => {
  handleMultipartData(req, res, async (err) => {
    if (err) {
      res.json({ msgs: err.message });
    }

    res.json({
      body: req.body,
      file: req.file,
    });
  });
});

//image upload

const postImages = (req, res) => {
  console.log(req.body, 'data in body')
  if (!req.file) {
    return res.status(404).json({
      message: "Post your image",
    });
  } 
  users.findOne({ email: req.email }, (err, user) => {
    if (err) {
      return res.status(500).json({
        message: "Error",
        err
      });
    }
    if (!user) {
      return res.status(404).json({
        message: "Unable to find user"
      });
    }
    const newImage = new Image({
      name: req.file.filename,
      data: fs.readFileSync(req.file.path),
      contentType: req.file.mimetype
    });
    newImage.save((err, image) => {
      if (err) {
        return res.status(500).json({
          message: "Error",
          err
        });
      }

      user.image = image._id;
      user.save((err) => {
        if (err) {
          return res.status(500).json({
            message: "Error",
            err
          });
        }

        return res.status(200).json({
          message: "Uploaded image successfully",
          image: image
        });
      });
    });
  });
  
};

//getimg
const getImage = (async (req, res) => {
  users.find({ email: req.email }, (err, items) => {
		if (err) {
			console.log(err);
			res.status(500).send('An error occurred', err);
		}
		else {
			res.render('imagesPage', { items: items });
		}
	});
});
module.exports = {login,signup,fetchdata,deleteDirectory,updateUser,getImage,postImage,postImages};