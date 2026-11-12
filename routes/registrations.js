const express = require('express');
const router = express.Router();
const Registration = require('../models/Registration');
const Event = require('../models/Event');

router.get('/', async (req, res, next) => {
    try {
        const myRegistrations = await Registration.find({ userName: req.session.userName }).sort({ registeredAt: -1 });
        
        res.render('registrations/index', { 
            registrations: myRegistrations,
            name: req.session.userName
        });
    } catch (err) {
        next(err);
    }
});

router.post('/', async (req, res, next) => {
    try {
        const { eventCode } = req.body;
        const userName = req.session.userName;

        const existing = await Registration.findOne({ eventCode: eventCode.toUpperCase(), userName });
        if (existing) {
            return res.status(400).send('You have already registered for this event.');
        }

        await Registration.create({
            eventCode: eventCode.toUpperCase(),
            userName: userName,
            status: 'Confirmed'
        });

        res.redirect('/registrations');
    } catch (err) {
        console.error(err);
        res.status(400).send('Failed to register, please check your input.');
    }
});

router.post('/:id/cancel', async (req, res, next) => {
    try {
        await Registration.findByIdAndUpdate(req.params.id, { status: 'Cancelled' });
        res.redirect('/registrations');
    } catch (err) {
        next(err);
    }
});

module.exports = router;