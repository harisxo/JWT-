=>Built an Authentication API with JWT Token in Node.js:

=>JWT to sign the credentials and bycrypt to encrypt the password before storing them in our database.

Validations: Unique "Email & Password"
Uppercase() emails converted to standard lowercase().
bcrypt.compare(password, user.password) - Compares the password entered against a user.