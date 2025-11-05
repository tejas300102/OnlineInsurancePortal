// import { hashSync } from "bcrypt";
// // Generate the hash for 'admin123' using 12 salt rounds
// const adminPasswordHash = hashSync("admin123", 12);
// console.log(adminPasswordHash);


import { hashSync } from "bcrypt";
import mysql from "mysql2/promise";

// 1️⃣ Hash the password you want
const adminPlainPassword = "salik"; // current password
const adminPasswordHash = hashSync(adminPlainPassword, 12);
console.log("Hashed password:", adminPasswordHash);

// 2️⃣ Update the admin password in your database
async function updateAdminPassword() {
    const connection = await mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "cdac",
        database: "insurance_db",
    });

    await connection.execute(
        "UPDATE admins SET password = ? WHERE admin_id = ?",
        [adminPasswordHash, 1] // 1 = admin_id of Salik
    );

    console.log("Admin password updated successfully!");
    await connection.end();
}

updateAdminPassword();
