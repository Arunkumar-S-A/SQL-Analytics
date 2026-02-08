CREATE INDEX idx_transactions_user_time
ON transactions(user_id, transaction_time);

CREATE INDEX idx_transactions_time
ON transactions(transaction_time);

CREATE INDEX idx_transactions_merchant
ON transactions(merchant_id);
