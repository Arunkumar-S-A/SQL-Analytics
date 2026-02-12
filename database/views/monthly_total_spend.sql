CREATE OR REPLACE VIEW monthly_total_spend AS
SELECT
    DATE_FORMAT(transaction_time, '%Y-%m-01') AS month_start,
    SUM(amount) AS total_spent
FROM transactions
WHERE status = 'SUCCESS'
GROUP BY month_start
ORDER BY month_start ASC;
