mongoose = require("mongoose");
const { Schema } = mongoose;

const todoolistuserSchema = new Schema({
  
  title: {
    type : String,
    require : true,
  },
  content: {
    type : String,
    require : true,
  },
  user : {
    type : mongoose.ObjectId,
    ref : "User"
  }
  
});

const Todoolistuser = mongoose.model("Todoolistuser", todoolistuserSchema);

module.exports = Todoolistuser;
