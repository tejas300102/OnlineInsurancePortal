import { hashSync } from "bcrypt";
// Generate the hash for 'admin123' using 12 salt rounds
const adminPasswordHash = hashSync("admin123", 12);
console.log(adminPasswordHash);