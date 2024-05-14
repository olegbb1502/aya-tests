const express = require('express');
const router = express.Router();
const sequelize = require('../db');

const calculateRewards = async () => {
    const result = await sequelize.query(`
    WITH TotalDonations AS (
        SELECT 
            d.employee_id, 
            SUM(
                CASE 
                    WHEN r.sign = SUBSTR(d.amount, -3) THEN CAST(SUBSTR(d.amount, 1, LENGTH(d.amount) - 3) AS FLOAT) * COALESCE(r.value, 1)
                    ELSE CAST(SUBSTR(d.amount, 1, LENGTH(d.amount) - 3) AS FLOAT) * COALESCE(r.value, 1)
                END
            ) AS total_donation
        FROM 
            donates d
        LEFT JOIN 
            rates r ON d.date = r.date AND SUBSTR(d.amount, -3) = r.sign
        GROUP BY 
            d.employee_id
    ),
    LastDonation AS (
        SELECT 
            d.employee_id, 
            MAX(d.date) AS last_donation_date, 
            CASE 
                WHEN r.sign = SUBSTR(d.amount, -3) THEN CAST(SUBSTR(d.amount, 1, LENGTH(d.amount) - 3) AS FLOAT)
                ELSE CAST(SUBSTR(d.amount, 1, LENGTH(d.amount) - 3) AS FLOAT)
            END AS last_donation_amount,
            COALESCE(r.sign, 'USD') AS currency_sign,
            COALESCE(r.value, 1) AS exchange_rate
        FROM 
            donates d
        LEFT JOIN 
            rates r ON d.date = r.date AND SUBSTR(d.amount, -3) = r.sign
        GROUP BY 
            d.employee_id
    )
    SELECT 
        e.name, 
        e.surname, 
        td.total_donation, 
        ld.last_donation_amount AS last_donation_in_employee_currency,
        ld.last_donation_amount * ld.exchange_rate AS last_donation_in_usd,
        ld.currency_sign,
        CASE 
            WHEN td.total_donation > 100 THEN ROUND(ld.last_donation_amount / 10000 * td.total_donation)
            ELSE 0 
        END AS assistance_amount
    FROM 
        employees e
    LEFT JOIN 
        TotalDonations td ON e.id = td.employee_id
    LEFT JOIN 
        LastDonation ld ON e.id = ld.employee_id;
    `);

        return result;
}
router.get('/calculate-rewards', async (req, res) => {
    try {
        const result = await calculateRewards();
        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/calculate-rewards/table', async (req, res) => {
    try {
        const result = await calculateRewards();
        let html = '<table border="1"><tr>';
        Object.keys(result[0][0]).forEach(header => html += `<th>${header}</th>`);
        html += '</tr>';
        result[0].forEach(row => {
            html += `<tr style="background: ${!row.total_donation && 'lightgrey'}">
                <td>${row.name}</td>
                <td>${row.surname}</td>
                <td>${row.total_donation || 0}</td>
                <td>${row.last_donation_in_employee_currency || 0}</td>
                <td>${row.last_donation_in_usd || 0}</td>
                <td>${row.currency_sign || 'USD'}</td>
                <td>${row.assistance_amount || 0}</td>
            </tr>`;
        });
        html += '</table>';
        res.send(html);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
