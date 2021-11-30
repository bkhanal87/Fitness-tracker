const router = require("express").Router();
const { Workout } = require('../models');

router.get('/api/workouts', (req, res) => {
    Workout.aggregate([{
        $addFields: {
            totalDuration: { $sum: "$exercises.duration" }
        }
    }]).sort({ _id: 1 })
        .then((workout) => {
            res.status(200).json(workout);
        })
        .catch((err) => {
            res.status(400).json(err);
        });
});

router.put('/api/workouts/:id', async (req, res) => {
    try {
        const workout = await Workout.findByIdAndUpdate(
            req.params.id,
            { $push: { exercises: req.body } },
            { new: true }
        )
        console.log(workout);
        res.json(workout)
    } catch(err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.post('/api/workouts', ({ body }, res) => {
    Workout.create(body)
    .then(workoutdb => {
        res.json(workoutdb)
    })
    .catch(err => {
        res.status(400).json(err);
    })
}); 

router.get('/api/workouts/range', (req, res) => {
    Workout.find({}).sort({ date: -1 })
        .then(workoutdb => {
            res.json(workoutdb);
        })
        .catch(err => {
            res.status(400).json(err);
        })
});

module.exports = router;