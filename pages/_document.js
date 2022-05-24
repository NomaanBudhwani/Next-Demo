import React from "react";
import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
    render() {
        return (
            <Html lang="en">
                <Head>
                    <meta charSet="utf-8" />
                    <meta name="theme-color" content="#000000" />
                    <link
                        rel="shortcut icon"
                        href={"/assets/img/brand/favicon.ico"}
                    />
                    <link
                        rel="apple-touch-icon"
                        sizes="76x76"
                        href={"/assets/img/brand/apple-icon.png"}
                    />
                    {/* Fonts and icons */}
                    <link
                        href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700"
                        rel="stylesheet"
                    />
                    <link
                        rel="stylesheet"
                        type="text/css"
                        href="/assets/css/nprogress.css"
                    />
                </Head>
                <body>
                    <div id="page-transition"></div>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default MyDocument;
