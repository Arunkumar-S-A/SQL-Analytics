CREATE OR REPLACE VIEW weekly_user_spend AS
SELECT
    user_id,
    DATE(transaction_time - INTERVAL WEEKDAY(transaction_time) DAY) AS week_start,
    SUM(amount) AS total_spent
FROM transactions
WHERE status = 'SUCCESS'
GROUP BY user_id, week_start;
