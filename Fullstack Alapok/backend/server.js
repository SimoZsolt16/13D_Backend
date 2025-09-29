const cors = require('cors');
const express = require('express');
const mysql = require('mysql2/promise');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3001;



app.listen(PORT, () =>
{
    console.log(`A szerver fut a http://localhost:${PORT} címen`);
});

const dbPool = mysql.createPool
({
    host: 'localhost' ,
    port: 3307,
    user: 'root',
    password: '',
    database: 'users'
});



app.get('/', (req, res) =>
{
  res.send('Hello, a backend szerver fut!');
});

app.get('/ping', async (req, res) =>
{
  try
  {
    const [rows] = await dbPool.query('SELECT 1 + 1 AS solution');
    res.json({ message: 'Sikeres adatbázis kapcsolat!', result: rows[0].solution });
  }
  catch (error)
  {
    console.error('Hiba az adatbázis-kapcsolat során:', error);
    res.status(500).json({ message: 'Hiba az adatbázis-kapcsolat során.' });
  }
});

app.get('/api/users', async (req, res) =>
{
    try
    {
        const sqlQuery = "SELECT id, name, email, created_at FROM users";
        const [rows] = await dbPool.query(sqlQuery);
        res.json(rows);
    }
    catch (error)
    {
        console.error("Hiba a lekérdezés során: ", error);
        res.status(500).json({ error: 'Adatbázis hiba történt a lekérdezéskor.' });
    }
});

app.post('/api/users', async (req, res) =>
{
    try
    {
        const { name, email } = req.body;
        const sql = "INSERT INTO users (name, email) VALUES (?, ?)";
        const [result] = await dbPool.query(sql, [name, email]);
        res.status(201).json({ message: "Felhasználó sikeresen hozzáadva", id: result.insertId });
    }
    catch (error)
    {
        console.error("Hiba a beszúrás során: ", error);
        res.status(500).json({ error: 'Adatbázis hiba történt a beszúráskor.' });
    }
});

app.patch('/api/users/:id', async (req, res) =>
{
    try
    {
        const { id } = req.params;
        const { name, email } = req.body;

        if (!name || !email)
        {
            return res.status(400).json({ error: 'A név és az email mező kitöltése kötelező a módosításhoz.' });
        }

        const sql = "UPDATE users SET name = ?, email = ? WHERE id = ?";
        const [result] = await dbPool.query(sql, [name, email, id]);

        if (result.affectedRows === 0)
        {
            return res.status(404).json({ error: 'A felhasználó nem található.' });
        }

        res.json({ message: "Felhasználó sikeresen módosítva", id: id });
    }
    catch (error)
    {
        console.error("Hiba a módosítás során: ", error);
        res.status(500).json({ error: 'Adatbázis hiba történt a módosításkor.' });
    }
});

app.delete('/api/users/:id', async (req, res) =>
{
    try
    {
        const { id } = req.params;
        const sql = "DELETE FROM users WHERE id = ?";
        const [result] = await dbPool.query(sql, [id]);

        if (result.affectedRows === 0)
        {
            return res.status(404).json({ error: 'A felhasználó nem található.' });
        }

        res.json({ message: "Felhasználó sikeresen törölve", id: id });
    }
    catch (error)
    {
        console.error("Hiba a törlés során: ", error);
        res.status(500).json({ error: 'Adatbázis hiba történt a törléskor.' });
    }
});