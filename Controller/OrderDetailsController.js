const dataProducts = require("../Module/allData"); 


addOrder = async (req, res) => {
  const {quantity,o_product_id,order_id } = req.body;

  dataProducts.query(
      'INSERT INTO `order_details` ( quantity , o_product_id , order_id ) VALUES (?, ?, ?)',
      [quantity,o_product_id,order_id],
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
    const { quantity,o_product_id,order_id } = req.body;
    console.log(itemId);

      if (!quantity || !o_product_id || !order_id  ) {
        return res.status(400).json({ error: 'Missing parameters in the request body' });
    }

    dataProducts.query(
        'UPDATE  order_details SET quantity = ? ,o_product_id = ? ,order_id = ?  WHERE o_d_id = ?',
        [ quantity, o_product_id, order_id,  itemId],
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
              'DELETE FROM order_details WHERE o_d_id = ?',
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

        const query = 'SELECT * FROM order_details';
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
      
        const query = 'SELECT * FROM order_details  WHERE o_d_id  = ?'
      
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

        module.exports = { addOrder,editOrder, deleteOrder ,getOrder , getOrderById };