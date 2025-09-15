// interface CertificatePreviewProps {
//   certificate: any;
// }

// export const CertificatePreview = ({ certificate }: CertificatePreviewProps) => {
//   return (
//     <div className="w-full h-full flex justify-center items-center bg-gray-100 overflow-hidden">
//       <div
//         className="relative w-full max-w-full h-full max-h-full bg-white shadow-2xl border"
//         style={{
//           aspectRatio: "1123 / 794", // A4 landscape
//           backgroundImage: "url('/assets/certificateAssets/BGF.png')",
//           backgroundSize: "cover",
//           backgroundPosition: "center",
//         }}
//       >
//         {/* Borders */}
//         <div className="absolute inset-0 border-[20px] border-blue-950"></div>
//         <div className="absolute inset-6 border-[1.5px] border-sky-600 m-2"></div>

//         {/* Content */}
//         <div className="relative w-full h-full p-6 md:p-12">
//           {/* Logos */}
//           <div className="flex justify-between items-center mb-6">
//             <img
//               src="/certificateAssets/tarcindarkblue1_1.png"
//               alt="Logo Left"
//               className="h-28"
//             />
//             <img
//               src="/assets/certificateAssets/AICTE.png"
//               alt="Logo Right"
//               className="h-28"
//             />
//           </div>

//           {/* Title */}
//           <h1 className="text-4xl font-extrabold text-center text-gray-900 tracking-[0.2em]">
//             CERTIFICATE OF COMPLETION
//           </h1>

//           <p className="text-center mt-4 text-gray-600 text-lg">This is to certify that</p>

//           {/* Student Name */}
//           <h2
//             className="text-6xl font-bold text-center mt-2 text-sky-600 truncate"
//             style={{ whiteSpace: "nowrap" }}
//           >
//             {certificate.recipientName}
//           </h2>

//           {/* Decorative Background Strip */}
//           <div
//             style={{
//               position: "absolute",
//               top: "50%",
//               left: "50%",
//               transform: "translate(-50%, -50%)",
//               width: "80%",
//               height: "6px",
//               backgroundColor: "#0ea5e9",
//               borderRadius: "3px",
//             }}
//           ></div>

      
//           <div className="absolute bottom-4 left-4 text-xs md:text-sm font-bold">
//             <p>Certificate ID:</p>
//             <p>{certificate.certificateId}</p>
//             <p>Issue Date: {new Date(certificate.createdAt).toLocaleDateString()}</p>
//           </div>
//           <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
//             <img
//               src="/assets/certificateAssets/tlogo.png"
//               alt="Bottom Logo"
//               className="h-10 md:h-16 opacity-80"
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };
