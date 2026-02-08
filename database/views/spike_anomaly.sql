CREATE OR REPLACE VIEW spike_anomaly AS
SELECT
    transaction_id,
    user_id,
    amount,
    AVG(amount) OVER (PARTITION BY user_id) AS avg_spend,
    CASE
        WHEN amount > 3 * AVG(amount) OVER (PARTITION BY user_id)
        THEN 'SPIKE'
        ELSE 'NORMAL'
    END AS anomaly_type
FROM transactions
WHERE status = 'SUCCESS';
