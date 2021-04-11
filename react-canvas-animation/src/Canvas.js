import useCanvas from './Hooks/useCanvas.js';

const Canvas = props => {
  const { draw, planets, type, ...rest } = props;
  const canvasRef = useCanvas(draw, type, planets);
  
  return <canvas ref={canvasRef} {...rest}/>
}

export default Canvas;