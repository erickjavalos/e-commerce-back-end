const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    // query the categories
    const categories = await Category.findAll({ include: [{ model: Product }] });
    // send response of data
    res.status(200).json(categories);
  } 
  catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const category = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    });
    // return response of data
    res.status(200).json(category)
  }
  catch(err){
    res.status(500).json(err)
  }
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const category = await Category.create(req.body);
    res.status(200).json(category);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const putCategory = await Category.update({
      category_name: req.body.category_name
    }, {
      where: {
        id: req.params.id
      }
    });
    if (!putCategory[0]) {
      res.status(404).json({ message: "No category found with that id!" });
    }
    res.status(200).json(putCategory);
  }
  catch(err){

  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const category = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!category) {
      res.status(404).json({ message: 'No reader found with that id!' });
      return;
    }

    res.status(200).json(category);
  } 
  catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
