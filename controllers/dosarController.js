import Dosar from '../models/Dosar.js'
import Act from '../models/Act.js'
import { StatusCodes } from 'http-status-codes'
import { BadRequestError, NotFoundError } from '../errors/index.js'

const createDosar = async(req, res)=>{
  const { nrDosar, parteDosar } = req.body

  if (!nrDosar || !parteDosar) {
    throw new BadRequestError('Please Provide All Values')
  }

  const dosar = await Dosar.create(req.body)
  res.status(StatusCodes.CREATED).json({ dosar })
}

const getDosare = async(req, res)=>{
  const {search, sort} = req.query
  // console.log(req.query);
  const queryObject = {
    userId:req.user.userId
  }

  if(search){
    queryObject.parteDosar = {$regex:search, $options:'i'}
  }

  // console.log(queryObject);
  
  let result = Dosar.find(queryObject)
  const page = Number(req.query.page) || 1
  const limit = Number(req.query.limit) || 3
  const skip = (page - 1) * limit
  result = result.sort('-createdAt')
  result = result.skip(skip).limit(limit)
  // if (sort === 'recente') {
  //   result = result.sort('-createdAt')
  // }
  // if (sort === 'vechi') {
  //   result = result.sort('createdAt')
  // }

  const dosare = await result
  const totalDosare = await Dosar.countDocuments(queryObject)
  const numOfPages = Math.ceil(totalDosare / limit)
  // const dosare = await Dosar.find({userId:req.user.userId})
  res.status(StatusCodes.OK).json({dosare,totalDosare, numOfPages})
}

const getDosarById = async(req, res)=>{
  const id = req.params.id
  const dosar = await Dosar.findById(id)
  if(!dosar){
    throw new BadRequestError('Nu a fost gasit dosarul')
  }

  res.status(StatusCodes.OK).json({dosar})

}

const deleteDosar = async(req, res)=>{
  const id = req.params.id
  const dosar = await Dosar.findById(id)
  if(dosar){
    await Act.deleteMany({dosarId:id})
    await dosar.remove()
    const dosare = await Dosar.find({userId:req.user.userId})
    res.status(StatusCodes.OK).json({dosare})
  }
  else{
    res.status(StatusCodes.NotFoundError)
    throw new Error('Dosarul nu a fost gasit')
  }
}

const updateDosar = async(req, res)=>{
  
}

export { createDosar, getDosare, deleteDosar, updateDosar, getDosarById}