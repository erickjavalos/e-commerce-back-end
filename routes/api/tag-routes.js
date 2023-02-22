const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    // query the categories
    const tags = await Tag.findAll({});
    // send response of data
    res.status(200).json(tags);
  } 
  catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const tag = await Tag.findByPk(req.params.id);
    // return response of data
    res.status(200).json(tag)
  }
  catch(err){
    res.status(500).json(err)
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  try {
    const tag = await Tag.create(req.body);
    res.status(200).json(tag);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const putTag = await Tag.update({
      tag_name: req.body.tag_name
    }, {
      where: {
        id: req.params.id
      }
    });
    if (!putTag[0]) {
      res.status(404).json({ message: "No category found with that id!" });
    }
    res.status(200).json(putTag);
  }
  catch(err){
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const category = await Tag.destroy({
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
