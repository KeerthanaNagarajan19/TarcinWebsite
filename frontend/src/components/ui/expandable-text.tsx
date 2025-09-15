


import React, { useState } from "react";

interface ExpandableTextProps {
  text: string;
  limit?: number;
  isHtml?: boolean;
}

export const ExpandableText: React.FC<ExpandableTextProps> = ({
  text,
  limit = 100,
  isHtml = false,
}) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = () => setExpanded((prev) => !prev);

  if (text.length <= limit) {
    return isHtml ? (
      <div className="text-gray-600" dangerouslySetInnerHTML={{ __html: text }} />
    ) : (
      <p className="text-gray-600">{text}</p>
    );
  }

  const displayText = expanded ? text : `${text.substring(0, limit)}...`;

  return (
    <div>
      {isHtml ? (
        <div className="text-gray-600" dangerouslySetInnerHTML={{ __html: displayText }} />
      ) : (
        <p className="text-gray-600">{displayText}</p>
      )}
      <button
        className="text-blue-600 font-medium hover:underline ml-1"
        onClick={toggleExpanded}
      >
        {expanded ? "Show less" : "Read more"}
      </button>
    </div>
  );
};
