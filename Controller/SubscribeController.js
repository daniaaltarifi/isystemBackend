const datasubscribe = require("../Module/allData"); 



const addSubscribe = async (req, res) => {
    const {email} = req.body;
  
    datasubscribe.query(
        'INSERT INTO subscribe (email ) VALUES (?)',
        [email ],
        (error, results) => {
            if (error) {
                console.error(error);
                // Handle the error
                res.status(500).json({ error: 'Internal Server Error' });
            } else {
                console.log('subscribe added successfully');
                // You can access the inserted ID using results.insertId
                res.status(200).json({ message: 'subscribe added successfully' });
            }
        }
    );
  }



const editSubscribe = async (req, res) => {
    const itemId = req.params.id;
    const { email} = req.body;
    console.log(itemId);

      if (!email ) {
        return res.status(400).json({ error: 'Missing parameters in the request body' });
    }

    datasubscribe.query(
        'UPDATE  subscribe SET email = ? WHERE id = ?',
        [email , itemId],
        (error, results) => {
            if (error) {
                console.error(error);
                // Handle the error
                res.status(500).json({ error: 'Internal Server Error' });
            } else {
                console.log('subscribe updated successfully');
                res.status(200).json({ message: 'subscribe updated successfully' });
            }
        }
    );
}





const deleteSubscribe = async (req, res) => {
    const itemId = req.params.id;
        console.log(itemId);

        datasubscribe.query(
        'DELETE FROM subscribe WHERE id  = ?',
        [itemId],
        (error, results) => {
            if (error) {
                console.error(error);
                // Handle the error
                res.status(500).json({ error: 'Internal Server Error' });
            } else {
                console.log('subscribe deleted successfully');
                res.status(200).json({ message: 'subscribe deleted successfully' });
            }
        }
    );
}



const getSubscribe  = (req, res) => {

    const query = 'SELECT * FROM subscribe';
    datasubscribe.query(query, (err, results) => {
      if (err) {
        console.error('Error executing SQL query:', err);
        res.status(500).json({ error: 'Internal server error' });
        return;
      }
      res.json(results);
    });
  }
  


  const getSubscribeById = (req, res) => {
    const itemId =  req.params.id ;
  
    const query = 'SELECT * FROM subscribe  WHERE id  = ?'
  
    datasubscribe.query(query ,
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


module.exports = { addSubscribe,editSubscribe, deleteSubscribe , getSubscribe , getSubscribeById };