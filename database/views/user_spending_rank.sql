CREATE OR REPLACE VIEW user_spending_rank AS
SELECT
    user_id,
    month_start,
    total_spent,
    RANK() OVER (
        PARTITION BY month_start
        ORDER BY total_spent DESC
    ) AS spending_rank
FROM monthly_user_spend;
