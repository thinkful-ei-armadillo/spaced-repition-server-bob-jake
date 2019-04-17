const LinkedList = require('./linkedList')


const LanguageService = {
  getUsersLanguage(db, user_id) {
    return db
      .from('language')
      .select(
        'language.id',
        'language.name',
        'language.user_id',
        'language.head',
        'language.total_score',
      )
      .where('language.user_id', user_id)
      .first()
  },

  getLanguageWords(db, language_id) {
    return db
      .from('word')
      .select(
        'id',
        'language_id',
        'original',
        'translation',
        'next',
        'memory_value',
        'correct_count',
        'incorrect_count',
      )
      .where({ language_id })
  },
  
  getHead(db, languageId) {
    return db
      .from('word')
      .leftJoin('language', 'language.head','word.id')
      .where('language.id', languageId)
      .first()
  },

  getNextWord(db, id) {
    return db
      .from('word')
      .select('original','language_id','correct_count','incorrect_count')
      .where({ id })
      .first()
  },

  handleGuess(db, language_id){
    return db
      .from('word')
      .leftJoin('language', 'language.head', 'word.id')
      .select('*')
      .where({ language_id });
  },

  createList(db, language_id){
    const wordList = new LinkedList();
    this.getHead(db, language_id)
      .then(head => wordList
        .insertLast(head));
    console.log(wordList);
    return wordList;
  }
};

module.exports = LanguageService;
