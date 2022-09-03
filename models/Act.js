import mongoose from 'mongoose'

const actSchema = new mongoose.Schema(
[
  
  {

      userId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'
    },

  dosarId:{
    type:mongoose.Schema.Types.ObjectId,
    required:true,
    ref:'Dosar'
},


  actProcedural:{
    type:String,
    required:[true, 'Introduceti denumirea actului']
  },

  dataDosar:{
    type:Date,
    required:[true, 'Introduceti data act procedural']
  }

}]
)

export default mongoose.model('Act', actSchema)