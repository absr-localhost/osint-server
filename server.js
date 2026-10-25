// Server perantara OSINT. Jalan di Render, dipanggil oleh web lama Anda.
const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors()); // izinkan web Anda memanggil server ini dari domain manapun

// Halaman cek: buka alamat server ini langsung di browser untuk memastikan hidup
app.get("/", (req, res) => {
  res.json({ status: "ok", pesan: "Server OSINT aktif." });
});

// Contoh 1: cek IP pemanggil (siapa yang mengakses, dari server, bukan dari browser)
app.get("/api/ip-saya", (req, res) => {
  const ip = req.headers["x-forwarded-for"]?.split(",")[0] || req.socket.remoteAddress;
  res.json({ ip });
});

// Contoh 2: cek IP/domain ke Shodan (butuh API key Anda sendiri)
// Daftar gratis di shodan.io, lalu isi SHODAN_API_KEY di tab "Environment" pada Render.
app.get("/api/shodan", async (req, res) => {
  const target = req.query.q;
  const key = process.env.SHODAN_API_KEY;
  if (!target) return res.status(400).json({ error: "Isi ?q=alamatIP" });
  if (!key) return res.status(500).json({ error: "SHODAN_API_KEY belum diatur di Render." });
  try {
    const r = await fetch(`https://api.shodan.io/shodan/host/${encodeURIComponent(target)}?key=${key}`);
    const data = await r.json();
    res.json(data);
  } catch (e) {
    res.status(502).json({ error: "Gagal menghubungi Shodan." });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log("Server jalan di port " + port));
