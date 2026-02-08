INSERT INTO transactions
(user_id, merchant_id, amount, status, transaction_time) VALUES
(1, 1, 250, 'SUCCESS', '2024-06-01 09:15'),
(1, 2, 300, 'SUCCESS', '2024-06-03 20:45'),
(1, 4, 12000, 'SUCCESS', '2024-06-10 14:30'),
(2, 3, 180, 'SUCCESS', '2024-06-05 08:10'),
(2, 3, 220, 'SUCCESS', '2024-06-05 08:20'),
(2, 3, 210, 'SUCCESS', '2024-06-05 08:30'),
(3, 5, 499, 'SUCCESS', '2024-06-02 02:15'),
(5, 4, 800, 'FAILED', '2024-06-06 17:45'),
(5, 4, 800, 'SUCCESS', '2024-06-06 17:47');
