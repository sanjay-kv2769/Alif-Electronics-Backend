const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');

const adminRoutes = require('./src/routes/adminRoutes');
const registerRoutes = require('./src/routes/registerRoutes');
const loginRoutes = require('./src/routes/loginRoutes');
const userRoutes = require('./src/routes/userRoutes');
const commonRoutes = require('./src/routes/commonRoutes');
const physicianRoutes = require('./src/routes/doctorRoutes');
const staffRoutes = require('./src/routes/staffRoutes');
const doctorRoutes = require('./src/routes/doctorRoutes');
const technicianRoutes = require('./src/routes/technicianRoutes');

mongoose
  .connect(
    'mongodb+srv://aseemmtk:wN5VarKvNFWi8bqJ@cluster0.64d02pt.mongodb.net/Alif_Electronics'
    // 'mongodb+srv://maitexaSS:EPZh8v1m2U0thLE2@vproject.p2z0nmk.mongodb.net/Alif_Electronics'
  )
  .then(() => {
    console.log('Database Connected');
  })
  .catch((error) => {
    console.log('Error:', error);
  });

app.use(express.static('./public'));
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set('view engine', 'ejs');
app.set('views', './src/views');

app.use('/api', commonRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/user', userRoutes);
app.use('/api/staff', staffRoutes);
app.use('/api/technician', technicianRoutes);
app.use('/api/register', registerRoutes);
app.use('/api/login', loginRoutes);

// app.get('/', (req, res) => {
//   res.send('hello world');
// });
app.get('/', (req, res) => {
  res.render('login.ejs', { Message: '' });
});

const PORT = 8081;
app.listen(PORT, () => {
  console.log('Server started on', PORT);
});
