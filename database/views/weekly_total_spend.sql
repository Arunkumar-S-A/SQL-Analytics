CREATE OR REPLACE VIEW weekly_total_spend AS
SELECT
    DATE(transaction_time - INTERVAL WEEKDAY(transaction_time) DAY) AS week_start,
    SUM(amount) AS total_spent
FROM transactions
WHERE status = 'SUCCESS'
GROUP BY week_start
ORDER BY week_start ASC;
