import {getDosare, createDosar, deleteDosar, updateDosar, getDosarById} from '../controllers/dosarController.js'

import express from "express";
const router = express.Router()

router.route('/').get(getDosare).post(createDosar)
router.route('/:id').delete(deleteDosar).patch(updateDosar).get(getDosarById)

export default router