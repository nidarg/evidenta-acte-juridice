import mongoose from 'mongoose'

const dosarSchema = new mongoose.Schema(
[{

  userId:{
    type:mongoose.Schema.Types.ObjectId,
    required:true,
    ref:'User'
},

  nrDosar:{
    type:String,
    required:[true, 'Introduceti numar dosar'],
    
  },

  parteDosar:{
    type:String,
    required:[true, 'Introduceti nume reclamant/parat']
  },
}],

{timestamps:true}

)

export default mongoose.model('Dosar', dosarSchema)