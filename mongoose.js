var mongoose=require('mongoose');
mongoose.connect('mongodb://andrushkodima:User2010@ds123799.mlab.com:23799/mydatabase');
console.log("mongodb connect...")
module.exports=mongoose;