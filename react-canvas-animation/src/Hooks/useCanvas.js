import { useRef, useEffect } from 'react';

const useCanvas = (draw, type, planets) => {
  const canvasRef = useRef(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let stageWidth = window.innerWidth;
    let stageHeight = window.innerHeight;
    
    const resize = () => {
      const ratio = window.devicePixelRatio;

      stageWidth = window.innerWidth;
      stageHeight = window.innerHeight;

      canvas.width = stageWidth * ratio;
      canvas.height = stageHeight * ratio;

      canvas.style.width = stageWidth + 'px';
      canvas.style.height = stageHeight + 'px';
      canvas.style.position = 'absolute';
      document.body.style.margin = '0';

      ctx.scale(ratio, ratio);
      
      window.addEventListener('resize', resize);
    }

    let animationFrameId;

    const animate = () => {
      draw(ctx, stageWidth, stageHeight, planets);
      
      if (type === 'dynamic') {
        animationFrameId = window.requestAnimationFrame(animate);
      }
    }
    resize();
    animate();
    
    return () => {
      if (type === 'dynamic') {
        window.cancelAnimationFrame(animationFrameId);
      }
      window.removeEventListener('resize', resize);
    }
  }, [draw, type, planets]);
  
  return canvasRef
}

export default useCanvas;