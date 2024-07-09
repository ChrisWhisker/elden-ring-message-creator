"use client";

import { Inter } from "next/font/google";
import Head from "next/head";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

const customMetadata = {
  title: "Elden Ring Message Creator - Easily Compose Custom Messages",
  description:
    "Generate custom messages for Elden Ring. Elden Scribe is an easy-to-use tool for creating Elden Ring messages.",
  keywords:
    "Elden Ring, message generator, custom messages, game tool, Elden Scribe",
  author: "Chris Worcester",
  siteUrl: "https://chriswhisker.github.io/elden-ring-message-creator/",
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <Head>
        <title>{customMetadata.title}</title>
        <meta name="description" content={customMetadata.description} />
        <meta name="keywords" content={customMetadata.keywords} />
        {/* Meta tags for social media */}
        <meta name="author" content={customMetadata.author} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        {/* Open Graph meta tags for Facebook */}
        <meta property="og:title" content={customMetadata.title} />
        <meta property="og:description" content={customMetadata.description} />
        <meta property="og:url" content={customMetadata.siteUrl} />
        <meta property="og:type" content="website" />
        {/* Twitter card meta tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={customMetadata.title} />
        <meta name="twitter:description" content={customMetadata.description} />
        {/* Canonical URL */}
        <link rel="canonical" href={customMetadata.siteUrl} />
        {/* Language */}
        <meta http-equiv="Content-Language" content="en" />
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body className={inter.className}>{children}</body>
    </html>
  );
};

export default RootLayout;
