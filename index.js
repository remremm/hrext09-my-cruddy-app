const express = require('express');
const app = express();

app.use(express.static('app'));

app.listen(3000, function(){
  console.log('listening on port 3000');
});
