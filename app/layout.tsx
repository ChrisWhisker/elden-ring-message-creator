import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Head from "next/head";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Elden Ring Message Generator - Create Messages Easily",
    description: "Generate custom messages for Elden Ring. Elden Scribe is an easy-to-use tool for creating Elden Ring messages.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <Head>
                <title>Elden Ring Message Generator - Create Custom Messages Easily</title>
                {/* Meta description */}
                <meta name="description" content="Generate custom messages for Elden Ring. Elden Scribe is an easy-to-use tool for creating Elden Ring messages." />
                {/* Viewport meta tag for responsive design */}
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                {/* Author meta tag */}
                <meta name="author" content="Chris Worcester" />
                {/* Keywords meta tag (historically used, less significant now) */}
                <meta name="keywords" content="Elden Ring, create Elden Ring messages, Elden Ring message generator, write Elden Ring messages" />
                {/* Open Graph meta tags for Facebook */}
                <meta property="og:title" content="Elden Ring Message Generator - Create Custom Messages Easily" />
                <meta property="og:description" content="Generate custom messages for Elden Ring with our easy-to-use message generator tool." />
                <meta property="og:url" content="https://example.com/elden-ring-message-generator" />
                <meta property="og:type" content="website" />
                {/* Twitter card meta tags */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Elden Ring Message Generator - Create Custom Messages Easily" />
                <meta name="twitter:description" content="Generate custom messages for Elden Ring with our easy-to-use message generator tool." />
                {/* Canonical URL tag */}
                <link rel="canonical" href="https://example.com/elden-ring-message-generator" />
                {/* Content language meta tag */}
                <meta http-equiv="Content-Language" content="en" />
            </Head>
            <body className={inter.className}>
                {children}
            </body>
        </html>
    );
}
