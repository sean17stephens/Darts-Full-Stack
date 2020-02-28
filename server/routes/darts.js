const express  = require('express');
const router   = express.Router();
const mongoose = require('mongoose'); // using to generate ObjectIDs
const Dart   = require('../models/Dart').Dart;

/**
 * Functionality for this route:
 *  C   POST    /DartsPlayers/        Create a new Darts Player
 *  R   GET     /DartsPlayers         Gets an array of all Darts Players
 *  R   GET     /DartsPlayers/:id     Get a single Darts Player, by ID
 *  U   PUT     /DartsPlayers/:id     Update a single Darts Player, by id
 *  D   DELETE  /DartsPlayers/:id     Delete a single Darts Player, by ID
 */

// GET an array of all Darts Players change
router.get('/', (req, res) => {
    return mongoose
      .model('Dart')
      .find({})
      .then (darts => res.json(darts))
      .catch(err => res
        .status(500)
        .json({ok: false})
      );
  });

  // GET a single darts player by ID
router.get('/:id([0-9a-fA-F]{24})', (req, res) => {
  return mongoose
    .model('Dart')
    .findOne({_id: req.params.id})
    .then (dart => res.json(dart))
    .catch(err => res
      .status(500)
      .json({ok: false})
    );
});

// POST Create a new darts player
router.post('/', (req, res) => {
  return new Dart({
    title  : req.body.title,
    ranking  : req.body.ranking,
    country  : req.body.country,
  })
  .save()
  .then (dart => Dart.populate(dart, {path: '_id'}))
  .then (dart => res.json(dart))
  .catch(err => res
    .status(400)
    .json({ok: false, error: err.message})
  );
});

// DELETE Delete a topic with a given ID
router.delete('/:id([0-9a-fA-F]{24})', (req, res) => {
  return Dart
    .deleteOne({_id: req.params.id})
    .then (() => res.json({'ok': true}))
    .catch(err => res
      .status(500)
      .json({ok: false})
    );
});

// PUT Update a darts player
router.put('/:id([0-9a-fA-F]{24})', (req, res) => {
  return Dart
    .findOneAndUpdate(
      {_id: req.params.id},
      {$set: {
        title  : req.body.title,
        ranking  : req.body.ranking,
        country  : req.body.country,
      }},
      {new: true}
    )
    .then (dart => Dart.populate(dart, {path: '_id'}))
    .then (dart => res.json(dart))
    .catch(err => res
      .status(500)
      .json({ok: false})
    );
});

  module.exports = router;