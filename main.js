const express = require('express');
const app = express();
const teachersRouter = require('./routes/teachersRoute');
const cors = require('cors');


app.use(cors()); 


app.use(express.json());


app.use('/teacher', teachersRouter);


app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
