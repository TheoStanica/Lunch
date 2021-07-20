const router = require('express').Router();
const menuController = require('./controller');

router.post('/', menuController.createMenu);
router.put('/:_id', menuController.updateMenu);
router.delete('/:_id', menuController.deleteMenu);

module.exports = router;
