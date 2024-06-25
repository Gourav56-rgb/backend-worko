import express from "express"
import { createUser, deleteUser, getUserDetails, listUser, updateUser } from "../controllers/user.js"

const router = express.Router()

router.post("/user", createUser)
router.get("/user", listUser)
router.route("/user/:userId").get(getUserDetails).put(updateUser).delete(deleteUser)

export default router