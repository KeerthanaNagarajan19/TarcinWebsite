import React from "react";
import { Helmet } from "react-helmet";

interface DocumentHeadProps {
  title: string;
  description: string;
  image?: string;
  type?: string;
  url?: string;
  ogTitle?: string;
  ogDescription?: string;
}

const DocumentHead: React.FC<DocumentHeadProps> = ({
  title,
  description,
  image = "/images/og-image.jpg", // Default image for Open Graph
  type = "website",
  url,
  ogTitle,
  ogDescription,
}) => {
  // Current URL if not specified
  const currentUrl = url || (typeof window !== "undefined" ? window.location.href : "");
  
  // Ensure title includes the company name
  const fullTitle = title.includes("Tarcin Robotic") ? title : `${title} | Tarcin Robotic`;
  
  return (
    <Helmet>
      {/* Basic meta tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:title" content={ogTitle || fullTitle} />
      <meta property="og:description" content={ogDescription || description} />
      {image && <meta property="og:image" content={image} />}
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={currentUrl} />
      <meta property="twitter:title" content={ogTitle || fullTitle} />
      <meta property="twitter:description" content={ogDescription || description} />
      {image && <meta property="twitter:image" content={image} />}
      
      {/* Additional meta tags for SEO */}
      <meta name="robots" content="index, follow" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="theme-color" content="#082f49" />
      <link rel="canonical" href={currentUrl} />
    </Helmet>
  );
};

export default DocumentHead;