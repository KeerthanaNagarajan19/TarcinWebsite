import { Request, Response } from "express";
import { Pool } from "pg";

export const validateCertificate = async (req: Request, res: Response) => {
  const certId = req.query.certId as string;

  if (!certId) {
    return res.status(400).json({ error: "Certificate ID is required" });
  }

  try {
    const query = "SELECT * FROM certificates WHERE certificate_id = $1 LIMIT 1";
    const { rows } = await pool.query(query, [certId]);

    if (rows.length === 0) {
      return res.status(404).json({ error: "Certificate not found" });
    }

    return res.json(rows[0]);
  } catch (error) {
    console.error("Database error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
