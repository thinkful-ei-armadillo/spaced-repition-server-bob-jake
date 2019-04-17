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
        'language.total_score'
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

  insertWord(db, words, language_id, total_score) {
    return db 
      .transaction(async trx => {
        return Promise
          .all([trx('language')
            .where({id: language_id})
              .update({total_score, head: words[0].id}),
              ...words.map((word, index) => {
                if(index+1 >= words.length) {
                  word.next = null;
                }
                else {
                  word.next = words[index + 1].id;
                }
                return trx('word').where({id: word.id}).update({...word})
              })
            ])

      })
  },

  createList(db, wordArray){

    const wordList = new LinkedList();
    wordArray.map(word => {
      wordList.insertLast(word)
    })
    return wordList;
  }
};

module.exports = LanguageService;
