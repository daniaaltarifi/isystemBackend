const datapositions = require("../Module/allData"); 



const addpositions = async (req, res) => {
    const {positions} = req.body;
  
    datapositions.query(
        'INSERT INTO positions (positions ) VALUES (?)',
        [positions],
        (error, results) => {
            if (error) {
                console.error(error);
                // Handle the error
                res.status(500).json({ error: 'Internal Server Error' });
            } else {
                console.log('positions added successfully');
                // You can access the inserted ID using results.insertId
                res.status(200).json({ message: 'positions added successfully' });
            }
        }
    );
  }



const editpositions = async (req, res) => {
    const itemId = req.params.id;
    const { positions} = req.body;
    console.log(itemId);

      if (!positions ) {
        return res.status(400).json({ error: 'Missing parameters in the request body' });
    }

    datapositions.query(
        'UPDATE  positions SET positions = ? WHERE id = ?',
        [positions , itemId],
        (error, results) => {
            if (error) {
                console.error(error);
                // Handle the error
                res.status(500).json({ error: 'Internal Server Error' });
            } else {
                console.log('positions updated successfully');
                res.status(200).json({ message: 'positions updated successfully' });
            }
        }
    );
}





const deletepositions = async (req, res) => {
    const itemId = req.params.id;
        console.log(itemId);

        datapositions.query(
        'DELETE FROM positions WHERE id  = ?',
        [itemId],
        (error, results) => {
            if (error) {
                console.error(error);
                // Handle the error
                res.status(500).json({ error: 'Internal Server Error' });
            } else {
                console.log('positions deleted successfully');
                res.status(200).json({ message: 'positions deleted successfully' });
            }
        }
    );
}



const getpositions  = (req, res) => {

    const query = 'SELECT * FROM positions';
    datapositions.query(query, (err, results) => {
      if (err) {
        console.error('Error executing SQL query:', err);
        res.status(500).json({ error: 'Internal server error' });
        return;
      }
      res.json(results);
    });
  }
  


  const getpositionsById = (req, res) => {
    const itemId =  req.params.id ;
  
    const query = 'SELECT * FROM positions  WHERE id  = ?'
  
    datapositions.query(query ,
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


module.exports = { addpositions,editpositions, deletepositions , getpositions , getpositionsById };