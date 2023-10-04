// const dataProducts = require("../Module/allData"); // Import your database connection

// addjoinTeam = async (req, res) => {
//     const { first_name ,last_name ,email,phone,position_id,attach_cv } = req.body;

//     dataProducts.query(
//         'INSERT INTO join_our_team (first_name ,last_name ,email,phone,position_id,attach_cv) VALUES (? , ? , ? , ? , ? ,?)',
//         [first_name ,last_name ,email,phone,position_id,attach_cv],
//         (error, results) => {
//             if (error) {
//                 console.error(error);
//                 // Handle the error
//                 res.status(500).json({ error: 'Internal Server Error' });
//             } else {
//                 console.log('Item added successfully');
//                 // You can access the inserted ID using results.insertId
//                 res.status(200).json({ message: 'Item added successfully' });
//             }
//         }
//     );
// }

const multer = require("multer");

// Define storage for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const destinationPath = path.join(dirname, "../attaches"); // Use dirname to get the current script's directory
    cb(null, destinationPath);
},
    filename: (req, file, cb) => {
      // Rename the file to prevent conflicts (you can use a unique name generator)
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      cb(null, uniqueSuffix + "-" + file.originalname);
    },
  });

  
// Create the multer instance
const upload = multer({ storage: storage });

// Import your database connection and route handlers as you did before

const dataProducts = require("../Module/allData");






editjoinTeam = async (req, res) => {
  const itemId = req.params.id;
  const {first_name ,last_name ,email,phone,position_id,attach_cv} = req.body;
  console.log(itemId);
    console.log(req.body);

    if (!first_name || !last_name || !email || !phone || !position_id || !attach_cv	) {
      return res.status(400).json({ error: 'Missing parameters in the request body' });
  }

    dataProducts.query(
        'UPDATE join_our_team SET first_name = ? ,last_name = ? ,email = ?,phone = ?,position_id = ?,attach_cv = ? WHERE id = ? ',
        [first_name ,last_name ,email,phone,position_id,attach_cv, itemId],
        (error, results) => {
            if (error) {
                console.error(error);
                // Handle the error
                res.status(500).json({ error: 'Internal Server Error' });
            } else {
                console.log('Item updated successfully');
                res.status(200).json({ message: 'Item updated successfully' });
            }
        }
    );
}


    deletejoinTeam = async (req, res) => {
        const itemId = req.params.id;
            console.log(itemId);
    
        dataProducts.query(
            'DELETE FROM join_our_team WHERE id = ?',
            [itemId],
            (error, results) => {
                if (error) {
                    console.error(error);
                    // Handle the error
                    res.status(500).json({ error: 'Internal Server Error' });
                } else {
                    console.log('Item deleted successfully');
                    res.status(200).json({ message: 'Item deleted successfully' });
                }
            }
        );
    }



    
    const getjoinTeam  = (req, res) => {

        const query = 'SELECT * FROM join_our_team';
        dataProducts.query(query, (err, results) => {
          if (err) {
            console.error('Error executing SQL query:', err);
            res.status(500).json({ error: 'Internal server error' });
            return;
          }
          res.json(results);
        });
      }
      


      const getjoinTeamById = (req, res) => {
        const itemId =  req.params.id ;
      
        const query = 'SELECT * FROM join_our_team  WHERE id = ?'
      
        dataProducts.query(query ,
        [itemId], (err, results) => {
          if (err) {
            console.error('Error executing SQL query:', err);
            res.status(500).json({ error: 'Internal server error' });
            return;
          }
          
           console.log(results);
           res.status(200).json({ results });
        });
      }
      

module.exports = { editjoinTeam , deletejoinTeam , getjoinTeam ,getjoinTeamById }