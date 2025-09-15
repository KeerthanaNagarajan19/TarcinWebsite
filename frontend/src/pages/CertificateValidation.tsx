"use client";

import { useState, ChangeEvent, useEffect, useRef } from "react";
import axios from "axios";
import { format } from "date-fns";
import html2canvas from "html2canvas";
import QRCode from "qrcode";
import dayjs from "dayjs";

const VFImage = new URL("../assets/VF.png", import.meta.url).href;

interface Certificate {
  [key: string]: any;
}

export default function CertificateValidation() {
  const [certId, setCertId] = useState("");
  const [dob, setDob] = useState<string>("");
  const [certificate, setCertificate] = useState<Certificate | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState<string | null>(null);
  const [showAnimation, setShowAnimation] = useState<boolean | null>(null);

  const offscreenRef = useRef<HTMLDivElement>(null);

  const handleCertIdChange = (e: ChangeEvent<HTMLInputElement>) =>
    setCertId(e.target.value);

  const handleDobChange = (e: ChangeEvent<HTMLInputElement>) =>
    setDob(e.target.value);

  const [qrSrc, setQrSrc] = useState<string | null>(null);
  useEffect(() => {
    if (certificate?.certificateId) {
      const url =
        window.location.origin +
        "/certificate-validation?certificateId=" +
        certificate.certificateId;

      QRCode.toDataURL(url, { width: 100, margin: 1 })
        .then(setQrSrc)
        .catch(console.error);
    }
  }, [certificate]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const certIdFromUrl = params.get("certificateId");
    if (certIdFromUrl) {
      setCertId(certIdFromUrl);
    }
  }, []);

  const handleValidate = async () => {
    setError("");
    setCertificate(null);
    setImage(null);
    setShowAnimation(null);

    if (!certId || !dob) {
      setError("Please enter both Certificate ID and Date of Birth.");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post(`/api/validateCertificate`, { certId, dob });
      setShowAnimation(true);
      setTimeout(() => {
        setShowAnimation(null);
        setCertificate(res.data);
      }, 1500);
    } catch (err: any) {
      setShowAnimation(false);
      setTimeout(() => {
        setShowAnimation(null);
        setError("Certificate not found.");
      }, 1500);
    } finally {
      setLoading(false);
    }
  };

  // Automatically generate static image when certificate is loaded
  useEffect(() => {
    const generateStatic = async () => {
      if (!certificate || !offscreenRef.current) return;

      const canvas = await html2canvas(offscreenRef.current, { scale: 4 });
      // export at full JPEG quality
      setImage(canvas.toDataURL("image/jpeg", 1.0));
    };
    generateStatic();
  }, [certificate, qrSrc]);

  return (
    <div className="min-h-screen w-full flex flex-col items-center bg-gray-100 pt-20 px-4">
      <h1 className="text-3xl font-bold mb-6">Certificate Validation</h1>

      {/* Search Form */}
      {!certificate && !showAnimation && error === "" && (
        <div className="w-full max-w-2xl p-6 bg-white border rounded shadow flex flex-col items-center space-y-4">
          <div className="w-full">
            <label
              htmlFor="certId"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Certificate ID
            </label>
            <input
              id="certId"
              type="text"
              placeholder="TR-2025/CSE/00016"
              value={certId}
              onChange={handleCertIdChange}
              className="p-2 w-full rounded focus:outline-none focus:ring-1"
              style={{
                borderImage: "linear-gradient(90deg, #16a34a, #4ade80) 1",
                borderWidth: "2px",
                borderStyle: "solid",
              }}
            />
          </div>

          <div className="w-full">
            <label
              htmlFor="dob"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Date of Birth
            </label>
            <input
              id="dob"
              type="date"
              value={dob}
              onChange={handleDobChange}
              className="p-2 w-full rounded focus:outline-none focus:ring-1"
              style={{
                borderImage: "linear-gradient(90deg, #16a34a, #4ade80) 1",
                borderWidth: "2px",
                borderStyle: "solid",
              }}
              max={new Date().toISOString().split("T")[0]}
            />
          </div>

          <button
            onClick={handleValidate}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
            disabled={loading}
          >
            {loading ? "Validating..." : "Validate"}
          </button>

          {error && <p className="text-red-500 mt-2">{error}</p>}
        </div>
      )}

      {/* Animation Container - Only shows temporarily */}
      {showAnimation !== null && (
        <div className="w-full flex justify-center items-center h-64">
          {showAnimation ? (
            // Success Checkmark
            <svg
              className="checkmark"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 52 52"
            >
              <circle
                className="checkmark_circle"
                cx="26"
                cy="26"
                r="25"
                fill="none"
              />
              <path
                className="checkmark_check"
                fill="none"
                d="M14.1 27.2l7.1 7.2 16.7-16.8"
              />
            </svg>
          ) : (
            // ❌ Error Cross
            <svg
              className="checkmark error"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 52 52"
            >
              <circle
                className="checkmark_circle error"
                cx="26"
                cy="26"
                r="25"
                fill="none"
              />
              <path
                className="checkmark_check error"
                fill="none"
                d="M16 16 36 36 M36 16 16 36"
              />
            </svg>
          )}
        </div>
      )}

      {/* Certificate + Details - Shows after animation completes */}
      {certificate && image && !showAnimation && (
        <div className="mt-8 w-full max-w-7xl flex flex-col lg:flex-row gap-6">
          {/* Left: Static Certificate Image */}
          <div className="flex-1 flex justify-center items-center bg-white shadow-lg rounded-xl p-4">
            <img
              src={image}
              alt="Certificate"
              className="w-full max-w-[1123px] h-auto"
            />
          </div>

          {/* Right: Certificate Details */}
          <div className="flex-1 relative rounded-2xl p-[3px]">
            {/* Gradient Border Wrapper */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-green-600 to-green-400"></div>

            {/* Inner White Box */}
            <div className="relative bg-white rounded-2xl shadow-lg p-6 h-full flex flex-col items-center justify-between">
              <div className="w-full">
                <h2 className="font-semibold text-lg mb-4 text-center">
                  Certificate Details
                </h2>
                <p>
                  <strong>Name:</strong> {certificate.recipientName}
                </p>
                <p>
                  <strong>Course:</strong> {certificate.course}
                </p>
                <p>
                  <strong>Department:</strong> {certificate.department}
                </p>
                <p>
                  <strong>Issue Date:</strong>{" "}
                  {certificate.createdAt
                    ? format(new Date(certificate.createdAt), "dd MMM yyyy")
                    : "N/A"}
                </p>
                <p>
                  <strong>Certificate ID:</strong> {certificate.certificateId}
                </p>
              </div>

              {/* Centered Logo */}
              <img
                src={VFImage}
                alt="Certificate Logo"
                className="w-20 h-20 rounded-full border shadow-md hover:scale-110 transition-transform cursor-pointer mt-6"
              />

              {/* Centered Button */}
              <button
                onClick={async () => {
                  if (!image) return;

                  const pdf = new (await import("jspdf")).jsPDF({
                    orientation: "landscape",
                    unit: "px",
                    format: [1123, 794],
                  });

                  pdf.addImage(
                    image,
                    "JPEG",
                    0,
                    0,
                    1123,
                    794,
                    undefined,
                    "NONE"
                  );
                  pdf.save(`${certificate.recipientName || "certificate"}.pdf`);
                }}
                className="mt-6 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition text-center"
              >
                Download Certificate (PDF)
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Error Message - Shows after animation completes */}
      {error && !showAnimation && !certificate && (
        <div className="w-full max-w-2xl p-6 bg-white border rounded shadow flex flex-col items-center space-y-4">
          <p className="text-red-500 mt-2">{error}</p>
          <button
            onClick={() => {
              setError("");
              setCertificate(null);
              setImage(null);
              setShowAnimation(null);
            }}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
          >
            Try Again
          </button>
        </div>
      )}

      {/* Offscreen dynamic certificate for capturing */}
      {certificate && !image && (
        <div
          className="absolute top-[-9999px] left-[-9999px]"
          ref={offscreenRef}
        >
          <div
            className="relative w-[1123px] h-[794px] bg-white shadow-2xl border"
            style={{
              backgroundImage: "url('/certificateAssets/BGF.png')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            {/* Borders */}
            <div className="absolute inset-0 border-[20px] border-blue-950"></div>
            <div className="absolute inset-6 border-[1.5px] border-sky-600 m-2"></div>

            {/* Content */}
            <div className="relative w-full h-full p-12 absolute ">
              <div className="flex justify-between items-center mb-6">
                <img src="" alt="Logo Left" className="h-28" />
              </div>

              <h1 className="text-4xl font-extrabold text-center text-gray-900 tracking-[0.2em]">
                CERTIFICATE OF COMPLETION
              </h1>

              <p className="text-center mt-4 text-gray-600 text-lg ">
                This is to certify that
              </p>

              <h2 className="text-6xl font-bold text-center mt-1 text-sky-600">
                {certificate.recipientName}
              </h2>

              {/* Content from DB */}

              <div className="absolute top-4 left-0 w-full h-full flex justify-center items-center px-12">
                <p
                  className="text-center"
                  style={{
                    fontSize: "clamp(12px, 1.4vw, 16px)",
                    color: "rgb(51, 65, 85)",
                    fontFamily: "Helvetica, Arial, sans-serif",
                    lineHeight: "1.7",
                    maxWidth: "80%",
                    margin: "0 auto",
                  }}
                  data-testid="preview-content"
                >
                  {certificate.content}
                </p>
              </div>
              
              <div
                style={{
                  position: "absolute",
                  top: "360px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: "700px",
                  borderTop: "4px solid black",
                }}
              ></div>
              <div
                className="absolute text-left"
                style={{
                  bottom: "8.8%",
                  left: "3.6%",
                  fontSize: "clamp(8px, 0.9vw, 10px)",
                  color: "rgb(71, 85, 105)",
                  fontFamily: "Courier, monospace",
                  lineHeight: "1.5",
                }}
              >
                <p>
                  Certificate ID:{" "}
                  <span data-testid="preview-certificate-id">
                    {certificate.certificateId}
                  </span>
                </p>
                <p>
                  Issue Date:{" "}
                  {dayjs(certificate.createdAt ?? Date.now()).format(
                    "DD/MM/YYYY"
                  )}
                </p>
              </div>
              {/* QR Code */}
              {qrSrc && (
                <img
                  src={qrSrc}
                  style={{
                    position: "absolute",
                    bottom: "12%",
                    left: "4.5%",
                    width: "80px",
                    height: "80px",
                  }}
                />
              )}
            </div>
          </div>
        </div>
      )}

      <style jsx global>{`
        .checkmark {
          width: 56px;
          height: 56px;
          border-radius: 50%;
          display: block;
          stroke-width: 2;
          stroke: #fff;
          stroke-miterlimit: 10;
          box-shadow: inset 0px 0px 0px #7ac142;
          animation: fill 0.4s ease-in-out 0.4s forwards,
            scale 0.3s ease-in-out 0.9s both;
        }

        .checkmark_circle {
          stroke-dasharray: 166;
          stroke-dashoffset: 166;
          stroke-width: 2;
          stroke-miterlimit: 10;
          stroke: #7ac142;
          fill: none;
          animation: stroke 0.6s cubic-bezier(0.65, 0, 0.45, 1) forwards;
        }

        .checkmark_circle.error {
          stroke: #ef4444;
        }

        .checkmark_check {
          transform-origin: 50% 50%;
          stroke-dasharray: 48;
          stroke-dashoffset: 48;
          animation: stroke 0.3s cubic-bezier(0.65, 0, 0.45, 1) 0.8s forwards;
        }

        .checkmark_check.error {
          stroke-dasharray: 60;
          stroke-dashoffset: 60;
        }

        @keyframes stroke {
          100% {
            stroke-dashoffset: 0;
          }
        }
        @keyframes scale {
          0%,
          100% {
            transform: none;
          }
          50% {
            transform: scale3d(1.1, 1.1, 1);
          }
        }
        @keyframes fill {
          100% {
            box-shadow: inset 0px 0px 0px 30px #7ac142;
          }
        }
        @keyframes fill-error {
          100% {
            box-shadow: inset 0px 0px 0px 30px #ef4444;
          }
        }

        .checkmark.error {
          animation: fill-error 0.4s ease-in-out 0.4s forwards,
            scale 0.3s ease-in-out 0.9s both;
        }
      `}</style>
    </div>
  );
}
