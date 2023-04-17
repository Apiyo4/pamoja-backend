const express = require("express");
const router = express.Router();
const {
  getBooks,
  setBook,
  updateBook,
  deleteBook,
} = require("../controllers/bookController");
const { authCheck } = require("../middleware/authMiddleware");

router.get("/", authCheck, getBooks);
router.post("/", authCheck, setBook);
router.put("/:id", authCheck, updateBook);
router.delete("/:id", authCheck, deleteBook);
module.exports = router;