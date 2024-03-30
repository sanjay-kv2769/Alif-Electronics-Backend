const express = require('express');
const complaintsDB = require('../models/complaintSchema');
const technicianRoutes = express.Router();

const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const sparepartsDB = require('../models/sparepartsSchema');
const productsDB = require('../models/productsSchema');

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_KEY,
  api_secret: process.env.CLOUD_SECRET,
});
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'vatakara projects/medicine management',
  },
});

const upload = multer({ storage: storage });

// get all complaints
technicianRoutes.get('/view-complaint', async (req, res) => {
  try {
    const Data = await complaintsDB.aggregate([
      {
        $lookup: {
          from: 'register_tbs',
          localField: 'login_id',
          foreignField: 'login_id',
          as: 'result',
        },
      },
      {
        $unwind: {
          path: '$result',
        },
      },
      {
        $group: {
          _id: '$_id',
          login_id: {
            $first: '$login_id',
          },
          brand: {
            $first: '$brand',
          },
          model: {
            $first: '$model',
          },
          complaint: {
            $first: '$complaint',
          },
          date: {
            $first: '$date',
          },
          status: {
            $first: '$status',
          },
          name: {
            $first: '$result.name',
          },
          phone: {
            $first: '$result.phone',
          },
        },
      },
    ]);
    if (Data) {
      return res.status(201).json({
        Success: true,
        Error: false,
        data: Data,
        Message: 'Complaint fetched successfully',
      });
    } else {
      return res.status(400).json({
        Success: false,
        Error: true,
        Message: 'Failed fetching Complaint ',
      });
    }
  } catch (error) {
    return res.status(500).json({
      Success: false,
      Error: true,
      Message: 'Internal Server Error',
      ErrorMessage: error.message,
    });
  }
});

// update complaint status
technicianRoutes.put(
  '/update-complaint-stat/:id/:booked_date',
  async (req, res) => {
    try {
      const loginId = req.params.id;
      const bookedDate = req.params.booked_date;

      const result = await complaintsDB.updateOne(
        { login_id: loginId, date: bookedDate },
        { $set: { status: 'fixed' } }
      );

      if (result.nModified === 0) {
        return res.status(404).json({ message: 'Staff member not found' });
      }

      return res
        .status(200)
        .json({ message: 'Service status updated successfully' });
    } catch (error) {
      return res.status(500).json({
        Success: false,
        Error: true,
        Message: 'Internal Server Error',
        ErrorMessage: error.message,
      });
    }
  }
);
// add spareparts
technicianRoutes.post(
  '/add-spareparts',
  upload.single('image'),
  async (req, res) => {
    try {
      const Product = {
        part_name: req.body.part_name,
        brand: req.body.brand,
        type: req.body.type,
        model: req.body.model,
        color: req.body.color,
        price: req.body.price,
        description: req.body.description,
        image: req.file ? req.file.path : null,
      };
      const Data = await sparepartsDB(Product).save();
      // console.log(Data);
      if (Data) {
        // const data = {
        //   Success: true,
        //   Error: false,
        //   Message: 'Turf added successfully',
        // };
        return res.status(201).json({
          Success: true,
          Error: false,
          data: Data,
          Message: 'Spare part added successfully',
          // return res.render('add-turf', { data });
        });
      } else {
        return res.status(400).json({
          Success: false,
          Error: true,
          Message: 'Failed adding Spare part ',
        });
        // const data = {
        //   Success: false,
        //   Error: true,
        //   Message: 'Failed adding turf ',
        // };
        // return res.render('add-turf', { data });
      }
    } catch (error) {
      return res.status(500).json({
        Success: false,
        Error: true,
        Message: 'Internal Server Error',
        ErrorMessage: error.message,
      });
    }
  }
);

// add used tv
technicianRoutes.post(
  '/add-used-tv',
  upload.single('image'),
  async (req, res) => {
    try {
      const Product = {
        brand: req.body.brand,
        type: req.body.type,
        model: req.body.model,
        color: req.body.color,
        price: req.body.price,
        description: req.body.description,
        image: req.file ? req.file.path : null,
      };
      const Data = await productsDB(Product).save();
      // console.log(Data);
      if (Data) {
        // const data = {
        //   Success: true,
        //   Error: false,
        //   Message: 'Turf added successfully',
        // };
        return res.status(201).json({
          Success: true,
          Error: false,
          data: Data,
          Message: 'Used TV added successfully',
          // return res.render('add-turf', { data });
        });
      } else {
        return res.status(400).json({
          Success: false,
          Error: true,
          Message: 'Failed adding Product ',
        });
        // const data = {
        //   Success: false,
        //   Error: true,
        //   Message: 'Failed adding turf ',
        // };
        // return res.render('add-turf', { data });
      }
    } catch (error) {
      return res.status(500).json({
        Success: false,
        Error: true,
        Message: 'Internal Server Error',
        ErrorMessage: error.message,
      });
    }
  }
);

module.exports = technicianRoutes;
