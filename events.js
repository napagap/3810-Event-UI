const express = require('express');
const router = express.Router();
const Event = require('../models/Event');

router.get('/', async (req, res, next) => {
  try {
    const events = await Event.find({}).sort({ startAt: 1 });
    res.render('events/index', { 
      events, 
      name: req.session.userName 
    });
  } catch (err) {
    next(err);
  }
});

router.get('/new', (req, res) => {
  res.render('events/new', { 
    name: req.session.userName,
    categories: Event.CATEGORIES,
    statuses: Event.STATUSES
  });
});

router.post('/', async (req, res, next) => {
  try {
    await Event.create(req.body);
    res.redirect('/events');
  } catch (err) {
    console.error(err);
    res.status(400).send('Add event failed, please check the data format');
  }
});

router.get('/:eventCode', async (req, res, next) => {
  try {
    const event = await Event.findOne({ eventCode: req.params.eventCode.toUpperCase() });
    if (!event) return res.status(404).send('Cannot find the event');
    res.render('events/show', { event, name: req.session.userName });
  } catch (err) {
    next(err);
  }
});

router.get('/:eventCode/edit', async (req, res, next) => {
  try {
    const event = await Event.findOne({ eventCode: req.params.eventCode.toUpperCase() });
    if (!event) return res.status(404).send('Cannot find the event');
    
    res.render('events/edit', { 
      event, 
      name: req.session.userName,
      categories: Event.CATEGORIES,
      statuses: Event.STATUSES
    });
  } catch (err) {
    next(err);
  }
});

router.post('/:eventCode/update', async (req, res, next) => {
  try {
    const eventCode = req.params.eventCode.toUpperCase();
    
    const updatedEvent = await Event.findOneAndUpdate(
      { eventCode: eventCode }, 
      req.body, 
      { new: true, runValidators: true }
    );
    
    if (!updatedEvent) return res.status(404).send('Cannot find the event');
    
    res.redirect('/events/' + updatedEvent.eventCode); 
  } catch (err) {
    console.error(err);
    res.status(400).send('Update failed, please check the data format');
  }
});

router.post('/:eventCode/delete', async (req, res, next) => {
  try {
    const eventCode = req.params.eventCode.toUpperCase();
    await Event.findOneAndDelete({ eventCode: eventCode });
    
    res.redirect('/events'); 
  } catch (err) {
    next(err);
  }
});

module.exports = router;