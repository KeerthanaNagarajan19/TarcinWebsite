import { Router, Request, Response } from "express"
import { Pool } from "pg"

const router = Router()

const isProd = process.env.NODE_ENV === "production"
const isLocal =
  process.env.DATABASE_URL?.includes("127.0.0.1") ||
  process.env.DATABASE_URL?.includes("localhost")

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: isProd && !isLocal ? { rejectUnauthorized: false } : false,
})


// POST endpoint for certificate validation
router.post("/", async (req: Request, res: Response): Promise<void> => {
  const { certId, dob } = req.body

  if (!certId || !dob) {
    res.status(400).json({ message: "Certificate ID and DOB are required" })
    return
  }

  try {
    const query = `
      SELECT * FROM certificates 
      WHERE LOWER(certificate_id) = LOWER($1) AND dob = $2
      LIMIT 1
    `
    const { rows } = await pool.query(query, [certId, dob])

    if (rows.length === 0) {
      res.status(404).json({ message: "Certificate not found or DOB does not match" })
      return
    }

    const certificate = rows[0]

    const mappedCertificate = {
      recipientName: certificate.recipient_name,
      course: certificate.course,
      duration: certificate.duration || "",
      department: certificate.department || "",
      certificateId: certificate.certificate_id,
      createdAt: certificate.created_at,
      content: certificate.content,
    }

    res.json(mappedCertificate)
  } catch (err) {
    console.error("Database error:", err)
    res.status(500).json({ message: "Database error" })
  }
})

export default router
