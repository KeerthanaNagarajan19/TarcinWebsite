


// import React, { useState } from "react";

// interface ExpandableTextProps {
//   text: string;
//   limit?: number;
//   isHtml?: boolean;
// }

// export const ExpandableText: React.FC<ExpandableTextProps> = ({
//   text,
//   limit = 100,
//   isHtml = false,
// }) => {
//   const [expanded, setExpanded] = useState(false);

//   const toggleExpanded = () => setExpanded((prev) => !prev);

//   if (text.length <= limit) {
//     return isHtml ? (
//       <div className="text-gray-600" dangerouslySetInnerHTML={{ __html: text }} />
//     ) : (
//       <p className="text-gray-600">{text}</p>
//     );
//   }

//   const displayText = expanded ? text : `${text.substring(0, limit)}...`;

//   return (
//     <div>
//       {isHtml ? (
//         <div className="text-gray-600" dangerouslySetInnerHTML={{ __html: displayText }} />
//       ) : (
//         <p className="text-gray-600">{displayText}</p>
//       )}
//       <button
//         className="text-blue-600 font-medium hover:underline ml-1"
//         onClick={toggleExpanded}
//       >
//         {expanded ? "Show less" : "Read more"}
//       </button>
//     </div>
//   );
// };


import React, { useState } from "react";

interface ExpandableTextProps {
  text: string;
  limit?: number;
}

export const ExpandableText: React.FC<ExpandableTextProps> = ({
  text,
  limit = 100,
}) => {
  const [expanded, setExpanded] = useState(false);

  // Clean text by trimming unnecessary spaces
  const cleanText = text?.trim() || "";

  // When expanded, show the full HTML
  if (expanded || cleanText.length <= limit) {
    return (
      <div>
        <div
          className="text-gray-600 dark:text-gray-300 mb-2"
          dangerouslySetInnerHTML={{ __html: cleanText }}
        />
        {cleanText.length > limit && (
          <button
            className="text-blue-600 font-medium hover:underline ml-1"
            onClick={() => setExpanded(false)}
          >
            Show less
          </button>
        )}
      </div>
    );
  }

  // When not expanded, truncate only the text content (not cutting HTML tags)
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = cleanText;
  const plainText = tempDiv.textContent || tempDiv.innerText || "";
  const shortText = plainText.substring(0, limit);

  return (
    <div>
      <div
        className="text-gray-600 dark:text-gray-300 mb-2"
        dangerouslySetInnerHTML={{ __html: shortText + "..." }}
      />
      <button
        className="text-blue-600 font-medium hover:underline ml-1"
        onClick={() => setExpanded(true)}
      >
        Read more
      </button>
    </div>
  );
};
