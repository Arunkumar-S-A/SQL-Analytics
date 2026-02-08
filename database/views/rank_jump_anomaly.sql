CREATE OR REPLACE VIEW rank_jump_anomaly AS
SELECT
    user_id,
    month_start,
    spending_rank,
    spending_rank -
    LAG(spending_rank) OVER (
        PARTITION BY user_id
        ORDER BY month_start
    ) AS rank_change,
    CASE
        WHEN ABS(
            spending_rank -
            LAG(spending_rank) OVER (
                PARTITION BY user_id
                ORDER BY month_start
            )
        ) >= 10
        THEN 'RANK_JUMP'
        ELSE 'NORMAL'
    END AS anomaly_type
FROM user_spending_rank;
