const app = require('./app');
require('dotenv').config();

const port = process.env.PORT || 3000;

// Server up
app.listen(port, () => {
    console.log(`Server up at port: ${port}`);
});