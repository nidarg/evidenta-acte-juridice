import {createAct, getActe, deleteAct, updateAct, getAllActs} from '../controllers/actController.js'

import express from "express";
const router = express.Router()

router.route('/').get(getAllActs)
router.route('/:id').delete(deleteAct).patch(updateAct).get(getActe).post(createAct)

export default router