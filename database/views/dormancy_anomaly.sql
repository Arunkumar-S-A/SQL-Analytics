CREATE OR REPLACE VIEW dormancy_anomaly AS
SELECT
    transaction_id,
    user_id,
    transaction_time,

    TIMESTAMPDIFF(
        DAY,
        LAG(transaction_time) OVER (
            PARTITION BY user_id
            ORDER BY transaction_time
        ),
        transaction_time
    ) AS inactivity_gap_days,

    CASE
        WHEN TIMESTAMPDIFF(
            DAY,
            LAG(transaction_time) OVER (
                PARTITION BY user_id
                ORDER BY transaction_time
            ),
            transaction_time
        ) > 30
        THEN 'DORMANT_REACTIVATION'
        ELSE 'NORMAL'
    END AS anomaly_type

FROM transactions
WHERE status = 'SUCCESS';
