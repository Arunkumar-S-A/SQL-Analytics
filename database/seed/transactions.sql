-- =========================================
-- NORMAL DATA GENERATOR
-- =========================================

DELIMITER //

CREATE PROCEDURE generate_transaction_data(IN total_rows INT)
BEGIN
    DECLARE i INT DEFAULT 0;
    DECLARE rand_user INT;
    DECLARE rand_merchant INT;
    DECLARE rand_amount INT;
    DECLARE rand_status VARCHAR(10);
    DECLARE rand_date DATETIME;

    WHILE i < total_rows DO

        SET rand_user = FLOOR(1 + RAND()*50);
        SET rand_merchant = FLOOR(1 + RAND()*25);
        SET rand_amount = FLOOR(100 + RAND()*1200000);

        SET rand_status = IF(RAND() > 0.15, 'SUCCESS', 'FAILED');

        SET rand_date = TIMESTAMP(
            DATE_ADD('2024-01-01', INTERVAL FLOOR(RAND()*730) DAY),
            MAKETIME(FLOOR(RAND()*24), FLOOR(RAND()*60), FLOOR(RAND()*60))
        );

        INSERT INTO transactions(user_id, merchant_id, amount, status, transaction_time)
        VALUES(rand_user, rand_merchant, rand_amount, rand_status, rand_date);

        SET i = i + 1;

    END WHILE;
END //

DELIMITER ;

-- Generate 10k normal rows
CALL generate_transaction_data(10000);



-- =========================================
-- ANOMALY GENERATOR
-- =========================================

DELIMITER //

CREATE PROCEDURE generate_anomalies(IN anomaly_batches INT)
BEGIN
    DECLARE i INT DEFAULT 0;
    DECLARE base_date DATETIME;
    DECLARE anomaly_user INT;

    WHILE i < anomaly_batches DO

        SET anomaly_user = FLOOR(1 + RAND()*50);

        SET base_date = TIMESTAMP(
            DATE_ADD('2024-01-01', INTERVAL FLOOR(RAND()*730) DAY),
            MAKETIME(FLOOR(RAND()*24), FLOOR(RAND()*60), 0)
        );

        -- High Frequency Burst
        INSERT INTO transactions(user_id, merchant_id, amount, status, transaction_time)
        SELECT anomaly_user, 1, FLOOR(200 + RAND()*50), 'SUCCESS',
               DATE_ADD(base_date, INTERVAL seq MINUTE)
        FROM (
            SELECT 0 seq UNION SELECT 2 UNION SELECT 4 UNION SELECT 6 UNION SELECT 8
        ) t;

        -- Retry Success
        INSERT INTO transactions(user_id, merchant_id, amount, status, transaction_time) VALUES
        (anomaly_user, 3, 5000, 'FAILED', base_date),
        (anomaly_user, 3, 5000, 'FAILED', DATE_ADD(base_date, INTERVAL 2 MINUTE)),
        (anomaly_user, 3, 5000, 'SUCCESS', DATE_ADD(base_date, INTERVAL 5 MINUTE));

        -- Large Spike
        INSERT INTO transactions(user_id, merchant_id, amount, status, transaction_time) VALUES
        (anomaly_user, 4, 300, 'SUCCESS', DATE_ADD(base_date, INTERVAL -10 DAY)),
        (anomaly_user, 4, 40000, 'SUCCESS', base_date);

        -- End of Month (fixed)
        INSERT INTO transactions(user_id, merchant_id, amount, status, transaction_time) VALUES
        (anomaly_user, 7, 20000, 'SUCCESS',
         TIMESTAMP(LAST_DAY(base_date), '18:00:00'));

        -- Salary Day (fixed)
        INSERT INTO transactions(user_id, merchant_id, amount, status, transaction_time) VALUES
        (anomaly_user, 8, 18000, 'SUCCESS',
         TIMESTAMP(DATE_FORMAT(base_date,'%Y-%m-01'), '10:00:00'));

        SET i = i + 1;

    END WHILE;

END //

DELIMITER ;

-- Inject anomaly groups
CALL generate_anomalies(50);
