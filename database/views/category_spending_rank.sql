CREATE OR REPLACE VIEW category_spending_rank AS
SELECT
    c.category_name,
    SUM(t.amount) AS total_spent,
    RANK() OVER (
        ORDER BY SUM(t.amount) DESC
    ) AS spending_rank
FROM transactions t
JOIN merchants m ON t.merchant_id = m.merchant_id
JOIN categories c ON m.category_id = c.category_id
WHERE t.status = 'SUCCESS'
GROUP BY c.category_name
ORDER BY total_spent DESC;
