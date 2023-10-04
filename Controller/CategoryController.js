const dataCategory = require("../Module/allData"); 



const addCategory = async (req, res) => {
    const {category_name} = req.body;
  
    dataCategory.query(
        'INSERT INTO category (category_name ) VALUES (?)',
        [category_name ],
        (error, results) => {
            if (error) {
                console.error(error);
                // Handle the error
                res.status(500).json({ error: 'Internal Server Error' });
            } else {
                console.log('Category added successfully');
                // You can access the inserted ID using results.insertId
                res.status(200).json({ message: 'Category added successfully' });
            }
        }
    );
  }



const editCategory = async (req, res) => {
    const itemId = req.params.id;
    const { category_name } = req.body;
    console.log(itemId);

      if (!category_name  ) {
        return res.status(400).json({ error: 'Missing parameters in the request body' });
    }

    dataCategory.query(
        'UPDATE  category SET category_name = ? WHERE category_id = ?',
        [category_name , itemId],
        (error, results) => {
            if (error) {
                console.error(error);
                // Handle the error
                res.status(500).json({ error: 'Internal Server Error' });
            } else {
                console.log('category updated successfully');
                res.status(200).json({ message: 'category updated successfully' });
            }
        }
    );
}





const deleteCategory = async (req, res) => {
    const itemId = req.params.id;
        console.log(itemId);

        dataCategory.query(
        'DELETE FROM category WHERE category_id  = ?',
        [itemId],
        (error, results) => {
            if (error) {
                console.error(error);
                // Handle the error
                res.status(500).json({ error: 'Internal Server Error' });
            } else {
                console.log('Category deleted successfully');
                res.status(200).json({ message: 'Category deleted successfully' });
            }
        }
    );
}



const getCategory  = (req, res) => {

    const query = 'SELECT * FROM category';
    dataCategory.query(query, (err, results) => {
      if (err) {
        console.error('Error executing SQL query:', err);
        res.status(500).json({ error: 'Internal server error' });
        return;
      }
      res.json(results);
    });
  }
  


  const getCategoryById = (req, res) => {
    const itemId =  req.params.id ;
  
    const query = 'SELECT * FROM category  WHERE category_id  = ?'
  
    dataCategory.query(query ,
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


module.exports = { addCategory,editCategory, deleteCategory , getCategory , getCategoryById };