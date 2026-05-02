"use client";

import { useEffect, useRef } from "react";

export default function CTABackground3D() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Handle resizing
    let width = canvas.offsetWidth;
    let height = canvas.offsetHeight;
    
    // Set internal resolution to match display resolution for sharpness
    const setSize = () => {
      width = canvas.offsetWidth;
      height = canvas.offsetHeight;
      const dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };
    
    setSize();
    window.addEventListener("resize", setSize);

    // Particle classes
    class Particle {
      x: number;
      y: number;
      z: number;
      radius: number;
      color: string;
      speed: number;

      constructor(color: string, radius: number, speed: number) {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.z = Math.random() * 2 + 0.1; // depth
        this.radius = radius;
        this.color = color;
        this.speed = speed;
      }

      update(deltaTime: number) {
        // Move slowly upwards
        this.y -= (this.speed * deltaTime * 0.05) / this.z;
        // Drift slightly horizontally
        this.x += (Math.sin(this.y * 0.01) * this.speed * deltaTime * 0.02) / this.z;

        // Wrap around
        if (this.y < -50) this.y = height + 50;
        if (this.x < -50) this.x = width + 50;
        if (this.x > width + 50) this.x = -50;
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        // The further away (z), the smaller and fainter
        const currentRadius = Math.max(0.1, this.radius / this.z);
        const opacity = Math.max(0.1, 1 - (this.z / 3));
        
        ctx.globalAlpha = opacity;
        ctx.arc(this.x, this.y, currentRadius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.globalAlpha = 1; // reset
      }
    }

    const particles: Particle[] = [];

    // Dark gold dust
    for (let i = 0; i < 80; i++) {
      particles.push(new Particle("#b8860b", 2, 0.4));
    }
    // Bright white/gold specs
    for (let i = 0; i < 40; i++) {
      particles.push(new Particle("#ffffff", 1.5, 0.8));
    }
    // Larger glowing orbs
    for (let i = 0; i < 15; i++) {
      particles.push(new Particle("#b87333", 5, 1.2));
    }

    let lastTime = performance.now();
    let animationFrameId: number;

    const render = (time: number) => {
      const deltaTime = time - lastTime;
      lastTime = time;

      ctx.clearRect(0, 0, width, height);

      // Add a subtle glow
      ctx.shadowBlur = 10;
      ctx.shadowColor = "#b87333";

      for (const p of particles) {
        p.update(deltaTime);
        p.draw();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("resize", setSize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
        pointerEvents: "none",
        opacity: 0.8,
      }}
    />
  );
}
