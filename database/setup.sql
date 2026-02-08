-- 1. Create database
DROP DATABASE IF EXISTS fraud_analytics;

-- CREATE DATABASE IF NOT EXISTS fraud_analytics;
CREATE DATABASE fraud_analytics;
USE fraud_analytics;

-- 2. Schema
SOURCE database/schema/01_users.sql;
SOURCE database/schema/02_categories.sql;
SOURCE database/schema/03_merchants.sql;
SOURCE database/schema/04_transactions.sql;

-- 3. Indexes
SOURCE database/indexes/indexes.sql;

-- 4. Seed data
SOURCE database/seed/users.sql;
SOURCE database/seed/categories.sql;
SOURCE database/seed/merchants.sql;
SOURCE database/seed/transactions.sql;

-- 5. Views
SOURCE database/views/weekly_user_spend.sql;
SOURCE database/views/monthly_user_spend.sql;
SOURCE database/views/user_spending_rank.sql;
SOURCE database/views/spike_anomaly.sql;
SOURCE database/views/frequency_anomaly.sql;
SOURCE database/views/odd_hour_anomaly.sql;
SOURCE database/views/dormancy_anomaly.sql;
SOURCE database/views/retry_anomaly.sql;
SOURCE database/views/rank_jump_anomaly.sql;
SOURCE database/views/unified_risk_indicators.sql;