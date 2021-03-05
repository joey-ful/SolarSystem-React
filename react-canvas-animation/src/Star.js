const Star = (ctx, stageWidth, stageHeight) => {
  let radius = Math.random() * 1 + 0.1;
  let x = radius + Math.random() * (stageWidth - radius * 2);
  let y = radius + Math.random() * (stageHeight - radius * 2);

  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.fillStyle = 'cyan';
  ctx.shadowColor = 'cyan';
  ctx.shadowBlur = 30;
  ctx.fill();
  ctx.closePath();
}

export default Star;