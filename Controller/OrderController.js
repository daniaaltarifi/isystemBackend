const dataProducts = require("../Module/allData"); 


addOrder = async (req, res) => {
  const {o_user_id , note } = req.body;

  dataProducts.query(
    'INSERT INTO `order` (o_user_id, note) VALUES (?, ?)' ,  [o_user_id , note],
      (error, results) => {
          if (error) {
              console.error(error);
              // Handle the error
              res.status(500).json({ error: 'Internal Server Error' });
          } else {
              console.log('order added successfully');
              // You can access the inserted ID using results.insertId
              res.status(200).json({ message: 'order added successfully' });
          }
      }
  );
}




editOrder = async (req, res) => {
    const itemId = req.params.id;
    const { o_user_id, note } = req.body;
    console.log(itemId);
  
    if (!o_user_id) {
      return res.status(400).json({ error: 'Missing parameters in the request body' });
    }
  
    dataProducts.query(
      'UPDATE `order` SET o_user_id = ?, note = ? WHERE o_id = ?',
      [o_user_id, note, itemId],
      (error, results) => {
        if (error) {
          console.error(error);
          // Handle the error
          res.status(500).json({ error: 'Internal Server Error' });
        } else {
          console.log('order updated successfully');
          res.status(200).json({ message: 'order updated successfully' });
        }
      }
    );
  }
  





        deleteOrder = async (req, res) => {
          const itemId = req.params.id;
              console.log(itemId);
      
          dataProducts.query(
              'DELETE FROM `order` WHERE o_id = ?',
              [itemId],
              (error, results) => {
                  if (error) {
                      console.error(error);
                      // Handle the error
                      res.status(500).json({ error: 'Internal Server Error' });
                  } else {
                      console.log('order deleted successfully');
                      res.status(200).json({ message: 'order deleted successfully' });
                  }
              }
          );
      }



          
    const getOrder  = (req, res) => {

      const query = 'SELECT * FROM order';
      dataProducts.query(query, (err, results) => {
        if (err) {
          console.error('Error executing SQL query:', err);
          res.status(500).json({ error: 'Internal server error' });
          return;
        }
        res.json(results);
      });
    }
    


    const getOrderById = (req, res) => {
      const itemId =  req.params.id ;
    
      const query = 'SELECT * FROM order  WHERE o_id  = ?'
    
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
    

        module.exports = { addOrder,editOrder, deleteOrder , getOrder , getOrderById };