const { json } = require('express');
const express = require('express');
const router = express.Router();
const pool = require('../db');
const { v4: uuidv4 } = require('uuid');

// category GET POST
router.post('/category', async (req, res) => {
    try {
        const { category_name } = req.body
        const result = await pool.query('INSERT INTO category (category_id, category_name) VALUES($1, $2) RETURNING *', [uuidv4(), category_name]);
        res.status(200).json('Create category complete!');
    } catch (err) {
        console.error(err.message);
        res.status(400).json('Bad request!');
    }
});
router.get('/category', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM category');
        res.json(result.rows);
    } catch (err) {
        console.error(err.message);
        res.status(400).json('Bad request!');
    }
});

// item GET POST
router.post('/item', async (req, res) => {
    try {
        const { category_id, item_name, unit } = req.body
        const result = await pool.query('INSERT INTO item (item_id, category_id, item_name, unit) VALUES($1, $2, $3, $4) RETURNING *', [uuidv4(), category_id, item_name, unit]);
        res.status(200).json('Create item complete!');
    } catch (err) {
        console.error(err.message);
        res.status(400).json('Bad request!');
    }
});
router.get('/item/:categoryID', async (req, res) => {
    try {
        const { categoryID } = req.params;
        const result = await pool.query('SELECT * FROM item WHERE category_id = $1', [categoryID]);
        res.status(200).json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(400).json('Bad request!');
    }
});

// item import POST
router.post('/importitem', async (req, res) => {
    try {
        const { company, dates, lists } = req.body;
        const import_id = uuidv4();
        console.log(lists);
        await pool.query('BEGIN');
        const resultA = await pool.query(
            'INSERT INTO import_list (import_id, import_company, dates) VALUES($1, $2, $3) RETURNING *', 
            [import_id, company, dates]);
        console.log(resultA.rows[0]);
        for (const list of lists) {
            const resultB = await pool.query(
                'INSERT INTO import_data (import_data_id, item_id, import_id, price, amount, remain) VALUES($1, $2, $3, $4, $5, $6) RETURNING *', 
                [uuidv4(), list.item_id, import_id, list.price, list.amount, list.amount]);
            console.log(resultB.rows[0]);
        }
        await pool.query('COMMIT');
        res.status(200).json('Import item complete');

    } catch (err) {
        await pool.query('ROLLBACK');
        console.error(err.message);
        res.status(400).json('Bad request!');
    }
});

module.exports = router;


