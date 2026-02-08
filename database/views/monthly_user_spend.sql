CREATE OR REPLACE VIEW monthly_user_spend AS
SELECT
    user_id,
    DATE_FORMAT(transaction_time, '%Y-%m-01') AS month_start,
    SUM(amount) AS total_spent
FROM transactions
WHERE status = 'SUCCESS'
GROUP BY user_id, month_start;
