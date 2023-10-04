const dataTrade= require("../Module/allData"); 



const addTrade = async (req, res) => {
    const {your_device , up_to , category_id} = req.body;
  
    dataTrade.query(
        'INSERT INTO trade_in (your_device , up_to , category_id ) VALUES (? , ? , ?)',
        [your_device , up_to , category_id],
        (error, results) => {
            if (error) {
                console.error(error);
                // Handle the error
                res.status(500).json({ error: 'Internal Server Error' });
            } else {
                console.log('trade_in added successfully');
                // You can access the inserted ID using results.insertId
                res.status(200).json({ message: 'trade_in added successfully' });
            }
        }
    );
  }



const editTrade = async (req, res) => {
    const itemId = req.params.id;
    const { your_device , up_to , category_id} = req.body;
    console.log(itemId);

      if (!your_device || !up_to || !category_id ) {
        return res.status(400).json({ error: 'Missing parameters in the request body' });
    }

    dataTrade.query(
        'UPDATE  trade_in SET your_device = ? , up_to = ?, category_id = ? WHERE id = ?',
        [your_device , up_to , category_id , itemId],
        (error, results) => {
            if (error) {
                console.error(error);
                // Handle the error
                res.status(500).json({ error: 'Internal Server Error' });
            } else {
                console.log('trade_in updated successfully');
                res.status(200).json({ message: 'trade_in updated successfully' });
            }
        }
    );
}





const deleteTrade = async (req, res) => {
    const itemId = req.params.id;
        console.log(itemId);

        dataTrade.query(
        'DELETE FROM trade_in WHERE id  = ?',
        [itemId],
        (error, results) => {
            if (error) {
                console.error(error);
                // Handle the error
                res.status(500).json({ error: 'Internal Server Error' });
            } else {
                console.log('trade_in deleted successfully');
                res.status(200).json({ message: 'trade_in deleted successfully' });
            }
        }
    );
}



const getTrade  = (req, res) => {

    const query = 'SELECT * FROM trade_in';
    dataTrade.query(query, (err, results) => {
      if (err) {
        console.error('Error executing SQL query:', err);
        res.status(500).json({ error: 'Internal server error' });
        return;
      }
      res.json(results);
    });
  }
  


  const getTradeById = (req, res) => {
    const itemId =  req.params.id ;
  
    const query = 'SELECT * FROM trade_in  WHERE id  = ?'
  
    dataTrade.query(query ,
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


module.exports = { addTrade,editTrade, deleteTrade , getTrade , getTradeById };