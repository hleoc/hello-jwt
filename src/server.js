const app = require('./app');

const PORT = process.env.APP_PORT || 3001;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));