import UserModule from "../models/user.module.js";
import CustomerModel from "../models/customer.module.js"
import DriverModel from "../models/driver.module.js";
import bcrypt from 'bcrypt';


// GET /users
const getUsers = async (req, res) => {
  try {
    const users = await UserModule.findAll({
      attributes: { exclude: ['password'] }
    });
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getIdClientbyIduser = async(req, res) => {
  try {
    const { id } = req.params;
    const client = await CustomerModel.findOne({where: {UserID:id}})
    res.json(client);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
} 

const getIdDiverbyIduser = async(req, res) => {
  try {
    const { id } = req.params;
    const client = await DriverModel.findOne({where: {UserID:id}})
    res.json(client);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
} 

// GET /users/:id
const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await UserModule.findByPk(id);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// POST /users
const createUser = async (req, res) => {
  const { password } = req.body;

  try {

    // Encrypt password
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = { ...req.body, ['password']: hashedPassword }

    await UserModule.create(user)
    res.json({
        "message":"user created successfully"
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// PUT /users/:id
const updateUser = async (req, res) => {
  try {
    await UserModule.update(req.body,{where:{id:req.params.id}})
    res.json({
        "message": "User updated successfully"
    })
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// DELETE /users/:id
const deleteUser = async (req, res) => {
  try {
    await UserModule.destroy({where:{id: req.params.id}})
    res.json({
      "message": "Record deleted successfully"
    })
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export { getUsers, getUserById, createUser, updateUser, deleteUser, getIdClientbyIduser,getIdDiverbyIduser };
