import { createCanvas, loadImage, registerFont } from 'canvas';
import path from 'path';

export default async function handler(req, res) {
  if (req.method !== 'GET')
    return res.status(404).json({ error: 'Only GET allowed' });

  if (!req.query.name || req.query.name.length < 3)
    return res
      .status(400)
      .json({ error: 'No name or name less than 3 letters' });

  let fileName = path.join(process.cwd(), 'src', 'cert', 'image.png');
  let fontName = path.join(process.cwd(), 'src', 'cert', 'font.ttf');
  let nameText = req.query.name.toUpperCase().split(' ').slice(0, 3).join(' ');

  const image = await loadImage(fileName);

  registerFont(fontName, { family: '29LT Kaff' });

  const canvas = createCanvas(image.width, image.height, 'pdf');
  const ctx = canvas.getContext('2d');

  ctx.drawImage(image, 0, 0);

  ctx.font = '32px "29LT Kaff"';
  ctx.fillStyle = '#11BAB1';
  ctx.fillText(nameText, 120, 455);

  await res.writeHead(200, {
    'Content-Type': 'application/pdf',
    'Content-Disposition': `attachment; filename="${nameText}.pdf"`,
  });
  const stream = canvas.createPDFStream();
  stream.pipe(res);
}
