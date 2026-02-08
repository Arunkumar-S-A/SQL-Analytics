🧪 Execution Order (IMPORTANT)
1. schema/*.sql
2. indexes/indexes.sql
3. seed/*.sql
4. views/*.sql

One Master SQL File

This is the cleanest and interview-friendly way.

📁 Create a file:
database/setup.sql

✍️ Inside setup.sql:
-- 1. Create database
CREATE DATABASE IF NOT EXISTS fraud_analytics;
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

▶️ Run EVERYTHING with ONE command

From project root:

mysql -u root -p < database/setup.sql


Enter password → DONE 🎉

✔ Database created
✔ Tables created
✔ Data inserted
✔ Views created