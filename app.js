const fs = require('fs');
const path = require('path');
const express = require('express');

const app = express();
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res) => {
    res.sendFile(path.join(__dirname,'views','main.html'));
});

app.listen(4000, () => {
    console.log(`Server running at http://localhost:4000/`);
  });