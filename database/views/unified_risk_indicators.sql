CREATE OR REPLACE VIEW unified_risk_indicators AS

SELECT transaction_id, user_id, 'SPIKE' AS risk_type
FROM spike_anomaly
WHERE anomaly_type = 'SPIKE'

UNION ALL
SELECT NULL, user_id, 'HIGH_FREQUENCY'
FROM frequency_anomaly
WHERE anomaly_type = 'HIGH_FREQUENCY'

UNION ALL
SELECT transaction_id, user_id, 'ODD_HOUR'
FROM odd_hour_anomaly
WHERE anomaly_type = 'ODD_HOUR'

UNION ALL
SELECT transaction_id, user_id, 'DORMANT_REACTIVATION'
FROM dormancy_anomaly
WHERE anomaly_type = 'DORMANT_REACTIVATION'

UNION ALL
SELECT transaction_id, user_id, 'RETRY_SUCCESS'
FROM retry_anomaly
WHERE anomaly_type = 'RETRY_SUCCESS';
