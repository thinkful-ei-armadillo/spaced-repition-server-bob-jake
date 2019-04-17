const express = require('express');
const LanguageService = require('./language-service');
const { requireAuth } = require('../middleware/jwt-auth');
const parser = express.json()


const languageRouter = express.Router();

languageRouter
  .use(requireAuth)
  .use(async (req, res, next) => {
    try {
      const language = await LanguageService.getUsersLanguage(
        req.app.get('db'),
        req.user.id,
      );

      if (!language)
        return res.status(404).json({
          error: 'You don\'t have any languages',
        });

      req.language = language;
      next();
    } catch (error) {
      next(error);
    }
  });

languageRouter
  .get('/', async (req, res, next) => {
    try {
      const words = await LanguageService.getLanguageWords(
        req.app.get('db'),
        req.language.id,
      );

      res.json({
        language: req.language,
        words,
      });
      next();
    } catch (error) {
      next(error);
    }
  });

languageRouter
  .get('/head', async (req, res, next) => {

    try {
      const nextWord = await LanguageService.getHead(
        req.app.get('db'),
        req.language.id);

      res.json({
        nextWord: nextWord.original,
        wordCorrectCount: nextWord.correct_count,
        wordIncorrectCount: nextWord.incorrect_count,
        totalScore: req.language.total_score
      });
      next();
    } catch (error) {
      next(error);
    }
  });

function display(sll) { 
  let currNode = sll.head; 
  while (currNode !== null) { 
    console.log(currNode.value); 
    currNode = currNode.next; 
  } 
}

languageRouter
  .post('/guess', parser, async (req, res, next) => {
    const guess = req.body.guess;
    if (!guess) {
      res.status(400).json({
        error: `Missing 'guess' in request body`
      });
    }
    try {
      const language = await LanguageService.getUsersLanguage(
        req.app.get('db'),
        req.user.id,
      );

      const words = await LanguageService.getLanguageWords(
        req.app.get('db'),
        req.language.id,
      );

      const head = await LanguageService.getHead(
        req.app.get('db'),
        req.language.id
      );
      const list = await LanguageService.createList(
        req.app.get('db'),
        words);
        
      let isCorrect;
      let tempNode = list.head;
      let answer = list.head.value.translation;
      let nextWord = tempNode.next.value.original;
      let correct_count = tempNode.next.value.correct_count;
      let incorrect_count = list.head.value.incorrect_count;
      let memory_value = tempNode.value.memory_value;

      if (guess === list.head.value.translation) {
        isCorrect = true;
        language.total_score += 1;
        tempNode.value.correct_count += 1;
        memory_value *= 2;
        tempNode.value.memory_value = memory_value;
        list.head = tempNode.next;
        list.insertAt(tempNode.value, memory_value)
        // list.remove(list.head.value);
      }
      
      else {
        // nextWord = original
        isCorrect = false;
        list.head.value.incorrect_count += 1;
        tempNode.value.memory_value = 1;
        // console.log(tempNode)
        list.head = tempNode.next;
        list.insertAt(tempNode.value, memory_value)
      }
      
      let results = {
        answer: answer,
        isCorrect: isCorrect,
        nextWord: nextWord,
        totalScore: language.total_score,
        wordCorrectCount: correct_count,
        wordIncorrectCount: list.head.value.incorrect_count
      }
      
      let updateArray = [];
      let loopNode = list.head;
      while (loopNode.next !== null) {
        updateArray = [...updateArray, loopNode.value]
        loopNode = loopNode.next;
      }
      updateArray = [...updateArray, loopNode.value]


      
      await LanguageService.insertWord(req.app.get('db'), updateArray, language.id, language.total_score);
      
    
      res.status(200).json(results)





      // const compare = await LanguageService.handleGuess(
      //   req.app.get('db'),
      //   req.language.id
      // )


      // if(compare.translation === guess){
      //   res.send('Congrats! You got it right');
      // } else {
      //   res.send('Wrong!');
      // }
      next();
    }
    catch (error) {
      next(error);
    }
  });


// const wordList = new LinkedList();
// nextWord.map(word => wordList.insertLast(word));
// let currentNode = wordList.head;
// res.json({
//   nextWord: currentNode.value.original,
//   wordCorrectCount: currentNode.value.correct_count,
//   wordIncorrectCount: currentNode.value.incorrect_count,
//   totalScore: req.language.total_score

module.exports = languageRouter;
