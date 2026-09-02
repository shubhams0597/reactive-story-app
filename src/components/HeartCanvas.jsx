import React, { useEffect, useRef } from 'react';

export default function HeartCanvas({ phase }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const particles = [];
    const particleCount = phase === 'ending_no' ? 70 : 45;

    class Particle {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * width;
        this.y = height + Math.random() * 100;
        this.size = Math.random() * 12 + 8;
        this.speedY = Math.random() * 1.2 + 0.4;
        this.speedX = (Math.random() - 0.5) * 0.8;
        this.opacity = Math.random() * 0.6 + 0.2;
        this.color = phase === 'ending_no' 
          ? `rgba(180, 200, 255, ${this.opacity})` 
          : phase === 'ending_yes'
          ? `rgba(255, 215, 0, ${this.opacity})`
          : `rgba(255, 105, 135, ${this.opacity})`;
        this.isStar = phase === 'ending_no' && Math.random() > 0.4;
      }

      update() {
        this.y -= this.speedY;
        this.x += Math.sin(this.y * 0.01) * this.speedX;

        if (this.y < -30) {
          this.reset();
        }
      }

      draw() {
        ctx.fillStyle = this.color;
        if (this.isStar) {
          // Draw small twinkling star
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.size * 0.25, 0, Math.PI * 2);
          ctx.fill();
        } else {
          // Draw cute floating heart
          ctx.save();
          ctx.translate(this.x, this.y);
          ctx.beginPath();
          const topCurveHeight = this.size * 0.3;
          ctx.moveTo(0, topCurveHeight);
          ctx.bezierCurveTo(0, 0, -this.size / 2, 0, -this.size / 2, topCurveHeight);
          ctx.bezierCurveTo(-this.size / 2, (this.size + topCurveHeight) / 2, 0, this.size, 0, this.size);
          ctx.bezierCurveTo(0, this.size, this.size / 2, (this.size + topCurveHeight) / 2, this.size / 2, topCurveHeight);
          ctx.bezierCurveTo(this.size / 2, 0, 0, 0, 0, topCurveHeight);
          ctx.closePath();
          ctx.fill();
          ctx.restore();
        }
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      particles.forEach((p) => {
        p.update();
        p.draw();
      });
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [phase]);

  return <canvas ref={canvasRef} className="particle-canvas" />;
}
