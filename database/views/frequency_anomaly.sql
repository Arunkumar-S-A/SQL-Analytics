CREATE OR REPLACE VIEW frequency_anomaly AS
SELECT
    user_id,
    DATE_FORMAT(transaction_time, '%Y-%m-%d %H:00:00') AS hour_slot,
    COUNT(*) AS txn_count,
    CASE
        WHEN COUNT(*) > 5 THEN 'HIGH_FREQUENCY'
        ELSE 'NORMAL'
    END AS anomaly_type
FROM transactions
WHERE status = 'SUCCESS'
GROUP BY user_id, hour_slot;
