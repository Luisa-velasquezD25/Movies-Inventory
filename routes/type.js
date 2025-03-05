const { Router } = require('express');
const Type = require('../models/Type');
const {validationResult, check} = require('express-validator');

const router = Router ();

router.post('/', [
    check('name', 'invalid.name').not().isEmpty(),
    check('description', 'invalid.descrption').not().isEmpty(),
], async function(req, res) {

    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({message: errors.array () });

        }
        
    let type = new Type();
    type.name = req.body.name;
    type.description = req.body.description;
    type.createdAt = new Date();
    type.updatedAt = new Date();

    type = await type.save();
    res.send(type)


    }   catch (error){
        console.log(error);
        res.status(500).send('message error');
    }
    
});

router.get('/', async function(req, res) {
    try{
        const types = await Type.find();
        res.send(types);

    } catch (error) {
        console.log(error);
        res.status(500).send('message error');
    }

});

//UPDATE
router.put('/:typeId', [
    check('name', 'invalid.name').not().isEmpty(),
    check('description', 'invalid.descrption').not().isEmpty(),
], async function(req, res) {

    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({message: errors.array () });

        }

    let type = await Type.findById(req.params.typeId);
    if (!type) {
        return res.status(400).send('Type not exist');
    }        
    
    type.name = req.body.name;
    type.description = req.body.description;
    type.createdAt = new Date();
    type.updatedAt = new Date();

    type = await type.save();
    res.send(type)


    }   catch (error){
        console.log(error);
        res.status(500).send('message error');
    }
    
});
module.exports = router;