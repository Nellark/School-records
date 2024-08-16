const express = require('express');
const app = express();
const learnersRouter = require('./routes/learnersRoute');
const teachersRouter = require('./routes/teachersRoute');


app.use(express.json());

app.use('/learners', learnersRouter);
app.use('/teachers', teachersRouter);





app.listen(3000, () => {
    console.log('Server is running on port 3000');
});