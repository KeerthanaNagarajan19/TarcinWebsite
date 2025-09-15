import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Award, Download, X } from "lucide-react";
import { generateCertificatePDF } from "@/lib/certificate-pdf-generator";

interface CertificatePreviewModalProps {
  certificate: any;
  isOpen: boolean;
  onClose: () => void;
}

export const CertificatePreviewModal = ({
  certificate,
  isOpen,
  onClose
}: CertificatePreviewModalProps) => {
  const handleDownload = async () => {
    try {
      await generateCertificatePDF(certificate);
    } catch (error) {
      console.error("Failed to download certificate:", error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl w-full max-h-screen overflow-y-auto" data-testid="certificate-preview-modal">
        <DialogHeader className="flex flex-row items-center justify-between">
          <DialogTitle>Certificate Preview</DialogTitle>
          {/* <Button variant="ghost" size="icon" onClick={onClose} data-testid="button-close-modal">
            <X className="h-4 w-4" />
          </Button> */}
        </DialogHeader>

        <div
          className="relative shadow-2xl border mx-auto"
          style={{
            width: "1123px", // A4 landscape
            height: "794px", // A4 landscape
            backgroundImage: "url('/BGG3.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          data-testid="certificate-preview"
        >
          {/* Outer Border */}
          <div className="absolute inset-0 border-[20px] border-blue-950"></div>
          <div className="absolute inset-6 border-[1.5px] border-sky-600 m-2"></div>

          {/* Certificate Content */}
          <div className="relative z-10 p-12 w-full h-full">
            {/* Logos */}
            <div className="flex justify-between items-center mb-6">
              <img src="/tarcindarkblue1_1.png" alt="Logo Left" className="h-28" />
            </div>

            {/* <div className="relative w-full mb-6">
              <img
                // src="/AICTE.png"
                alt="Logo Right"
                className="h-20 absolute right-12 top-[-124px]"
              />
            </div> */}

            {/* Title */}
            <h1 className="text-4xl font-extrabold text-center text-gray-900 tracking-[0.2em]">
              CERTIFICATE OF COMPLETION
            </h1>

            <p className="text-center mt-4 text-gray-600 text-lg">
              This is to certify that
            </p>

            {/* Student Name */}
            <h2 className="text-6xl font-bold text-center mt-2 text-sky-600" data-testid="preview-recipient-name">
              {certificate.recipientName}
            </h2>

            {/* Decorative Line */}
            <div
              style={{
                position: "absolute",
                top: "345px",
                left: "50%",
                transform: "translateX(-50%)",
                width: "700px",
                borderTop: "4px solid black",
              }}
            ></div>

            {/* Body */}
            <p className="text-center mt-6 text-lg text-gray-800">
              Successfully completed a 4-week internship on{" "}
              <span className="font-bold" data-testid="preview-course">{certificate.course}</span>
            </p>
            <p className="text-center mt-2 text-gray-700" data-testid="preview-content">
              Duration: <span className="font-bold">{certificate.duration}</span> | Department:{" "}
              <span className="font-bold">{certificate.department }</span>
            </p>
            <p className="text-center mt-2 text-gray-700">
              a Microsoft initiative implemented by Edunet Foundation
            </p>
            <p className="text-center mt-2 text-gray-700">
              in collaboration with All India Council for Technical Education (AICTE)
            </p>
            <p className="text-center mt-2 text-gray-700">
              Institute: <span className="font-bold">Tarcin Robotic LLP</span>
            </p>

            {/* Certificate ID and Issue Date */}
            <div className="absolute bottom-12 left-12 text-sm text-gray-700 text-left font-bold">
              <p>Certificate ID:</p>
              <p data-testid="preview-certificate-id">{certificate.certificateId}</p>
              <p>Issue Date: {new Date(certificate.createdAt).toLocaleDateString()}</p>
            </div>

            {/* Seal */}
            <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 text-center">
              <img
                src="/Tarcin seal new 2025 blue (1).png"
                alt="Seal"
                className="h-28 mx-auto opacity-90"
              />
              <p className="mt-2 font-medium">Official Seal</p>
            </div>

            {/* Signature */}
            <div className="absolute bottom-12 text-center" style={{ right: "3rem" }}>
              <img
                src="/ARSADH_SIGN (1).png"
                alt="Signature"
                className="h-14 mx-auto"
              />
              <p className="mt-2 font-bold">Authorized Signatory</p>
              <p className="text-sm text-gray-600">Tarcin Robotic LLP</p>
            </div>
          </div>
        </div>


        {/* <div className="flex justify-end space-x-3 p-6 border-t border-gray-200">
          <Button variant="outline" onClick={onClose} data-testid="button-modal-close">
            Close
          </Button>
          <Button onClick={handleDownload} data-testid="button-download-pdf">
            <Download className="h-4 w-4 mr-2" />
            Download PDF
          </Button>
        </div> */}
      </DialogContent>
    </Dialog>
  );
};
