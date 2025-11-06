import { getConnectionObject } from "../configs/dbconfigs.js";

// User purchases a policy
// export async function purchasePolicy(req, res) {
//   const { user_id, policy_id } = req.body;
//   try {
//     const db = getConnectionObject();
//     await db.query("INSERT INTO user_policies (user_id, policy_id) VALUES (?,?)", [user_id, policy_id]);
//     res.json({ message: "Policy purchased successfully" });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// }


export async function purchasePolicy(req, res) {
  const { user_id, policy_id } = req.body;

  try {
    const db = getConnectionObject();

    // ✅ Check if the user already purchased this policy
    const [existing] = await db.query(
      "SELECT * FROM user_policies WHERE user_id = ? AND policy_id = ?",
      [user_id, policy_id]
    );

    if (existing.length > 0) {
      return res.status(400).json({ message: "Policy already purchased" });
    }

    // ✅ If not, insert the new record
    await db.query(
      "INSERT INTO user_policies (user_id, policy_id) VALUES (?, ?)",
      [user_id, policy_id]
    );

    res.json({ message: "Policy purchased successfully" });
  } catch (err) {
    console.error("Purchase error:", err);
    res.status(500).json({ error: err.message });
  }
}


// User views their purchased policies
export async function getUserPurchases(req, res) {
  const user_id = req.params.user_id;
  try {
    const db = getConnectionObject();
    const [rows] = await db.query(
      `SELECT up.*, p.policy_name, p.premium_amount, p.duration_years
       FROM user_policies up 
       JOIN policies p ON up.policy_id = p.policy_id
       WHERE up.user_id=?`,
      [user_id]
    );
    res.json(rows);
  } catch (err) {
    console.error("❌ Error in getUserPurchases:", err);
    res.status(500).json({ error: err.message });
  }
}

// Admin views all purchases
export async function getAllPurchases(req, res) {
  try {
    const db = getConnectionObject();
    const [rows] = await db.query(
      `SELECT up.*, u.name AS user_name, p.policy_name 
       FROM user_policies up 
       JOIN users u ON up.user_id = u.user_id 
       JOIN policies p ON up.policy_id = p.policy_id`
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
