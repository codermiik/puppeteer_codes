const express =  require('express');
const mysql = require('mysql2/promise');

const app = express();

const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'quotes',
};

async function fetchQuotes() {
    const connection = await mysql.createConnection(dbConfig);
    try {
        const [rows] = await connection.query('SELECT * FROM quote');
        return rows;
    } catch (error) {
        console.error('Error fetching quotes:', error);
        return [];
    } finally {
        await connection.end();
    }
}

app.set('view engine', 'ejs');

// Route to render index.ejs with quotes data
app.get('/', async (req, res) => {
    try {
        const quotes = await fetchQuotes();
        res.render('quotes', { quotes });
    } catch (error) {
        console.error('Error rendering index:', error);
        res.status(500).send('Internal Server Error');
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
