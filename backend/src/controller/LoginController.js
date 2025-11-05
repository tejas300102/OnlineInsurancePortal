// import { ROLES } from "../constants/RoleCOnstants.js";
// import { compareSync } from "bcrypt";
// import jwt from 'jsonwebtoken';
// import { getConnectionObject } from "../configs/dbconfigs.js";


// export async function login(request, response) {
//     try {
//         const connection = getConnectionObject();
//         const { phone, password, role } = request.body;
//         const tableName = role === ROLES.ADMIN ? 'admins' : 'users';
//         const qry = `SELECT * FROM ${tableName} WHERE phone='${phone}'`;
//         const [rows] = await connection.query(qry);
//         if (rows.length === 0) {
//             response.status(400).send({ message: "Login failed, phone doesn't exist" });
//         }
//         else {
//             if (compareSync(password, rows[0].password)) {
//                 const token = jwt.sign({
//                     userId: rows[0].id,
//                     role: role
//                 }, 'user1234');
//                 response.status(200).send({ token, message: 'Login successful' });
//             }
//             else {
//                 response.status(400).send({ message: "Login failed, password is invalid" });
//             }
//             // compare the password
//         }
//     } catch (error) {
//         console.log(error);
//         response.status(500).send({ message: 'Something went wrong' });
//     }
// }


import { ROLES } from "../constants/RoleConstants.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { getConnectionObject } from "../configs/dbconfigs.js";

export async function login(req, res) {
    try {
        const connection = getConnectionObject();
        const { email, password, role } = req.body;

        // Choose table based on role
        const tableName = role === ROLES.ADMIN ? "admins" : "users";
        console.log("Login attempt:", { email, role, tableName });  // 🔹 log incoming data

        // Fetch user by email
        const [rows] = await connection.query(
            `SELECT * FROM ${tableName} WHERE email = ?`,
            [email]
        );
        console.log("Query result:", rows);  // 🔹 log query result

        if (rows.length === 0) {
            return res.status(400).send({ message: "Email not found" });
        }

        const user = rows[0];
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).send({ message: "Invalid password" });
        }

        const token = jwt.sign(
            {
                id: role === ROLES.ADMIN ? user.admin_id : user.user_id,
                role,
            },
            "user1234",
            { expiresIn: "2h" }
        );

        res.status(200).send({ token, message: "Login successful" });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Something went wrong" });
    }
}
