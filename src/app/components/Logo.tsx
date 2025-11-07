"use client";

import { useState } from "react";

type Props = {
  alt: string;
  width?: number; // modo 'contain': largura fixa (altura auto)
  height?: number; // ignorada em 'contain'
  className?: string;
  mode?: "contain" | "cover"; // cover preenche container (cropping mantendo proporção)
  containerWidth?: number; // usado com mode='cover'
  containerHeight?: number; // usado com mode='cover'
};

export default function Logo({ alt, width, className, mode = "contain", containerWidth, containerHeight }: Props) {
  const sources = [
    "/branding/logo-21anos.png",
    "/branding/cmremedios-logo.png",
    "/branding/logo.svg",
  ];
  const [idx, setIdx] = useState(0);

  if (mode === "cover" && containerWidth && containerHeight) {
    return (
      <div
        className={className}
        style={{ width: containerWidth, height: containerHeight, position: "relative", overflow: "hidden" }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={sources[idx]}
          alt={alt}
          style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }}
          onError={() => setIdx((i) => Math.min(i + 1, sources.length - 1))}
          decoding="async"
        />
      </div>
    );
  }

  // contain (default) — preserva proporção e não corta
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={sources[idx]}
      alt={alt}
      width={width}
      style={{ height: "auto" }}
      className={className}
      onError={() => setIdx((i) => Math.min(i + 1, sources.length - 1))}
      decoding="async"
    />
  );
}
