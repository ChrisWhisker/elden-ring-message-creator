"use client";

import { Inter } from "next/font/google";
import Head from "next/head";
import { useRouter } from "next/navigation";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

const customMetadata = {
    title: "Elden Ring Message Generator - Create Messages Easily",
    description: "Generate custom messages for Elden Ring. Elden Scribe is an easy-to-use tool for creating Elden Ring messages.",
    keywords: "Elden Ring, message generator, custom messages, game tool, Elden Scribe",
    author: "Chris Worcester",
    siteUrl: "https://example.com/elden-ring-message-generator",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const router = useRouter();
    const canonicalUrl = `${customMetadata.siteUrl}${router.asPath}`;

    return (
        <html lang="en">
            <Head>
                <title>{customMetadata.title}</title>
                <meta name="description" content={customMetadata.description} />
                <meta name="keywords" content={customMetadata.keywords} />
                {/* Meta tags for social media */}
                <meta name="author" content={customMetadata.author} />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta property="og:title" content={customMetadata.title} />
                <meta property="og:description" content={customMetadata.description} />
                <meta property="og:url" content={canonicalUrl} />
                <meta property="og:type" content="website" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={customMetadata.title} />
                <meta name="twitter:description" content={customMetadata.description} />
                <link rel="canonical" href={canonicalUrl} />
                <meta http-equiv="Content-Language" content="en" />
                <link rel="icon" href="/favicon.ico" />
                <style>{inter.styles}</style>
            </Head>
            <body className={inter.className}>
                {children}
            </body>
        </html>
    );
}
