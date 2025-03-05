const { Router } = require('express');
const Gender = require('../models/Gender');
const {validationResult, check} = require('express-validator');

const router = Router ();

router.post('/', [
    check('name', 'invalid.name').not().isEmpty(),
    check('state', 'invalid.state').isIn([ 'Activo', 'Inactivo' ]),
    check('description', 'invalid.descrption').not().isEmpty(),
], async function(req, res) {

    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({message: errors.array () });

        }
        
    let gender = new Gender();
    gender.name = req.body.name;
    gender.state = req.body.state;
    gender.description = req.body.description;
    gender.createdAt = new Date();
    gender.updatedAt = new Date();

    gender = await gender.save();
    res.send(gender)


    }   catch (error){
        console.log(error);
        res.status(500).send('message error');
    }
    
});

router.get('/', async function(req, res) {
    try{
        const genders = await Gender.find();
        res.send(genders);

    } catch (error) {
        console.log(error);
        res.status(500).send('message error');
    }

});

//UPDATE
router.put('/:genderId', [
    check('name', 'invalid.name').not().isEmpty(),
    check('state', 'invalid.state').isIn([ 'Activo', 'Inactivo' ]),
    check('description', 'invalid.descrption').not().isEmpty(),
], async function(req, res) {

    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({message: errors.array () });

        }

    let gender = await Gender.findById(req.params.genderId);
    if (!gender) {
        return res.status(400).send('Gender not exist');
    }    
        
    gender.name = req.body.name;
    gender.state = req.body.state;
    gender.description = req.body.description;
    gender.updatedAt = new Date();

    gender = await gender.save();
    res.send(gender)


    }   catch (error){
        console.log(error);
        res.status(500).send('message error');
    }
    
});

module.exports = router;