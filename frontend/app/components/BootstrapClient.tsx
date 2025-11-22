"use client";

import Script from "next/script";

export default function BootstrapClient() {
  return (
    <>
      <Script
        src="/assets/js/bootstrap.bundle.min.js"
        strategy="afterInteractive"
      />

      <Script
        src="/assets/js/custom.js"
        strategy="afterInteractive"
      />
    </>
  );
}
