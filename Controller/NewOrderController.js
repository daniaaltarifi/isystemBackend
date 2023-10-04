const dataOrder = require("../Module/allData"); 



const addOrder = async (req, res) => {
      const {
        First_name,
        Last_name,
        Phone,
        Email,
        Address,
        City,
        Country,
        Zip_Postal_code,
        Delivery_Method,
        Carditem,
        total
      } = req.body;
    
      //Write the image to the folder using the image path and image name,
      dataOrder.query(
        "INSERT INTO `order` (First_name, Last_name, Phone, Email, Address, City, Country, Zip_Postal_code, Delivery_Method, Carditem, total) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [
          First_name,
          Last_name,
          Phone,
          Email,
          Address,
          City,
          Country,
          Zip_Postal_code,
          Delivery_Method,
          Carditem,
          total,
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
            res.status(200).json({ p_id: insertedProductId });
          }
        }
      );
    };
    


const editOrder = async (req, res) => {
    const itemId = req.params.id;
    const {First_name,
        Last_name,
        Phone,
        Email,
        Address,
        City,
        Country,
        Zip_Postal_code,
        Delivery_Method,
        Carditem,
        total } = req.body;
    console.log(itemId);

      if (!First_name || !Last_name || !Phone || !Email || !Address || !City || !Country || !Zip_Postal_code || !Delivery_Method || !Carditem || !total ) {
        return res.status(400).json({ error: 'Missing parameters in the request body' });
    }

    dataOrder.query(
        'UPDATE  `order` SET First_name = ? , Last_name = ?, Phone =?, Email = ?, Address = ?, City =?, Country =?, Zip_Postal_code =?,Delivery_Method = ? ,Carditem = ?, total= ? WHERE Order_id = ?',
        [First_name,
          Last_name,
          Phone,
          Email,
          Address,
          City,
          Country,
          Zip_Postal_code,
          Delivery_Method,
          Carditem,
          total, itemId],
        (error, results) => {
            if (error) {
                console.error(error);
                // Handle the error
                res.status(500).json({ error: 'Internal Server Error' });
            } else {
                console.log('Order updated successfully');
                res.status(200).json({ message: 'Order updated successfully' });
            }
        }
    );
}





const deleteOrder = async (req, res) => {
    const itemId = req.params.id;
        console.log(itemId);

        dataOrder.query(
        'DELETE FROM `order` WHERE Order_id  = ?',
        [itemId],
        (error, results) => {
            if (error) {
                console.error(error);
                // Handle the error
                res.status(500).json({ error: 'Internal Server Error' });
            } else {
                console.log('Order deleted successfully');
                res.status(200).json({ message: 'Order deleted successfully' });
            }
        }
    );
}



const getOrder  = (req, res) => {

    const query = 'SELECT * FROM `order`';
    dataOrder.query(query, (err, results) => {
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
  
    const query = 'SELECT * FROM `order`  WHERE Order_id  = ?'
  
    dataOrder.query(query ,
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