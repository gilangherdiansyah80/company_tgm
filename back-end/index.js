import express from "express"
import cors from "cors"
import response from "./service/response.js"
import db from "./service/conection.js"

const app = express()
const port = 3000

app.use(cors())
app.use(express.json())


app.get("/", (req, res) => {
    res.send("Letscode!")
})

// Crud Admin
app.get('/api/v1/admin', (req, res) => {
    const sql = "SELECT * FROM admin"
    db.query(sql, (err, result) => {
        if (err) {
            response(500, null, 'Failed to retrieve Admin data', res);
        } else {
            response(200, result, 'Data From Table Admin', res);
        }
    });
})

app.post('/api/v1/admin/create', (req, res) => {
    const data = req.body;
    const { username, password } = data;
    let sql = `INSERT INTO admin (username, password) VALUES (?, ?)`;
    let params = [username, password];

    db.query(sql, params, (err, result) => {
        if (err) {
            console.error('Failed to insert Admin record', err);
            res.status(500).json({ message: 'Failed to insert Admin record' });
        } else {
            console.log('Admin record inserted successfully');
            res.status(201).json({ message: 'Admin created successfully' });
        }
    });
})

app.put('/api/v1/admin/update/:id', (req, res) => {
    const id = req.params.id
    const { username, password } = req.body
    const sql = 'UPDATE admin SET username = ?, password = ? WHERE id = ?'
    db.query(sql, [username, password, id], (err, result) => {
        if (err) {
            res.status(500).send({ message: 'Error updating Admin', error: err });
            return;
        }
        if (result.affectedRows === 0) {
            res.status(404).send({ message: 'No Admin found with this ID' });
            return;
        }
        res.send({ message: `Admin with ID ${id} has been updated successfully` });
    });
})

app.delete('/api/v1/admin/delete/:id', (req, res) => {
    const id = req.params.id
    const sql = 'DELETE FROM admin WHERE id = ?'
    db.query(sql, [id], (err, result) => {
        if (err) {
            res.status(500).send({ message: 'Error deleting Admin', error: err });
            return;
        }
        if (result.affectedRows === 0) {
            res.status(404).send({ message: 'No Admin found with this ID' });
            return;
        }
        res.send({ message: `Admin with ID ${id} has been deleted successfully` });
    });
})

// Crud article
app.get('/api/v1/article', (req, res) => {
    const sql = "SELECT * FROM article"
    db.query(sql, (err, result) => {
        if (err) {
            response(500, null, 'Failed to retrieve article data', res);
        } else {
            response(200, result, 'Data From Table article', res);
        }
    });
})

app.post('/api/v1/article/create', (req, res) => {
    const data = req.body;
    const { title, description, content, kategori } = data;
    let sql = `INSERT INTO article (title, description, content, kategori) VALUES (?, ?, ?, ?)`;
    let params = [title, description, content, kategori];

    db.query(sql, params, (err, result) => {
        if (err) {
            console.error('Failed to insert article record', err);
            res.status(500).json({ message: 'Failed to insert article record' });
        } else {
            console.log('article record inserted successfully');
            res.status(201).json({ message: 'article created successfully' });
        }
    });
})

app.put('/api/v1/article/update/:id', (req, res) => {
    const id = req.params.id
    const { title, description, content, kategori } = req.body
    const sql = 'UPDATE article SET title = ?, description = ?, content = ?, kategori = ? WHERE id = ?'
    db.query(sql, [title, description, content, kategori, id], (err, result) => {
        if (err) {
            res.status(500).send({ message: 'Error updating article', error: err });
            return;
        }
        if (result.affectedRows === 0) {
            res.status(404).send({ message: 'No article found with this ID' });
            return;
        }
        res.send({ message: `article with ID ${id} has been updated successfully` });
    });
})

app.delete('/api/v1/article/delete/:id', (req, res) => {
    const id = req.params.id
    const sql = 'DELETE FROM article WHERE id = ?'
    db.query(sql, [id], (err, result) => {
        if (err) {
            res.status(500).send({ message: 'Error deleting article', error: err });
            return;
        }
        if (result.affectedRows === 0) {
            res.status(404).send({ message: 'No article found with this ID' });
            return;
        }
        res.send({ message: `article with ID ${id} has been deleted successfully` });
    });
})

// Crud product
app.get('/api/v1/product', (req, res) => {
    const sql = "SELECT * FROM product"
    db.query(sql, (err, result) => {
        if (err) {
            response(500, null, 'Failed to retrieve product data', res);
        } else {
            response(200, result, 'Data From Table product', res);
        }
    });
})

app.post('/api/v1/product/create', (req, res) => {
    const data = req.body;
    const { product_name, description, stock, kategori } = data;
    let sql = `INSERT INTO product (product_name, description, stock, kategori) VALUES (?, ?, ?, ?)`;
    let params = [product_name, description, stock, kategori];

    db.query(sql, params, (err, result) => {
        if (err) {
            console.error('Failed to insert product record', err);
            res.status(500).json({ message: 'Failed to insert product record' });
        } else {
            console.log('product record inserted successfully');
            res.status(201).json({ message: 'product created successfully' });
        }
    });
})

app.put('/api/v1/product/update/:id', (req, res) => {
    const id = req.params.id
    const { product_name, description, stock, kategori } = req.body
    const sql = 'UPDATE product SET product_name = ?, description = ?, stock = ?, kategori = ? WHERE id = ?'
    db.query(sql, [product_name, description, stock, kategori, id], (err, result) => {
        if (err) {
            res.status(500).send({ message: 'Error updating product', error: err });
            return;
        }
        if (result.affectedRows === 0) {
            res.status(404).send({ message: 'No product found with this ID' });
            return;
        }
        res.send({ message: `product with ID ${id} has been updated successfully` });
    });
})

app.delete('/api/v1/product/delete/:id', (req, res) => {
    const id = req.params.id
    const sql = 'DELETE FROM product WHERE id = ?'
    db.query(sql, [id], (err, result) => {
        if (err) {
            res.status(500).send({ message: 'Error deleting product', error: err });
            return;
        }
        if (result.affectedRows === 0) {
            res.status(404).send({ message: 'No product found with this ID' });
            return;
        }
        res.send({ message: `product with ID ${id} has been deleted successfully` });
    });
})

// Crud testimoni
app.get('/api/v1/testimoni', (req, res) => {
    const sql = "SELECT * FROM testimoni"
    db.query(sql, (err, result) => {
        if (err) {
            response(500, null, 'Failed to retrieve testimoni data', res);
        } else {
            response(200, result, 'Data From Table testimoni', res);
        }
    });
})

app.post('/api/v1/testimoni/create', (req, res) => {
    const data = req.body;
    const { username, description } = data;
    let sql = `INSERT INTO testimoni (username, description) VALUES (?, ?)`;
    let params = [username, description];

    db.query(sql, params, (err, result) => {
        if (err) {
            console.error('Failed to insert testimoni record', err);
            res.status(500).json({ message: 'Failed to insert testimoni record' });
        } else {
            console.log('testimoni record inserted successfully');
            res.status(201).json({ message: 'testimoni created successfully' });
        }
    });
})

app.put('/api/v1/testimoni/update/:id', (req, res) => {
    const id = req.params.id
    const { username, description } = req.body
    const sql = 'UPDATE testimoni SET username = ?, description = ? WHERE id = ?'
    db.query(sql, [username, description, id], (err, result) => {
        if (err) {
            res.status(500).send({ message: 'Error updating testimoni', error: err });
            return;
        }
        if (result.affectedRows === 0) {
            res.status(404).send({ message: 'No testimoni found with this ID' });
            return;
        }
        res.send({ message: `testimoni with ID ${id} has been updated successfully` });
    });
})

app.delete('/api/v1/testimoni/delete/:id', (req, res) => {
    const id = req.params.id
    const sql = 'DELETE FROM testimoni WHERE id = ?'
    db.query(sql, [id], (err, result) => {
        if (err) {
            res.status(500).send({ message: 'Error deleting testimoni', error: err });
            return;
        }
        if (result.affectedRows === 0) {
            res.status(404).send({ message: 'No testimoni found with this ID' });
            return;
        }
        res.send({ message: `testimoni with ID ${id} has been deleted successfully` });
    });
})

// Crud team
app.get('/api/v1/team', (req, res) => {
    const sql = "SELECT * FROM team"
    db.query(sql, (err, result) => {
        if (err) {
            response(500, null, 'Failed to retrieve team data', res);
        } else {
            response(200, result, 'Data From Table team', res);
        }
    });
})

app.post('/api/v1/team/create', (req, res) => {
    const data = req.body;
    const { name, email, no_telp, linkedin, instagram, jabatan } = data;
    let sql = `INSERT INTO team (name, email, no_telp, linkedin, instagram, jabatan) VALUES (?, ?, ?, ?, ?, ?)`;
    let params = [name, email, no_telp, linkedin, instagram, jabatan];

    db.query(sql, params, (err, result) => {
        if (err) {
            console.error('Failed to insert team record', err);
            res.status(500).json({ message: 'Failed to insert team record' });
        } else {
            console.log('team record inserted successfully');
            res.status(201).json({ message: 'team created successfully' });
        }
    });
})

app.put('/api/v1/team/update/:id', (req, res) => {
    const id = req.params.id
    const { name, email, no_telp, linkedin, instagram, jabatan } = req.body
    const sql = 'UPDATE team SET name = ?, email = ?, no_telp = ?, linkedin = ?, instagram = ?, jabatan = ? WHERE id = ?'
    db.query(sql, [name, email, no_telp, linkedin, instagram, jabatan, id], (err, result) => {
        if (err) {
            res.status(500).send({ message: 'Error updating team', error: err });
            return;
        }
        if (result.affectedRows === 0) {
            res.status(404).send({ message: 'No team found with this ID' });
            return;
        }
        res.send({ message: `team with ID ${id} has been updated successfully` });
    });
})

app.delete('/api/v1/team/delete/:id', (req, res) => {
    const id = req.params.id
    const sql = 'DELETE FROM team WHERE id = ?'
    db.query(sql, [id], (err, result) => {
        if (err) {
            res.status(500).send({ message: 'Error deleting team', error: err });
            return;
        }
        if (result.affectedRows === 0) {
            res.status(404).send({ message: 'No team found with this ID' });
            return;
        }
        res.send({ message: `team with ID ${id} has been deleted successfully` });
    });
})

// Crud about
app.get('/api/v1/about', (req, res) => {
    const sql = "SELECT * FROM about"
    db.query(sql, (err, result) => {
        if (err) {
            response(500, null, 'Failed to retrieve about data', res);
        } else {
            response(200, result, 'Data From Table about', res);
        }
    });
})

app.post('/api/v1/about/create', (req, res) => {
    const data = req.body;
    const { title, description } = data;
    let sql = `INSERT INTO about (title, description) VALUES (?, ?)`;
    let params = [title, description];

    db.query(sql, params, (err, result) => {
        if (err) {
            console.error('Failed to insert about record', err);
            res.status(500).json({ message: 'Failed to insert about record' });
        } else {
            console.log('about record inserted successfully');
            res.status(201).json({ message: 'about created successfully' });
        }
    });
})

app.put('/api/v1/about/update/:id', (req, res) => {
    const id = req.params.id
    const { title, description } = req.body
    const sql = 'UPDATE about SET title = ?, description = ? WHERE id = ?'
    db.query(sql, [title, description, id], (err, result) => {
        if (err) {
            res.status(500).send({ message: 'Error updating about', error: err });
            return;
        }
        if (result.affectedRows === 0) {
            res.status(404).send({ message: 'No about found with this ID' });
            return;
        }
        res.send({ message: `about with ID ${id} has been updated successfully` });
    });
})

app.delete('/api/v1/about/delete/:id', (req, res) => {
    const id = req.params.id
    const sql = 'DELETE FROM about WHERE id = ?'
    db.query(sql, [id], (err, result) => {
        if (err) {
            res.status(500).send({ message: 'Error deleting about', error: err });
            return;
        }
        if (result.affectedRows === 0) {
            res.status(404).send({ message: 'No about found with this ID' });
            return;
        }
        res.send({ message: `about with ID ${id} has been deleted successfully` });
    });
})

app.listen(port, () => {
    console.log(`Server running on http://localhost:3000/`)
})