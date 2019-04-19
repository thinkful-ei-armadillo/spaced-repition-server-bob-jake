# Viva Mexico - A Spaced repetition API!

# Endpoints- 

### /api/auth/token
* POST only endpoint
* This endpoint is for user credetial validation.
* If validation is passed, it will respond with a JWT Token.

### /api/language
* GET only endpoint
* Authorization required
* This endpoint will fetch the word list based on the user's language ID.

### /api/language/head
* GET only endpoint
* Authorization required
* This endpoint will fetch the first word in the word list.

### /api/language/guess
* POST only endpoint
* Authorization required
* This endpoint will take a user supplied value and compare it to the database's translation value for a specified word.

### /api/user
* POST only endpoint
* Open endpoint
* This endpoint is only for creating a new user profile with a word list that is unique to the user.

