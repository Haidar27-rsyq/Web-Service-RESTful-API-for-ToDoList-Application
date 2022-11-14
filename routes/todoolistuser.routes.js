const express = require("express");
const todoolistuserRouter = express.Router();

const {
    getAllTodoolistuser,
    getTodoolistuserByID,
    addTodoolistuser,
    updateTodoolistuser,
    deleteTodoolistuser,
    deleteAllTodoolistuser,
} = require("../controllers/todoolistuser.controller");


todoolistuserRouter.get("/", getAllTodoolistuser);
todoolistuserRouter.get("/:id", getTodoolistuserByID);
todoolistuserRouter.post("/", addTodoolistuser);
todoolistuserRouter.put("/:id", updateTodoolistuser);
todoolistuserRouter.delete("/:id", deleteTodoolistuser);
todoolistuserRouter.delete("/", deleteAllTodoolistuser);

module.exports = todoolistuserRouter;