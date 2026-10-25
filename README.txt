Cara pakai singkat:
1. Unggah ketiga file ini (server.js, package.json, README.txt tidak wajib) ke repositori GitHub baru.
2. Di Render: New + -> Web Service -> pilih repo itu.
3. Build Command: npm install
   Start Command: npm start
4. Kalau mau pakai Shodan, buka tab "Environment" di Render, tambah SHODAN_API_KEY = (key dari shodan.io).
5. Setelah Deploy selesai, Render memberi alamat seperti https://nama-anda.onrender.com
6. Coba buka alamat itu di browser, harus muncul {"status":"ok", ...}
