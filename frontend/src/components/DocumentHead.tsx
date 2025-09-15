import React from 'react';
import { Helmet } from 'react-helmet';

interface DocumentHeadProps {
  title: string;
  description: string;
  keywords?: string;
}

export default function DocumentHead({ title, description, keywords }: DocumentHeadProps) {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
    </Helmet>
  );
}