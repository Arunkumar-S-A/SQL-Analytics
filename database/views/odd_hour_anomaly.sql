CREATE OR REPLACE VIEW odd_hour_anomaly AS
SELECT
    transaction_id,
    user_id,
    transaction_time,
    CASE
        WHEN HOUR(transaction_time) BETWEEN 0 AND 5
        THEN 'ODD_HOUR'
        ELSE 'NORMAL'
    END AS anomaly_type
FROM transactions
WHERE status = 'SUCCESS';
