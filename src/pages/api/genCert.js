import fs from 'fs';
import { PDFDocument } from 'pdf-lib';
import path from 'path';

export default async function handler(req, res) {
  const { name } = req.query;

  const dir = path.resolve('./public', '..', 'src', 'cert', 'certificate.pdf');
  const file = fs.readFileSync(dir);

  const doc = await PDFDocument.load(file);

  const form = doc.getForm();

  const nameField = form.getTextField('Name');

  nameField.setText(name);

  form.flatten();

  const pdfBytes = await doc.save();

  res.setHeader('Content-Type', 'application/pdf');
  res.status(200);
  res.end(pdfBytes);
}
