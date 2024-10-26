import express from "express";
import cors from "cors";
import response from "./service/response.js";
import db from "./service/conection.js";
import bcrypt from "bcrypt";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
// import sanitizeHtml from "sanitize-html";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Letscode!");
});

// Konfigurasi folder penyimpanan untuk gambar
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/images");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

// Crud Admin
app.get("/api/v1/admin", (req, res) => {
  const sql = "SELECT * FROM admin";
  db.query(sql, (err, result) => {
    if (err) {
      response(500, null, "Failed to retrieve Admin data", res);
    } else {
      response(200, result, "Data From Table Admin", res);
    }
  });
});

app.get("/api/v1/admin/:name", (req, res) => {
  const name = req.params.name;
  const sql = "SELECT * FROM admin WHERE username = ?";

  db.query(sql, [name], (err, result) => {
    if (err) {
      response(500, null, "Failed to retrieve Admin data", res);
    } else {
      response(200, result, "Data From Table Admin", res);
    }
  });
});

app.post("/api/v1/admin/create", (req, res) => {
  const data = req.body;
  const { username, password } = data;

  try {
    // Cek apakah username sudah ada
    const sql = "SELECT * FROM admin WHERE username = ?";
    db.query(sql, [username], (err, result) => {
      if (err) {
        response(500, null, "Failed to retrieve Admin data", res);
      } else if (result.length > 0) {
        response(400, null, "Username already exists", res);
      } else {
        // Jika username belum ada, lanjutkan pengecekan password
        bcrypt.hash(password, 14, (err, hash) => {
          if (err) {
            response(500, null, "Failed to hash password", res);
          } else {
            const sql = "INSERT INTO admin (username, password) VALUES (?, ?)";
            db.query(sql, [username, hash], (err, result) => {
              if (err) {
                response(500, null, "Failed to insert Admin record", res);
              } else {
                res.status(201).json({
                  message: "Admin created successfully",
                  id: result.insertId,
                });
              }
            });
          }
        });
      }
    });
  } catch (error) {
    response(500, null, "Internal server error", res);
  }
});

app.get("/api/v1/admin/:id", (req, res) => {
  const sql = "SELECT * FROM admin WHERE id = ?";
  const id = req.params.id;
  db.query(sql, [id], (err, result) => {
    if (err) {
      response(500, null, "Failed to retrieve Admin data", res);
    } else if (result.length === 0) {
      response(404, null, "Admin not found", res);
    } else {
      response(200, result, "Data From Table Admin", res);
    }
  });
});

app.post("/api/v1/admin/login", (req, res) => {
  const data = req.body;
  const { username, password } = data;

  try {
    const sql = "SELECT * FROM admin WHERE username = ?";
    db.query(sql, [username], (err, result) => {
      if (err) {
        response(500, null, "Failed to retrieve Admin data", res);
      } else if (result.length === 0) {
        response(400, null, "Username not found", res);
      } else {
        const storedPassword = result[0].password;
        bcrypt.compare(password, storedPassword, (err, match) => {
          if (err) {
            response(500, null, "Failed to compare password", res);
          } else if (!match) {
            response(400, null, "Wrong password", res);
          } else {
            res
              .status(200)
              .json({ message: "Login successful", id: result[0].id });
          }
        });
      }
    });
  } catch (error) {
    response(500, null, "Internal server error", res);
  }
});

app.put("/api/v1/admin/update/:username", (req, res) => {
  const user = req.params.username;
  const { username, password } = req.body;

  try {
    bcrypt.hash(password, 14, (err, hash) => {
      if (err) {
        response(500, null, "Failed to hash password", res);
      } else {
        const sql =
          "UPDATE admin SET username = ?, password = ? WHERE username = ?";
        db.query(sql, [username, hash, user], (err, result) => {
          if (err) {
            response(500, null, "Failed to insert Admin record", res);
          } else {
            res.status(201).json({ message: "Data updated successfully" });
          }
        });
      }
    });
  } catch (error) {
    response(500, null, "Internal server error", res);
  }
});

app.delete("/api/v1/admin/delete/:id", (req, res) => {
  const id = req.params.id;
  const sql = "DELETE FROM admin WHERE id = ?";
  db.query(sql, [id], (err, result) => {
    if (err) {
      res.status(500).send({ message: "Error deleting Admin", error: err });
      return;
    }
    if (result.affectedRows === 0) {
      res.status(404).send({ message: "No Admin found with this ID" });
      return;
    }
    res.send({ message: `Admin with ID ${id} has been deleted successfully` });
  });
});

// Crud article
app.get("/api/v1/article", (req, res) => {
  const sql = "SELECT * FROM article";
  db.query(sql, (err, result) => {
    if (err) {
      response(500, null, "Failed to retrieve article data", res);
    } else {
      response(200, result, "Data From Table article", res);
    }
  });
});

app.get("/api/v1/article/now", (req, res) => {
  const sql =
    "SELECT * FROM article WHERE create_at >= NOW() - INTERVAL 1 MONTH";
  db.query(sql, (err, result) => {
    if (err) {
      response(500, null, "Failed to retrieve article data", res);
    } else {
      response(200, result, "Data From Table article", res);
    }
  });
});

// Route untuk mendapatkan artikel yang paling banyak dikunjungi (rekomendasi)
app.get("/api/v1/article/recommended", (req, res) => {
  db.query(
    "SELECT * FROM article ORDER BY views DESC LIMIT 3",
    (err, result) => {
      if (err) {
        return res
          .status(500)
          .json({ error: "Error mengambil artikel yang direkomendasikan" });
      }
      response(200, result, "Data From Table Article", res);
    }
  );
});

app.get("/api/v1/article/:id", (req, res) => {
  const sql = "SELECT * FROM article WHERE id = ?";
  const id = req.params.id;
  db.query(sql, [id], (err, result) => {
    if (err) {
      response(500, null, "Failed to retrieve Article data", res);
    } else if (result.length === 0) {
      response(404, null, "Article not found", res);
    } else {
      response(200, result, "Data From Table Article", res);
    }
  });
});

app.post("/api/v1/article/views/:id", (req, res) => {
  const id = req.params.id;
  const sql = "UPDATE article SET views = views + 1 WHERE id = ?";
  db.query(sql, [id], (err, result) => {
    if (err) {
      response(500, null, "Failed to update Article views", res);
    } else {
      response(200, null, "Article views updated successfully", res);
    }
  });
});

app.post("/api/v1/article/create", upload.single("image"), (req, res) => {
  const data = req.body;
  const { title, description, content, kategori, author } = data;

  // Jika ada file gambar yang diupload
  let image = req.file ? `/images/${req.file.filename}` : null;

  let sql = `INSERT INTO article (image, title, description, content, kategori, author) VALUES (?, ?, ?, ?, ?, ?)`;
  let params = [image, title, description, content, kategori, author];

  db.query(sql, params, (err, result) => {
    if (err) {
      console.error("Failed to insert article record", err);
      res.status(500).json({ message: "Failed to insert article record" });
    } else {
      console.log("article record inserted successfully");
      res.status(201).json({ message: "article created successfully" });
    }
  });
});

app.put("/api/v1/article/update/:id", upload.single("image"), (req, res) => {
  const id = req.params.id;
  const { title, description, content, kategori, author } = req.body;

  let sql, params;

  if (req.file) {
    // Jika ada file gambar yang diupload
    const image = `/images/${req.file.filename}`;
    sql =
      "UPDATE article SET image = ?, title = ?, description = ?, content = ?, kategori = ?, author = ? WHERE id = ?";
    params = [image, title, description, content, kategori, author, id];
  } else {
    // Jika tidak ada file yang diupload, tetap gunakan gambar lama
    sql =
      "UPDATE article SET title = ?, description = ?, content = ?, kategori = ?, author = ? WHERE id = ?";
    params = [title, description, content, kategori, author, id];
  }

  db.query(sql, params, (err, result) => {
    if (err) {
      res.status(500).send({ message: "Error updating article", error: err });
      return;
    }
    if (result.affectedRows === 0) {
      res.status(404).send({ message: "No article found with this ID" });
      return;
    }
    res.send({
      message: `Article with ID ${id} has been updated successfully`,
    });
  });
});

app.delete("/api/v1/article/delete/:id", (req, res) => {
  const id = req.params.id;
  const sql = "DELETE FROM article WHERE id = ?";
  db.query(sql, [id], (err, result) => {
    if (err) {
      res.status(500).send({ message: "Error deleting article", error: err });
      return;
    }
    if (result.affectedRows === 0) {
      res.status(404).send({ message: "No article found with this ID" });
      return;
    }
    res.send({
      message: `article with ID ${id} has been deleted successfully`,
    });
  });
});

// Crud product
app.get("/api/v1/product", (req, res) => {
  const sql = "SELECT * FROM product";
  db.query(sql, (err, result) => {
    if (err) {
      response(500, null, "Failed to retrieve product data", res);
    } else {
      response(200, result, "Data From Table product", res);
    }
  });
});

// Rute untuk mendapatkan produk berdasarkan ID
app.get("/api/v1/product/:id", (req, res) => {
  const sql = "SELECT * FROM product WHERE id = ?";
  const id = req.params.id;
  db.query(sql, [id], (err, result) => {
    if (err) {
      response(500, null, "Failed to retrieve Product data", res);
    } else if (result.length === 0) {
      response(404, null, "Product not found", res);
    } else {
      response(200, result, "Data From Table Product", res);
    }
  });
});

// Rute untuk membuat produk baru
app.post("/api/v1/product/create", upload.single("image"), (req, res) => {
  const data = req.body;
  const { product_name, description, kategori } = data;

  // Jika ada file gambar yang diupload
  let image = req.file ? `/images/${req.file.filename}` : null;

  let sql = `INSERT INTO product (image, product_name, description, kategori) VALUES (?, ?, ?, ?)`;
  let params = [image, product_name, description, kategori];

  db.query(sql, params, (err, result) => {
    if (err) {
      console.error("Failed to insert product record", err);
      res.status(500).json({ message: "Failed to insert product record" });
    } else {
      console.log("product record inserted successfully");
      res.status(201).json({ message: "product created successfully" });
    }
  });
});

app.put("/api/v1/product/update/:id", upload.single("image"), (req, res) => {
  const id = req.params.id;
  const { product_name, description, kategori } = req.body;

  // Cek apakah ada file gambar yang diunggah
  let image = req.file ? `/images/${req.file.filename}` : null;

  // Ambil data produk untuk mendapatkan gambar yang sudah ada jika tidak ada gambar baru yang diunggah
  const getProductQuery = "SELECT image FROM product WHERE id = ?";
  db.query(getProductQuery, [id], (err, result) => {
    if (err) {
      res.status(500).send({ message: "Error retrieving product", error: err });
      return;
    }

    if (result.length === 0) {
      res.status(404).send({ message: "No product found with this ID" });
      return;
    }

    // Jika tidak ada gambar baru yang diunggah, gunakan gambar yang sudah ada di DB
    if (!image) {
      image = result[0].image;
    }

    // Lakukan update produk
    const updateQuery =
      "UPDATE product SET image = ?, product_name = ?, description = ?, kategori = ? WHERE id = ?";
    db.query(
      updateQuery,
      [image, product_name, description, kategori, id],
      (err, updateResult) => {
        if (err) {
          res
            .status(500)
            .send({ message: "Error updating product", error: err });
          return;
        }
        if (updateResult.affectedRows === 0) {
          res.status(404).send({ message: "No product found with this ID" });
          return;
        }
        res.send({
          message: `Product with ID ${id} has been updated successfully`,
        });
      }
    );
  });
});

app.delete("/api/v1/product/delete/:id", (req, res) => {
  const id = req.params.id;
  const sql = "DELETE FROM product WHERE id = ?";
  db.query(sql, [id], (err, result) => {
    if (err) {
      res.status(500).send({ message: "Error deleting product", error: err });
      return;
    }
    if (result.affectedRows === 0) {
      res.status(404).send({ message: "No product found with this ID" });
      return;
    }
    res.send({
      message: `product with ID ${id} has been deleted successfully`,
    });
  });
});

// Crud testimoni
app.get("/api/v1/testimoni", (req, res) => {
  const sql = "SELECT * FROM testimoni";
  db.query(sql, (err, result) => {
    if (err) {
      response(500, null, "Failed to retrieve testimoni data", res);
    } else {
      response(200, result, "Data From Table testimoni", res);
    }
  });
});

app.get("/api/v1/testimoni/:id", (req, res) => {
  const sql = "SELECT * FROM testimoni WHERE id = ?";
  const id = req.params.id;
  db.query(sql, [id], (err, result) => {
    if (err) {
      response(500, null, "Failed to retrieve testimoni data", res);
    } else if (result.length === 0) {
      response(404, null, "testimoni not found", res);
    } else {
      response(200, result, "Data From Table testimoni", res);
    }
  });
});

app.post("/api/v1/testimoni/create", upload.single("image"), (req, res) => {
  const data = req.body;
  const { username, jabatan, description } = data;

  // Jika ada file gambar yang diupload
  let image = req.file ? `/images/${req.file.filename}` : null;

  let sql = `INSERT INTO testimoni (username, image, jabatan, description) VALUES (?, ?, ?, ?)`;
  let params = [username, image, jabatan, description];

  db.query(sql, params, (err, result) => {
    if (err) {
      console.error("Failed to insert testimoni record", err);
      res.status(500).json({ message: "Failed to insert testimoni record" });
    } else {
      console.log("testimoni record inserted successfully");
      res.status(201).json({ message: "testimoni created successfully" });
    }
  });
});

app.put("/api/v1/testimoni/update/:id", upload.single("image"), (req, res) => {
  const id = req.params.id;
  const { username, description, jabatan } = req.body;

  let sql, params;

  if (req.file) {
    // Jika ada file gambar yang diupload
    const image = `/images/${req.file.filename}`;
    sql =
      "UPDATE testimoni SET username = ?, description = ?, image = ?, jabatan = ? WHERE id = ?";
    params = [username, description, image, jabatan, id];
  } else {
    // Jika tidak ada file yang diupload, gunakan gambar lama
    sql =
      "UPDATE testimoni SET username = ?, description = ?, jabatan = ? WHERE id = ?";
    params = [username, description, jabatan, id];
  }

  db.query(sql, params, (err, result) => {
    if (err) {
      res.status(500).send({ message: "Error updating testimoni", error: err });
      return;
    }
    if (result.affectedRows === 0) {
      res.status(404).send({ message: "No testimoni found with this ID" });
      return;
    }
    res.send({
      message: `Testimoni with ID ${id} has been updated successfully`,
    });
  });
});

app.delete("/api/v1/testimoni/delete/:id", (req, res) => {
  const id = req.params.id;
  const sql = "DELETE FROM testimoni WHERE id = ?";
  db.query(sql, [id], (err, result) => {
    if (err) {
      res.status(500).send({ message: "Error deleting testimoni", error: err });
      return;
    }
    if (result.affectedRows === 0) {
      res.status(404).send({ message: "No testimoni found with this ID" });
      return;
    }
    res.send({
      message: `testimoni with ID ${id} has been deleted successfully`,
    });
  });
});

// Crud team
app.get("/api/v1/team", (req, res) => {
  const sql = "SELECT * FROM team";
  db.query(sql, (err, result) => {
    if (err) {
      response(500, null, "Failed to retrieve team data", res);
    } else {
      response(200, result, "Data From Table team", res);
    }
  });
});

app.get("/api/v1/team/:id", (req, res) => {
  const sql = "SELECT * FROM team WHERE id = ?";
  const id = req.params.id;
  db.query(sql, [id], (err, result) => {
    if (err) {
      response(500, null, "Failed to retrieve team data", res);
    } else if (result.length === 0) {
      response(404, null, "team not found", res);
    } else {
      response(200, result, "Data From Table team", res);
    }
  });
});

app.post("/api/v1/team/create", upload.single("image"), (req, res) => {
  const data = req.body;
  const { name, email, no_telp, linkedin, instagram, jabatan } = data;

  // Jika ada file gambar yang diupload
  let image = req.file ? `/images/${req.file.filename}` : null;

  let sql = `INSERT INTO team (name, image, email, no_telp, linkedin, instagram, jabatan) VALUES (?, ?, ?, ?, ?, ?, ?)`;
  let params = [name, image, email, no_telp, linkedin, instagram, jabatan];

  db.query(sql, params, (err, result) => {
    if (err) {
      console.error("Failed to insert team record", err);
      res.status(500).json({ message: "Failed to insert team record" });
    } else {
      console.log("team record inserted successfully");
      res.status(201).json({ message: "team created successfully" });
    }
  });
});

app.put("/api/v1/team/update/:id", upload.single("image"), (req, res) => {
  const id = req.params.id;
  const { name, email, no_telp, linkedin, instagram, jabatan } = req.body;

  let sql, params;

  if (req.file) {
    // Jika ada file gambar yang diupload, update kolom image
    const image = `/images/${req.file.filename}`;
    sql =
      "UPDATE team SET image = ?, name = ?, email = ?, no_telp = ?, linkedin = ?, instagram = ?, jabatan = ? WHERE id = ?";
    params = [image, name, email, no_telp, linkedin, instagram, jabatan, id];
  } else {
    // Jika tidak ada file yang diupload, jangan update kolom image
    sql =
      "UPDATE team SET name = ?, email = ?, no_telp = ?, linkedin = ?, instagram = ?, jabatan = ? WHERE id = ?";
    params = [name, email, no_telp, linkedin, instagram, jabatan, id];
  }

  db.query(sql, params, (err, result) => {
    if (err) {
      res.status(500).send({ message: "Error updating team", error: err });
      return;
    }
    if (result.affectedRows === 0) {
      res.status(404).send({ message: "No team found with this ID" });
      return;
    }
    res.send({ message: `Team with ID ${id} has been updated successfully` });
  });
});

app.delete("/api/v1/team/delete/:id", (req, res) => {
  const id = req.params.id;
  const sql = "DELETE FROM team WHERE id = ?";
  db.query(sql, [id], (err, result) => {
    if (err) {
      res.status(500).send({ message: "Error deleting team", error: err });
      return;
    }
    if (result.affectedRows === 0) {
      res.status(404).send({ message: "No team found with this ID" });
      return;
    }
    res.send({ message: `team with ID ${id} has been deleted successfully` });
  });
});

// Crud about
app.get("/api/v1/about", (req, res) => {
  const sql = "SELECT * FROM about";
  db.query(sql, (err, result) => {
    if (err) {
      response(500, null, "Failed to retrieve about data", res);
    } else {
      response(200, result, "Data From Table about", res);
    }
  });
});

app.get("/api/v1/about/:id", (req, res) => {
  const sql = "SELECT * FROM about WHERE id = ?";
  const id = req.params.id;
  db.query(sql, [id], (err, result) => {
    if (err) {
      response(500, null, "Failed to retrieve about data", res);
    } else if (result.length === 0) {
      response(404, null, "about not found", res);
    } else {
      response(200, result, "Data From Table about", res);
    }
  });
});

app.post("/api/v1/about/create", (req, res) => {
  const data = req.body;
  const { title, description } = data;
  let sql = `INSERT INTO about (title, description) VALUES (?, ?)`;
  let params = [title, description];

  db.query(sql, params, (err, result) => {
    if (err) {
      console.error("Failed to insert about record", err);
      res.status(500).json({ message: "Failed to insert about record" });
    } else {
      console.log("about record inserted successfully");
      res.status(201).json({ message: "about created successfully" });
    }
  });
});

app.put("/api/v1/about/update/:id", (req, res) => {
  const id = req.params.id;
  const { title, description } = req.body;
  const sql = "UPDATE about SET title = ?, description = ? WHERE id = ?";
  db.query(sql, [title, description, id], (err, result) => {
    if (err) {
      res.status(500).send({ message: "Error updating about", error: err });
      return;
    }
    if (result.affectedRows === 0) {
      res.status(404).send({ message: "No about found with this ID" });
      return;
    }
    res.send({ message: `about with ID ${id} has been updated successfully` });
  });
});

app.delete("/api/v1/about/delete/:id", (req, res) => {
  const id = req.params.id;
  const sql = "DELETE FROM about WHERE id = ?";
  db.query(sql, [id], (err, result) => {
    if (err) {
      res.status(500).send({ message: "Error deleting about", error: err });
      return;
    }
    if (result.affectedRows === 0) {
      res.status(404).send({ message: "No about found with this ID" });
      return;
    }
    res.send({ message: `about with ID ${id} has been deleted successfully` });
  });
});

// visitor
// Route untuk mendapatkan data pengunjung berdasarkan bulan
app.get("/api/v1/visitors/:year", (req, res) => {
  const year = req.params.year;

  // Query untuk mendapatkan data pengunjung berdasarkan tahun
  db.query("SELECT * FROM visitors WHERE year = ?", [year], (err, result) => {
    if (err) {
      return res.status(500).json({ error: "Error retrieving visitor data" });
    }

    // Buat array default untuk 12 bulan dengan count 0
    const defaultData = [
      { month: "Januari", count: 0 },
      { month: "Februari", count: 0 },
      { month: "Maret", count: 0 },
      { month: "April", count: 0 },
      { month: "Mei", count: 0 },
      { month: "Juni", count: 0 },
      { month: "Juli", count: 0 },
      { month: "Agustus", count: 0 },
      { month: "September", count: 0 },
      { month: "Oktober", count: 0 },
      { month: "November", count: 0 },
      { month: "Desember", count: 0 },
    ];

    // Jika tidak ada data untuk tahun tersebut, kembalikan default data (semua 0)
    if (result.length === 0) {
      return res.status(200).json({
        message: `No data found for the selected year ${year}, showing default data`,
        payload: { datas: defaultData },
      });
    }

    // Map data dari result ke defaultData untuk memastikan semua bulan ada
    const mappedData = defaultData.map((monthObj) => {
      const foundMonth = result.find(
        (visitor) => visitor.month === monthObj.month
      );
      return foundMonth ? { ...monthObj, count: foundMonth.count } : monthObj;
    });

    // Kembalikan data yang sudah di-map
    res.status(200).json({
      message: `Data pengunjung untuk tahun ${year}`,
      payload: { datas: mappedData },
    });
  });
});

app.post("/api/v1/visitors/increment", (req, res) => {
  const months = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];

  const currentMonthIndex = new Date().getMonth(); // 0-11
  const currentYear = new Date().getFullYear(); // Ambil tahun saat ini
  const currentMonth = months[currentMonthIndex]; // Ambil nama bulan dari array

  // Pertama, periksa apakah sudah ada data untuk tahun saat ini dan bulan saat ini
  db.query(
    "SELECT * FROM visitors WHERE year = ? AND month = ?",
    [currentYear, currentMonth],
    (err, result) => {
      if (err) {
        return res.status(500).json({ error: "Error checking visitor data" });
      }

      // Jika tidak ada data, buat baris baru
      if (result.length === 0) {
        // Tambahkan entri baru untuk bulan saat ini
        db.query(
          "INSERT INTO visitors (month, year, count) VALUES (?, ?, ?)",
          [currentMonth, currentYear, 1], // Mengatur count awal menjadi 1
          (err, result) => {
            if (err) {
              return res
                .status(500)
                .json({ error: "Error adding visitor data" });
            }
            return res.status(201).json({
              message: "Visitor count created",
              month: currentMonth,
              year: currentYear,
            });
          }
        );
      } else {
        // Jika data sudah ada, tingkatkan count
        db.query(
          "UPDATE visitors SET count = count + 1 WHERE year = ? AND month = ?",
          [currentYear, currentMonth],
          (err, result) => {
            if (err) {
              return res
                .status(500)
                .json({ error: "Error incrementing visitor count" });
            }
            return res.json({
              month: currentMonth,
              year: currentYear,
              count: result.affectedRows,
            });
          }
        );
      }
    }
  );
});

app.get("/api/v1/images", (req, res) => {
  const sql = "SELECT * FROM images";

  db.query(sql, (err, result) => {
    if (err) {
      response(500, null, "Failed to retrieve images data", res);
    } else {
      response(200, result, "Data From Table images", res);
    }
  });
});

app.get("/api/v1/images/kategori", (req, res) => {
  const kategori = req.query.kategori;
  const sql = "SELECT * FROM images WHERE kategori = ?";

  db.query(sql, [kategori], (err, result) => {
    if (err) {
      response(500, null, "Failed to retrieve images data", res);
    } else {
      response(200, result, "Data From Table images", res);
    }
  });
});

app.get("/api/v1/images/:id", (req, res) => {
  const sql = "SELECT * FROM images WHERE id = ?";
  const id = req.params.id;
  db.query(sql, [id], (err, result) => {
    if (err) {
      response(500, null, "Failed to retrieve images data", res);
    } else if (result.length === 0) {
      response(404, null, "images not found", res);
    } else {
      response(200, result, "Data From Table images", res);
    }
  });
});

app.post("/api/v1/images/create", upload.single("image"), (req, res) => {
  const data = req.body;
  const { kategori } = data;

  // Jika ada file gambar yang diupload
  let image = req.file ? `/images/${req.file.filename}` : null;

  const sql = "INSERT INTO images (image, kategori) VALUES (?, ?)";
  let params = [image, kategori];

  db.query(sql, params, (err, result) => {
    if (err) {
      console.error("Failed to insert images record", err);
      res.status(500).json({ message: "Failed to insert images record" });
    } else {
      console.log("images record inserted successfully");
      res.status(201).json({ message: "images created successfully" });
    }
  });
});

app.put("/api/v1/images/update/:id", upload.single("image"), (req, res) => {
  const id = req.params.id;
  const { kategori } = req.body;

  let sql, params;

  if (req.file) {
    // Jika ada file gambar yang diupload, update kolom image juga
    const image = `/images/${req.file.filename}`;
    sql = "UPDATE images SET image = ?, kategori = ? WHERE id = ?";
    params = [image, kategori, id];
  } else {
    // Jika tidak ada file gambar, hanya update kolom kategori
    sql = "UPDATE images SET kategori = ? WHERE id = ?";
    params = [kategori, id];
  }

  db.query(sql, params, (err, result) => {
    if (err) {
      res.status(500).send({ message: "Error updating images", error: err });
      return;
    }
    if (result.affectedRows === 0) {
      res.status(404).send({ message: "No images found with this ID" });
      return;
    }
    res.send({ message: `Image with ID ${id} has been updated successfully` });
  });
});

app.delete("/api/v1/images/delete/:id", (req, res) => {
  const id = req.params.id;
  const sql = "DELETE FROM images WHERE id = ?";
  db.query(sql, [id], (err, result) => {
    if (err) {
      res.status(500).send({ message: "Error deleting team", error: err });
      return;
    }
    if (result.affectedRows === 0) {
      res.status(404).send({ message: "No team found with this ID" });
      return;
    }
    res.send({ message: `team with ID ${id} has been deleted successfully` });
  });
});

// Middleware untuk melayani file statis dari folder public
app.use("/images", express.static(path.join(__dirname, "public/images")));

app.listen(port, () => {
  console.log(`Server running on http://localhost:3000/`);
});
