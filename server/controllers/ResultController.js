const Result = require("../models/resultSchema");


const createResult = async (req, res) => {
    try {
      const { name, score, age, correctWords, incorrectWords } = req.body;
      const result = await Result.create({ name, score, readingAge: age, correctWords, incorrectWords });
      console.log('Sending response:', { correctWords: result.correctWords, incorrectWords: result.incorrectWords });
      res.status(200).json({ message: "Result Created Successfully", score: result.score, correctWords: result.correctWords, incorrectWords: result.incorrectWords });
    } catch (err) {
      console.log(err.message);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };

// const getAllResult = async (req,res) => {
//     try{
//         const result = await Result.find();
//         res.status(200).json(result);
//     }catch(err){
//         console.log(err.message);
//         res.status(500).json({message: "Internal Server Error"})
//     }
// }

const getAllResult = async (req, res) => {
  try {
      const { page = 1, limit = 10 } = req.query;
      const results = await Result.find()
          .limit(limit * 1)
          .skip((page - 1) * limit)
          .exec();
      const count = await Result.countDocuments();
      res.status(200).json({
          results,
          totalPages: Math.ceil(count / limit),
          currentPage: page
      });
  } catch (err) {
      console.log(err.message);
      res.status(500).json({ message: "Internal Server Error" });
  }
};


module.exports = {createResult, getAllResult}