import mongoose from "mongoose";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import { User } from "./models/home-model";
import {
  RoomOccupancy,
  InvoiceHistory,
  Payment,
  DamageReporting,
  UserReport,
  UserDetail,
  Room, 
} from "./models/penghuni-model";

dotenv.config();

const mongoURI = process.env.MONGO_URI || "";

const seedDatabase = async () => {
  if (!mongoURI) {
    console.error("Error: MONGO_URI is not defined in the .env file.");
    return;
  }

  try {
    await mongoose.connect(mongoURI);
    console.log("Connected to MongoDB");

    // Seed Admin User
    const admin = [
      {
        username: "admin",
        password: await bcrypt.hash("admin123", 10),
        role: "ADMIN",
      },
      {
        username: "yanto",
        password: await bcrypt.hash("yanto123", 10),
        role: "ADMIN",
      },
    ];

    for (const adminUser of admin) {
      const existingAdmin = await User.findOne({
        username: adminUser.username,
      });
      if (!existingAdmin) {
        await User.create(adminUser);
        console.log(`Admin user ${adminUser.username} created`);
      } else {
        console.log(`Admin user ${adminUser.username} already exists`);
      }
    }

    // Seed Regular Users
    const users = [
      {
        username: "ray",
        password: await bcrypt.hash("ray123", 10),
        role: "USER",
      },
      {
        username: "malvin",
        password: await bcrypt.hash("malvin123", 10),
        role: "USER",
      },
      {
        username: "erine",
        password: await bcrypt.hash("erine123", 10),
        role: "USER",
      },
      {
        username: "oline",
        password: await bcrypt.hash("oline123", 10),
        role: "USER",
      },
      {
        username: "salomo",
        password: await bcrypt.hash("salomo123", 10),
        role: "USER",
      },
    ];

    const savedUsers = [];
    for (const user of users) {
      let savedUser = await User.findOne({ username: user.username });
      if (!savedUser) {
        savedUser = await User.create(user);
        console.log(`User "${user.username}" added successfully.`);
      } else {
        console.log(`User "${user.username}" already exists. Skipping.`);
      }
      savedUsers.push(savedUser);
    }

    // Seed Room Occupancy
    const roomOccupancyData = [
      { empty: 5, filled: 5 }, // Example data
    ];

    await RoomOccupancy.deleteMany({});
    await RoomOccupancy.insertMany(roomOccupancyData);
    console.log("Room occupancy data seeded");

    // Seed Invoice History
    const invoiceHistoryData = [
      { bill: 6000000, created_at: new Date() },
      { bill: 12000000, created_at: new Date() },
    ];

    await InvoiceHistory.deleteMany({});
    const savedInvoices = await InvoiceHistory.insertMany(invoiceHistoryData);
    console.log("Invoice history data seeded");

    // Seed Payments
    const paymentData = [
      {
        total_bill: 6000000,
        payment_method: "QRIS",
        rent_periods: 3,
      },
      {
        total_bill: 12000000,
        payment_method: "BANK_TRANSFER",
        rent_periods: 6,
      },
    ];

    await Payment.deleteMany({});
    await Payment.insertMany(paymentData);
    console.log("Payment data seeded");

    // Seed Damage Reports
    const damageReports = [
      {
        user: savedUsers[0]._id, // User ray
        message: "AC tidak berfungsi",
      },
      {
        user: savedUsers[1]._id, // User Malvin
        message: "Lampu kamar mati",
      },
    ];

    await DamageReporting.deleteMany({});
    await DamageReporting.insertMany(damageReports);
    console.log("Damage reports seeded");

    // Seed User Reports
    const userReports = [
      {
        message: "Penghuni kamar sebelah terlalu berisik",
      },
      {
        message: "Penghuni tidak menjaga kebersihan dapur bersama",
      },
    ];

    await UserReport.deleteMany({});
    await UserReport.insertMany(userReports);
    console.log("User reports seeded");

    // Seed User Details
    const userDetails = savedUsers.map((user, index) => ({
      user: user._id, // Simpan ID referensi user
      invoice_history: savedInvoices[index % savedInvoices.length]._id, // Simpan ID invoice
    }));

    await UserDetail.deleteMany({});
    await UserDetail.insertMany(userDetails);
    console.log("User details seeded");

    // Seed Rooms
    const rooms = Array.from({ length: 10 }, (_, i) => ({
      room_number: i + 1,
      status: i < 5 ? "FILLED" : "EMPTY", // 5 kamar terisi, 5 kamar kosong
    }));

    await Room.deleteMany({});
    await Room.insertMany(rooms);
    console.log("Rooms seeded successfully");
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    await mongoose.connection.close();
    console.log("MongoDB connection closed");
  }
};

// Run the seed function
seedDatabase();