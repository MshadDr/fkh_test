require('dotenv').config();
const app = require('./src/app');

const PORT = process.env.APP_PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on the http://localhost:${PORT}`);
});