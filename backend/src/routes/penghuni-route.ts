import { Router } from "express";
import { Verification } from "../middleware/auth";
import {
  getInvoiceHistory,
  createPayment,
  createDamageReport,
  createUserReport,
  getRoomOccupancy,
} from "../controller/penghuni-controller";

export const penghuniRouter = Router();

penghuniRouter.get("/", Verification, getInvoiceHistory);
penghuniRouter.get("/sewa", Verification, getRoomOccupancy);
penghuniRouter.post("/sewa/bayar", Verification, createPayment);
penghuniRouter.post("/laporan/fasilitas", Verification, createDamageReport);
penghuniRouter.post("/laporan/penghuni", Verification, createUserReport);

export default penghuniRouter;
