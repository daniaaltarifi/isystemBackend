const datamodel = require("../Module/allData"); 



const addmodel = async (req, res) => {
    const {model_name ,product_id } = req.body;
  
    datamodel.query(
        'INSERT INTO model (model_name  ,product_id  ) VALUES (? , ? )',
        [model_name  ,product_id  ],
        (error, results) => { 
            if (error) {
                console.error(error);
                // Handle the error
                res.status(500).json({ error: 'Internal Server Error' });
            } else {
                console.log('model added successfully');
                // You can access the inserted ID using results.insertId
                res.status(200).json({ message: 'model added successfully' });
            }
        }
    );
  }



const editmodel = async (req, res) => {
    const itemId = req.params.id;
    const { model_name  ,product_id } = req.body;
    console.log(itemId);

      if (!model_name || !product_id   ) {
        return res.status(400).json({ error: 'Missing parameters in the request body' });
    }

    datamodel.query(
        'UPDATE  model SET model_name = ? , product_id = ? WHERE model_id = ?',
        [model_name ,product_id , itemId],
        (error, results) => {
            if (error) {
                console.error(error);
                // Handle the error
                res.status(500).json({ error: 'Internal Server Error' });
            } else {
                console.log('model updated successfully');
                res.status(200).json({ message: 'model updated successfully' });
            }
        }
    );
}





const deletemodel = async (req, res) => {
    const itemId = req.params.id;
        console.log(itemId);

        datamodel.query(
        'DELETE FROM model WHERE model_id  = ?',
        [itemId],
        (error, results) => {
            if (error) {
                console.error(error);
                // Handle the error
                res.status(500).json({ error: 'Internal Server Error' });
            } else {
                console.log('model deleted successfully');
                res.status(200).json({ message: 'model deleted successfully' });
            }
        }
    );
}



const getmodel  = (req, res) => {

    const query = 'SELECT * FROM model';
    datamodel.query(query, (err, results) => {
      if (err) {
        console.error('Error executing SQL query:', err);
        res.status(500).json({ error: 'Internal server error' });
        return;
      }
      res.json(results);
    });
  }
  


  const getmodelById = (req, res) => {
    const itemId =  req.params.id ;
  
    const query = 'SELECT * FROM model  WHERE  ,product_id = ?'
  
    datamodel.query(query ,
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


module.exports = { addmodel,editmodel, deletemodel , getmodel , getmodelById };