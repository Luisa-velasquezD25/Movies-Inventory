const { Router } = require('express');
const Director = require('../models/Director');
const {validationResult, check} = require('express-validator');


const router = Router ();

router.post('/', [
    check('name', 'invalid.name').not().isEmpty(),
    check('state', 'invalid.state').isIn([ 'Activo', 'Inactivo' ]),

], async function(req, res) {

    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({message: errors.array () });

        }
        
    let director = new Director();
    director.name = req.body.name;
    director.state = req.body.state;
    director.createdAt = new Date();
    director.updatedAt = new Date();

    director = await director.save();
    res.send(director)


    }   catch (error){
        console.log(error);
        res.status(500).send('message error');
    }
    
});

router.get('/', async function(req, res) {
    try{
        const directors = await Director.find();
        res.send(directors);

    } catch (error) {
        console.log(error);
        res.status(500).send('message error');
    }

});


//UPDATE
router.put('/:directorId', [
    check('name', 'invalid.name').not().isEmpty(),
    check('state', 'invalid.state').isIn([ 'Activo', 'Inactivo' ]),

], async function(req, res) {

    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({message: errors.array () });

        }

    let director = await Director.findById(req.params.directorId);
    if (!director) {
        return res.status(400).send('Director not exist');
    }        
        
    director.name = req.body.name;
    director.state = req.body.state;
    director.createdAt = new Date();
    director.updatedAt = new Date();

    director = await director.save();
    res.send(director)


    }   catch (error){
        console.log(error);
        res.status(500).send('message error');
    }
    
});

module.exports = router;