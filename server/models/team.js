const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
  team_no: {
    type: Number,
    required: true,
    unique: true,
  },
  users: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users', 
  }],
});

const Team = mongoose.model('Team', teamSchema);

module.exports = Team;