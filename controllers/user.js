import { myCache } from "../index.js";
import User from "../models/user.js";

export const createUser = async (req, res) => {
  const { name, email, age, city, zipcode } = req.body;

  if (!name || !email || !age || !city || !zipcode) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const newUser = new User({
    name,
    email,
    age,
    city,
    zipcode,
  });

  try {
    await newUser.save();
    myCache.del("list-user");
    res.status(201).json("User created successfully");
  } catch (error) {
    return res.status(400).json({ error: "User creation failed" });
  }
};

export const listUser = async (req, res) => {
  let users;
  try {
    if (myCache.has("list-user")) {
      users = JSON.parse(myCache.get("list-user"));
    } else {
      users = await User.find();
      myCache.set("list-user", JSON.stringify(users));
    }
    res.status(200).json({
      users,
    });
  } catch (error) {
    res.status(404).json({ error: "No users found" });
  }
};

export const getUserDetails = async (req, res) => {
  const id = req.params.userId;
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "Invalid id" });
    }
    return res.status(200).json({
      user,
    });
  } catch (error) {
    return res.status(404).json({ error: "User not found" });
  }
};

export const updateUser = async (req, res) => {
  const id = req.params.userId;
  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        $set: {
          name: req.body.name,
          email: req.body.email,
          age: req.body.age,
          city: req.body.city,
          zipcode: req.body.zipcode,
        },
      },
      { new: true }
    );
    myCache.del("list-user");
    res.status(200).json(updatedUser);
  } catch (error) {
    return res.status(304).json({ error: "User updation unsuccessful" });
  }
};

export const deleteUser = async (req, res) => {
  const id = req.params.userId;
  try {
    await User.findByIdAndDelete(id);
    myCache.del("list-user");
    res.status(200).json("User has been deleted");
  } catch (error) {
    return res.status(400).json({ error: "User deletion unsuccessful" });
  }
};
