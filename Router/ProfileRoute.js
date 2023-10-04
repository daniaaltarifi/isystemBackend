const express = require('express');
const router = express.Router();
const profileDetails = require("../Controller/ProfileController")


const multer = require('multer');
const dataProducts = require("../Module/allData");
const fs = require('fs');
const path = require('path');

const storage = multer.memoryStorage();
const upload = multer({ storage });

// Function to save profile image to the "imagesists" folder and store the path in the database
const saveProfileImage = async (req, res) => {
  const uploadDirectory = path.join(__dirname, '..', 'imagesists');

  const file = req.file; // Use req.file for single file upload

  if (!file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  const fileName = file.originalname;
  const filePath = path.join(uploadDirectory, fileName);

  try {
    await fs.promises.writeFile(filePath, file.buffer);
    console.log("Image saved successfully:", filePath);

    const imagePath = `imagesists/${fileName}`;

    // Insert the image path into the database
    dataProducts.query(
      'INSERT INTO `profile` (user_id, profile_imge) VALUES (?, ?)',
      [req.body.user_id, imagePath],
      (error, results) => {
        if (error) {
          console.error("Error inserting image path into the database:", error);
          res.status(500).json({ error: "Image upload and database update failed" });
        } else {
          console.log('Profile image added successfully');
          res.status(200).json({ message: 'Profile image added successfully' });
        }
      }
    );
  } catch (error) {
    console.error("Error saving an image:", error);
    return res.status(500).json({ error: "Image upload failed" });
  }
};

// Add a new profile with an image
router.post('/add', upload.single('profile_imge'), saveProfileImage);







const editProfileImgByUserId = async (req, res) => {
    const user_id = req.params.user_id; 
    console.log(user_id);
    
    // The rest of your code remains the same
    const file = req.file; // Use req.file for single file upload
  
    if (!user_id) {
      return res.status(400).json({ error: 'User not authenticated' });
    }
  
    if (!file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }
  
    const uploadDirectory = path.join(__dirname, '..', 'imagesists');
    const fileName = file.originalname;
    const filePath = path.join(uploadDirectory, fileName);
  
    try {
      await fs.promises.writeFile(filePath, file.buffer);
      console.log("Image saved successfully:", filePath);
  
      const imagePath = `imagesists/${fileName}`;
  
      // Update the image path in the database
      dataProducts.query(
        'UPDATE `profile` SET profile_imge = ? WHERE user_id = ?',
        [imagePath, user_id],
        (error, results) => {
          if (error) {
            console.error("Error updating image path in the database:", error);
            res.status(500).json({ error: "Image update and database update failed" });
          } else {
            console.log('Profile image updated successfully');
            res.status(200).json({ message: 'Profile image updated successfully' });
          }
        }
      );
    } catch (error) {
      console.error("Error saving an image:", error);
      return res.status(500).json({ error: "Image upload failed" });
    }
  };
  
  // Update a profile image by user ID
  router.put('/editimg/:user_id', upload.single('profile_imge'), editProfileImgByUserId);
  
  


//   const path = require('path');

  editProfileUserAndImgById = async (req, res) => {
    const id = req.params.id;
    const {user_id} = req.body;
    console.log(itemId);
   // The rest of your code remains the same
   const file = req.file; // Use req.file for single file upload
  
   if (!id) {
     return res.status(400).json({ error: 'User notvv authenticated' });
   }
 
   if (!file) {
     return res.status(400).json({ error: 'No file uploaded' });
   }
 
   
   const uploadDirectory = path.join(__dirname, '..', 'imagesists');
   const fileName = file.originalname;
   const filePath = path.join(uploadDirectory, fileName);
   
   try {
    await fs.promises.writeFile(filePath, file.buffer);
    console.log("profile saved successfully:", filePath);

    const imagePath = `imagesists/${fileName}`;

    dataProducts.query(
      'UPDATE `profile` SET user_id = ?, profile_imge = ? WHERE id = ?',
      [user_id , imagePath, id],
      (error, results) => {
        if (error) {
          console.error("Error updating image path in the database:", error);
          res.status(500).json({ error: "Image update and database update failed" });
        } else {
          console.log('Profile image updated successfully');
          res.status(200).json({ message: 'Profile image updated successfully' });
        }
      }
    );
  } catch (error) {
    console.error("Error saving an image:", error);
    return res.status(500).json({ error: "Image upload failed" });
  }
};
  

 // Update a profile image by ID
 router.put('/edituserandimg/:id', upload.single('profile_imge'), profileDetails.editProfileUserAndImgById);
  
  



router.delete("/delete/:id", profileDetails.deleteProfile)

router.get("/getprofiles", profileDetails.getProfile)

router.get("/getprofile/:id", profileDetails.getProfileById)

router.get("/getprofilebyuser/:user_id", profileDetails.getProfileByUser)



module.exports = router