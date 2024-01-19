const mongoose = require('mongoose');
const express = require('express');
const path = require('path');
require('dotenv').config({path: path.join(__dirname, '../Backend/local.env')});

const app = require('./app');

const DBurl = process.env.DATABASE_URL;
const DBName = process.env.DATABASE_NAME;
  
  mongoose.connect(`${DBurl}/${DBName}`).then(() => console.log('🚀DB connection successful!🚀'));
  
  const PORT = process.env.PORT;
  app.listen(PORT, () => {
    console.log(`🚀🚀🚀 Server Up and Running at PORT ::${PORT}🚀🚀🚀`);
  });

