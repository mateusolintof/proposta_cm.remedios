"use client";

import { useState } from "react";

type Props = {
  alt: string;
  width: number;
  height: number;
  className?: string;
};

export default function Logo({ alt, width, height, className }: Props) {
  const sources = [
    "/branding/logo.svg",
    "/branding/logo-21anos.png",
    "/branding/cmremedios-logo.png",
  ];
  const [idx, setIdx] = useState(0);

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={sources[idx]}
      alt={alt}
      width={width}
      height={height}
      className={className}
      onError={() => setIdx((i) => Math.min(i + 1, sources.length - 1))}
      decoding="async"
    />
  );
}

