const Player = require('../models/player-model');


exports.getPlayers = async(req, res) => {
    await Player.find({}, (err, players) => {
        if(err) {
            res.status(400).json({success: false, error: err})
        }

        if(!players.length) {
            return res.status(400).json({ success: false, error: 'Player not found!' })
        }

        return res.status(200).json({ success: true, data: players })
    }).catch(err => console.log(err));
}


exports.getPlayerById = async(req, res) => {
    await Player.findOne({_id: req.params.id}, (err, player) => {
        if(err) {
            return res.status(400).json({ success: false, error: err })
        }

        if(!player) {
            return res.status(400).json({ success: false, error: 'Player not found!' })
        }

        return res.status(200).json({ success: true, data: player })
    }).catch(err => console.log(err))
}


exports.createPlayer = async(req, res) => {
    const body = req.body;

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must Player Details',
        })
    }

    const player = new Player(body);

    if(!player) {
        return res.status(400).json({success: false, error, err});
    }

    player
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: player._id,
                message: 'Player created!'
            });
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'Player not created!'
            });
        })
}


exports.updatePlayer = async(req, res) => {
    const body = req.body;

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update!',
        })
    }

    Player.findOne({_id: req.params.id,}, (err, player) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'Player not found!',
            })
        }

        player.name = body.name;
        player.age = body.age;
        player.batting = body.batting;
        player.bowling = body.bowling;
        player.fielding = body.fielding;
        player.wk = body.wk;
        player.highestscore = body.highestscore;
        player.bestbowlfig = body.bestbowlfig;

        player
            .save()
            .then(() => {
                return res.status(201).json({
                    success: true,
                    id: player._id,
                    message: 'Player updated!'
                });
            })
            .catch(error => {
                return res.status(400).json({
                    error,
                    message: 'Player not updated!'
                });
            })
    })
}


exports.deletePlayer = async (req, res) => {
    await Player.findOneAndDelete({ _id: req.params.id }, (err, player) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!player) {
            return res
                .status(404)
                .json({ success: false, error: `Player not found` })
        }

        return res.status(200).json({ success: true, data: player})
    }).catch(err => console.log(err))
}

