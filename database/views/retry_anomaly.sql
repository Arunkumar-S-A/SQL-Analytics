CREATE OR REPLACE VIEW retry_anomaly AS
SELECT
    transaction_id,
    user_id,
    status,
    transaction_time,
    LAG(status) OVER (
        PARTITION BY user_id
        ORDER BY transaction_time
    ) AS previous_status,
    CASE
        WHEN status = 'SUCCESS'
         AND LAG(status) OVER (
             PARTITION BY user_id
             ORDER BY transaction_time
         ) = 'FAILED'
        THEN 'RETRY_SUCCESS'
        ELSE 'NORMAL'
    END AS anomaly_type
FROM transactions;
