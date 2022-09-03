import Act from '../models/Act.js'
import { StatusCodes } from 'http-status-codes'
import { BadRequestError, NotFoundError } from '../errors/index.js'

const createAct = async(req, res)=>{
  const { actProcedural, dataDosar, dosarId } = req.body

  if (!actProcedural || !dataDosar || !dosarId) {
    throw new BadRequestError('Please Provide All Values')
  }

  const act = await Act.create(req.body)
  res.status(StatusCodes.CREATED).json({ act })
}

const getAllActs = async(req, res)=>{
  const allActs = await Act.find({userId:req.user.userId}).populate('dosarId', ['parteDosar', 'nrDosar']).sort('dataDosar')
  res.status(StatusCodes.OK).json({allActs})
}

const getActe = async(req, res)=>{
  const acte = await Act.find({dosarId:req.params.id})
  res.status(StatusCodes.OK).json({acte})
}
const deleteAct = async(req, res)=>{
  res.send('delete Act')
}
const updateAct = async(req, res)=>{
  res.send('update act')
}

export {createAct, getActe, deleteAct, updateAct, getAllActs}