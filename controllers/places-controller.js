const HttpError = require('../models/http-error');
const {validationResult} = require('express-validator');
const { v4: uuidv4 } = require('uuid');
let DUMMY_PLACES = [
    {
        id: 'p1',
        title: 'Empire State Building',
        description: 'A famous skyscraper!',
        location: {
            lat: 40.748447,
            lng: -73.9871516
        },
        address: '20 W 34th St, New York, NY 10001',
        creator: 'u1'
    }
];

const getPlaceById = (req, res, next) => {
    const placeId = req.params.pid; // {}
    const place = DUMMY_PLACES.find(p => {
        return p.id === placeId;
    });

    if(!place){
       throw new HttpError('Could not find a place for the provided id.', 404);
    } 

    res.json({place});
};


const getPlacesByUserId = (req, res, next) => {
    const userId = req.params.uid;
    const place = DUMMY_PLACES.filter(p => {
        return p.creator === userId;
    });

    if(!places || places.length === 0){
        return next(new HttpError('Could not places for the provided user id.', 404));
    } 

    res.json({place});
    };

    const createPlace = (req, res, next) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            console.log(errors);
            throw new HttpError('Invalid inputs passed! Please check your data.', 422);
        }
        const {title, description, coordinates, address, creator} = req.body;

        const createdPlace = {
            id: uuidv4(),
            title,
            description,
            location: coordinates,
            address,
            creator
        };

        DUMMY_PLACES.push(createdPlace);

        res.status(201).json({place: createdPlace});
    };

    const updatePlace = (req, res, next) => {
        const {title, description} = req.body;
        const placeId = req.params.pid;

        const updatedPlace = { ...DUMMY_PLACES.find(p => p.id === placeId)};
        const placeIndex = DUMMY_PLACES.findIndex(p => p.id === placeId);
        updatedPlace.title = title;
        updatedPlace.description = description;

        DUMMY_PLACES[placeIndex] = updatedPlace;

        res.status(200).json({place: updatedPlace});
    };

    const deletePlace = (req, res, next) => {
        const placeId = req.params.pid;
        DUMMY_PLACES = DUMMY_PLACES.filter(p => p.id !== placeId);
        res.status(200).json({message: 'Deleted place.'});
    };

    exports.updatePlace = updatePlace;
    exports.deletePlace = deletePlace;
    exports.createPlace = createPlace;
    exports.getPlaceById = getPlaceById;
    exports.getPlacesByUserId = getPlacesByUserId;