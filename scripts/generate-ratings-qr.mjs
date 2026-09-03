import QRCode from "qrcode";
import { mkdir } from "node:fs/promises";

const branches = [
  ["third-branch", "Third Branch"],
  ["second-branch", "Second Branch"],
  ["ninth-branch", "Ninth Branch"],
  ["mall-el-bostan", "Mall El-Bostan"],
  ["ezone", "Ezone"],
  ["uae", "UAE Branch"],
];

await mkdir("qr", { recursive: true });
for (const [filename, branch] of branches) {
  await QRCode.toFile(`qr/${filename}.png`, `https://abuelmagd.com/rate?branch=${encodeURIComponent(branch)}`, {
    width: 1600,
    margin: 4,
    errorCorrectionLevel: "H",
  });
}
