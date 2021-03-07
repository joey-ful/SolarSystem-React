import useCanvas from '../Hooks/useCanvas.js';

const Canvas = props => {
  const { draw, type, ...rest } = props;
  const canvasRef = useCanvas(draw, type);
  
  return <canvas ref={canvasRef} {...rest}/>
}

export default Canvas;