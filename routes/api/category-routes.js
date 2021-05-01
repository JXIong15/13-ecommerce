const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  Category.findAll({
    include: [Product],
  })
  .then((categories) => res.json(categories))
  .catch((err) => res.status(500).json(err))
});

router.get('/:id', (req, res) => {
  Category.findByPk(req.params.id, {
      include: [Product],
  })
  .then((categories) => {
    if (!req.params.id) {
      res.status(404).json({ message: 'No category found with that id!' });
      return;
    }
    res.json(categories)
  })
  .catch ((err) => res.status(500).json(err))
});

router.post('/', (req, res) => {
  Category.create(req.body)
  .then((categories) => res.status(200).json(categories))
  .catch ((err) => res.status(500).json(err))
});

router.put('/:id', (req, res) => {
  Category.update({
      where: {
        id: req.params.id,
      },
    })
    .then((categories) => {
      if (!req.params.id) {
        res.status(404).json({ message: 'No category found with that id!' });
        return;
      }
      res.json(categories)
    })
    .catch ((err) => res.status(400).json(err))
});

router.delete('/:id', (req, res) => {
  Category.destroy({
      where: {
        id: req.params.id,
      },
    })
    .then((categories) => {
      if (!req.params.id) {
        res.status(404).json({ message: 'No category found with that id!' });
        return;
      }
      res.json(categories)
    })
    .catch ((err) => res.status(400).json(err))
});

module.exports = router;
