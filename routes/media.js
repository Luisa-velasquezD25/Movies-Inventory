const { Router } = require('express');
const Media = require('../models/Media');
const {validationResult, check} = require('express-validator');

const router = Router ();

router.post('/', [
    check('serial', 'invalid.serial').not().isEmpty(),
    check('title', 'invalid.title').not().isEmpty(),
    check('sypnosis', 'invalid.sypnosis').not().isEmpty(),
    check('url', 'invalid.url').isURL(),
    check('image', 'invalid.image').isURL(),
    check('yearPremiere', 'invalid.yearPremiere').not().isEmpty(),
    check('gender', 'invalid.gender').not().isEmpty(),
    check('director', 'invalid.director').not().isEmpty(),
    check('producer', 'invalid.producer').not().isEmpty(),
    check('type', 'invalid.type').not().isEmpty(),

], async function(req, res) {

    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({message: errors.array () });

        }

        const existMediaForSerial = await Media.findOne({ serial: req.body.serial });
        if (existMediaForSerial) {
            return res.status(400).send('Exist serial');
        }
        
    let media = new Media();
    media.serial = req.body.serial;
    media.title = req.body.title;
    media.sypnosis = req.body.sypnosis;
    media.url = req.body.url;
    media.image = req.body.image;
    media.createdAt = new Date();
    media.updatedAt = new Date();
    media.yearPremiere = req.body.yearPremiere;
    media.gender = req.body.gender._id;
    media.director = req.body.director._id;
    media.producer = req.body.producer._id;
    media.type = req.body.type._id;

    media = await media.save();
    res.send(media)


    }   catch (error){
        console.log(error);
        res.status(500).send('message error');
    }
    
});

router.get('/', async function(req, res) {
   try{
       const medias = await Media.find().populate([
        {
            path: 'gender', select: 'name state description'

        },

        {
            path: 'director', select: 'name state'
        },

        {
            path: 'producer', select: 'name state slogan description'
        },

        {
            path: 'type', select: 'name description'
        }

       ]);
       res.send(medias);

    } catch (error) {
        console.log(error);
        res.status(500).send('message error');
   }

});

//UPDATE
router.put('/:mediaId', [
    check('serial', 'invalid.serial').not().isEmpty(),
    check('title', 'invalid.title').not().isEmpty(),
    check('sypnosis', 'invalid.sypnosis').not().isEmpty(),
    check('url', 'invalid.url').isURL(),
    check('image', 'invalid.image').isURL(),
    check('yearPremiere', 'invalid.yearPremiere').not().isEmpty(),
    check('gender', 'invalid.gender').not().isEmpty(),
    check('director', 'invalid.director').not().isEmpty(),
    check('producer', 'invalid.producer').not().isEmpty(),
    check('type', 'invalid.type').not().isEmpty(),

], async function(req, res) {

    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({message: errors.array () });

        }

        let media = await Media.findById(req.params.mediaId);
        if (!media) {
            return res.status(400).send('Media not exist');
        }     

        const existMediaForSerial = await Media.findOne({ serial: req.body.serial });
        if (existMediaForSerial) {
            return res.status(400).send('Exist serial');
        }
        
    media.serial = req.body.serial;
    media.title = req.body.title;
    media.sypnosis = req.body.sypnosis;
    media.url = req.body.url;
    media.image = req.body.image;
    media.createdAt = new Date();
    media.updatedAt = new Date();
    media.yearPremiere = req.body.yearPremiere;
    media.gender = req.body.gender._id;
    media.director = req.body.director._id;
    media.producer = req.body.producer._id;
    media.type = req.body.type._id;

    media = await media.save();
    res.send(media)


    }   catch (error){
        console.log(error);
        res.status(500).send('message error');
    }
    
});

module.exports = router;