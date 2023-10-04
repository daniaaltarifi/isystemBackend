// const dataProducts = require("../Module/test"); // Import your database connection
const dataProducts = require("../Module/allData"); // Import your database connection


const addProductDetails = async (req, res) => {
  const {
    product_name,
    price,
    details,
    stock,
    category_id,
    old_price,
    screen,
    battery,
    camera_front,
    camera_back,
    material,
    gpu,
    cpu,
    type_charger,
    type_id
  } = req.body;

  //Write the image to the folder using the image path and image name,
  dataProducts.query(
    "INSERT INTO products ( product_name , price, details, stock, category_id, old_price, screen, battery,camera_front,camera_back, material, gpu, cpu, type_charger, type_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ? )",
    [
      product_name,
      price,
     details,
      stock,
      category_id,
      old_price,
      screen,
      battery,
      camera_front,
      camera_back,
      material,
      gpu,
      cpu,
      type_charger,
      type_id
    ],
    (error, results) => {
      if (error) {
        console.error(error);
        // Handle the error
        res.status(500).json({ error: "Internal Server Error" });
      } else {
        console.log("Item added successfully");
        // You can access the inserted ID using results.insertId
        const insertedProductId = results.insertId;
        res.status(200).json({ p_id: insertedProductId}) }
    }
  );
};

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, '../images');
//   },
//   filename: function (req, file, cb) {
//     const ext = path.extname(file.originalname);
//     cb(null, Date.now() + path.extname());
//   },
// });

// const upload = multer({ storage: storage });

// addProductDetails = async (req, res) => {
//   // Handle image upload using multer
//   upload.single("image")(req, res, function (err) {
//     if (err) {
//       console.error(err);
//       return res.status(500).json({ error: "Image upload failed" });
//     }
//     // console.log(req);

//     if (!req.file) {
//       console.error("No file uploaded");
//       return res.status(400).json({ error: "No file uploaded" });
//     }

//     const {
//       product_name,
//       color_id,
//       stock,
//       price,
//       image_slider,
//       old_price,
//       category_id,
//     } = req.body;

//     // Get the path of the uploaded image
//     const model_id = req.file.path;

//     // Save the image path in the model_id column
//     dataProducts.query(
//       "INSERT INTO products (product_name, color_id, stock, price, image_slider, old_price, category_id, model_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
//       [
//         product_name,
//         color_id,
//         stock,
//         price,
//         image_slider,
//         old_price,
//         category_id,
//         model_id,
//       ],
//       (error, results) => {
//         if (error) {
//           console.error(error);
//           // Handle the error
//           res.status(500).json({ error: "Internal Server Error" });
//         } else {
//           console.log("Item added successfully");
//           // You can access the inserted ID using results.insertId
//           res.status(200).json({ message: "Item added successfully" });
//         }
//       }
//     );
//   });
// };


// const editProductDetails = async (req, res) => {
//   const itemId = req.params.id;
//   const {
//     product_name,
//     price,
//    details,
//     stock,
//     category_id,
//     old_price,
//     screen,
//     battery,
//     camera_front,
//     camera_back,
//     material,
//     gpu,
//     cpu,
//     type_charger,
//     type_id
//   } = req.body;

//   const updatedProductData = {
//     product_name,
//     price,
//     details,
//     stock,
//     category_id,
//     old_price,
//     screen,
//     battery,
//     camera_front,
//     camera_back,
//     material,
//     gpu,
//     cpu,
//     type_charger,
//     type_id
//   };

//   const updatedImagePaths = req.body.image_paths || [];

//   console.log(itemId);

//   let connection; // Declare the connection variable

//   try {
//     connection = await dataProducts.getConnection(); // Get a new database connection

//     // Start a transaction if needed
//     await connection.beginTransaction();

//     // Update the product details
//     await connection.query(
//       "UPDATE products SET  product_name = ? , price = ?,color_id = ?, details = ?, stock = ?, category_id = ?, old_price = ?, model_id = ?, screen = ?, battery = ?, camera_front = ?, camera_back = ?, material = ?, gpu = ? , cpu = ?, type_charger = ?, type_id = ?  WHERE p_id = ?",
//       [
//         updatedProductData.product_name,
//         updatedProductData.price,
//         updatedProductData.details,
//         updatedProductData.stock,
//         updatedProductData.category_id,
//         updatedProductData.old_price,
//         updatedProductData.screen,
//         updatedProductData.battery,
//         updatedProductData.camera_front,
//         updatedProductData.camera_back,
//         updatedProductData.material,
//         updatedProductData.gpu,
//         updatedProductData.cpu,
//         updatedProductData.type_charger,
//         updatedProductData.type_id,
//         itemId,
//       ]
//     );

//     // Update the product images
//     for (const imagePath of updatedImagePaths) {
//       await connection.query(
//         "INSERT INTO product_images (product_id, image_path) VALUES (?, ?)",
//         [itemId, imagePath]
//       );
//     }

//     await connection.commit(); // Commit the transaction

//     console.log("Item updated successfully");
//     res.status(200).json({ message: "Item updated successfully" });
//   } catch (error) {
//     console.error(error);

//     if (connection) {
//       await connection.rollback(); // Rollback the transaction if an error occurred
//     }

//     res.status(500).json({ error: "Internal Server Error" });
//   } finally {
//     if (connection) {
//       connection.release(); // Release the connection when done
//     }
//   }
// };



// const editProductDetails = async (req, res) => {
//   const {
//     product_id,
//     product_name,
//     color_id,
//     stock,
//     price,
//     model_id,
//     image_slider,
//     old_price,
//     category_id,
//     newImages, // Assuming newImages is an array of image file data
//   } = req.body;

//   // Update product details in the products table
//   const updateProductQuery = `
//     UPDATE products 
//     SET 
//       product_name=?, 
//       color_id=?, 
//       stock=?, 
//       price=?, 
//       model_id=?, 
//       image_slider=?, 
//       old_price=?, 
//       category_id=?
//     WHERE p_id=?
//   `;

//   dataProducts.query(
//     updateProductQuery,
//     [
//       product_name,
//       color_id,
//       stock,
//       price,
//       model_id,
//       image_slider,
//       old_price,
//       category_id,
//       product_id,
//     ],
//     async (error, results) => {
//       if (error) {
//         console.error("Error updating product details:", error);
//         res.status(500).json({ error: "Internal Server Error" });
//         return;
//       }

//       // Write new images to the folder and update image paths in the product_images table
//       const uploadDirectory = path.join(__dirname, '..', 'imagesists');
//       const imagePaths = [];

//       for (const file of newImages) {
//         const fileName = file.originalname;
//         const filePath = path.join(uploadDirectory, fileName);

//         try {
//           await fs.promises.writeFile(filePath, file.buffer);

//           console.log("Image saved successfully:", filePath);

//           const imagePath = `imagesists/${fileName}`;
//           imagePaths.push(imagePath);
//         } catch (error) {
//           console.error("Error saving an image:", error);
//           res.status(500).json({ error: "Image upload failed" });
//           return;
//         }
//       }

//       // Delete existing image paths for the product in the product_images table
//       const deleteImagesQuery = "DELETE FROM product_images WHERE product_id=?";
//       dataProducts.query(deleteImagesQuery, [product_id], async (error, deleteResults) => {
//         if (error) {
//           console.error("Error deleting existing images:", error);
//           res.status(500).json({ error: "Internal Server Error" });
//           return;
//         }

//         // Insert new image paths into the product_images table
//         const insertQuery = "INSERT INTO product_images (product_id, image_path) VALUES (?, ?)";
//         try {
//           for (const imagePath of imagePaths) {
//             await dataProducts.query(insertQuery, [product_id, imagePath]);
//           }

//           console.log("Product details and images updated successfully");
//           res.status(200).json({ message: "Product details and images updated successfully" });
//         } catch (error) {
//           console.error("Error inserting image paths into the database:", error);
//           res.status(500).json({ error: "Image upload and database update failed" });
//         }
//       });
//     }
//   );
// };
















const deleteProductDetails = async (req, res) => {
  const itemId = req.params.id;
  console.log(itemId);

  // First, delete related records in product_images table
  dataProducts.query(
    "DELETE FROM product_images WHERE product_id = ?",
    [itemId],
    (error, results) => {
      if (error) {
        console.error(error);
        // Handle the error
        res.status(500).json({ error: "Internal Server Error" });
      } else {
        // Now that related records are deleted, delete the product
        dataProducts.query(
          "DELETE FROM products WHERE p_id = ?",
          [itemId],
          (error, results) => {
            if (error) {
              console.error(error);
              // Handle the error
              res.status(500).json({ error: "Internal Server Error" });
            } else {
              console.log("Item deleted successfully");
              res.status(200).json({ message: "Item deleted successfully" });
            }
          }
        );
      }
    }
  );
};

// const arrayData = [];

const getProductDetails = (req, res) => {
  // Read the image from the folder using the image path and image name saved in the database
  const query = "SELECT * FROM products";

  dataProducts.query(query, (err, results) => {
    if (err) {
      console.error("Error executing SQL query:", err);
      res.status(500).json({ error: "Internal server error" });
      return;
    }

    const promises = results.map((item) => {
      return new Promise((resolve, reject) => {
        const query_image = "SELECT * FROM product_images WHERE product_id = ?";
        dataProducts.query(query_image, [item.p_id], (err, images) => {
          if (err) {
            console.error("Error executing SQL query:", err);
            reject(err);
          } else {
            item.images = images;
            resolve(item);
          }
        });
      });
    });

    Promise.all(promises)
      .then((completeResults) => {
        res.json(completeResults);
      })
      .catch((error) => {
        console.error("Error fetching product images:", error);
        res.status(500).json({ error: "Internal server error" });
      });
  });
};



const getProductDetailsById = (req, res) => {
  const productId = req.params.id; // Assuming you're passing the product ID as a parameter in the request URL

  const query = `
    SELECT *
    FROM products 
    WHERE p_id = ?`; // Replace 'id' with the actual name of your product ID column

  dataProducts.query(query, [productId], (err, results) => {
    if (err) {
      console.error("Error executing SQL query:", err);
      res.status(500).json({ error: "Internal server error" });
      return;
    }

    if (results.length === 0) {
      res.status(404).json({ error: "Product not found" });
      return;
    }

    const product = results[0]; // Assuming there's only one product with the given ID
    res.json(product);
    console.log(productId);
  });
};



const getProductDetailsByCategory = (req, res) => {
  const itemId = req.params.id;

  const query = `SELECT * FROM products INNER JOIN category ON products.category_id = category.category_id WHERE category.category_id = ? `;
  dataProducts.query(query, [itemId], (err, results) => {
    if (err) {
      console.error("Error executing SQL query:", err);
      res.status(500).json({ error: "Internal server error" });
      return;
    }

    console.log(results);
    res.status(200).json(results);
  });
};


module.exports = {
  addProductDetails,
 
  deleteProductDetails,
  getProductDetails,
  getProductDetailsById,
  getProductDetailsByCategory,

};
