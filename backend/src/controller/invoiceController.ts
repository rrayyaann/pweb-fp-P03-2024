// controllers/invoiceController.ts
import { Request, Response } from "express";
import path from "path";
import fs from "fs";

export const downloadInvoice = (req: Request, res: Response): void => {
  const { paymentId } = req.params;

  // Tentukan path file
  const filePath = path.resolve(__dirname, `../../invoices/invoice-${paymentId}.pdf`);

  // Cek apakah file ada
  if (!fs.existsSync(filePath)) {
    res.status(404).json({ message: "Invoice not found" });
    return;
  }

  // Kirim file
  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", `inline; filename=invoice-${paymentId}.pdf`);

  res.sendFile(filePath, (err) => {
    if (err) {
      res.status(500).send("Error sending file");
    }
  });
};
