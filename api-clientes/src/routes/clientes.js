const express = require('express')
const router = express.Router()
const clientesController = require('../controllers/clientesController')

router.post('/', clientesController.create)
router.get('/', clientesController.list)
router.get('/:codigo', clientesController.getById)
router.put('/:codigo', clientesController.update)
router.delete('/:codigo', clientesController.remove)

module.exports = router
