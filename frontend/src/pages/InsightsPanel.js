import "./InsightsPanel.css";

const InsightsPanel = ({ type, data }) => {
    if (!data || data.length === 0) return null;

    // 🔥 Format Currency
    const formatCurrency = (value) => {
        const num = parseFloat(value);
        if (isNaN(num)) return "₹ 0";
        return "₹ " + Math.floor(num).toLocaleString();
    };

    // 🔥 Format Date (Readable)
    const formatDate = (dateString, mode = "full") => {
        if (!dateString) return "";

        const date = new Date(dateString);

        if (mode === "month") {
            return date.toLocaleDateString("en-IN", {
                month: "long",
                year: "numeric"
            });
        }

        return date.toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric"
        });
    };

    // 🔥 Total Calculation
    const total = data.reduce((sum, d) => {
        const value = parseFloat(d.total_spent);
        return sum + (isNaN(value) ? 0 : value);
    }, 0);

    const average = total / data.length;

    const highest = data.reduce((max, d) =>
        parseFloat(d.total_spent) > parseFloat(max.total_spent) ? d : max
    );

    const lowest = data.reduce((min, d) =>
        parseFloat(d.total_spent) < parseFloat(min.total_spent) ? d : min
    );

    return (
        <div className="insights-card">
            <h4 className="insights-title">📊 Key Insights</h4>

            <div className="insights-grid">

                {/* RANKING */}
                {type === "ranking" && (
                    <>
                        <div className="insight-item">
                            <span className="insight-label">Top User</span>
                            <span className="insight-value highlight">
                                User {highest.user_id} – {formatCurrency(highest.total_spent)}
                            </span>
                        </div>

                        <div className="insight-item">
                            <span className="insight-label">Lowest User</span>
                            <span className="insight-value subtle">
                                User {lowest.user_id} – {formatCurrency(lowest.total_spent)}
                            </span>
                        </div>

                        <div className="insight-item">
                            <span className="insight-label">Total Combined Spending</span>
                            <span className="insight-value">
                                {formatCurrency(total)}
                            </span>
                        </div>

                        <div className="insight-item">
                            <span className="insight-label">Average Per User</span>
                            <span className="insight-value">
                                {formatCurrency(average)}
                            </span>
                        </div>
                    </>
                )}

                {/* WEEKLY */}
                {type === "weekly" && (
                    <>
                        <div className="insight-item">
                            <span className="insight-label">Highest Spending Week</span>
                            <span className="insight-value highlight">
                                Week of {formatDate(highest.week_start)} – {formatCurrency(highest.total_spent)}
                            </span>
                        </div>

                        <div className="insight-item">
                            <span className="insight-label">Lowest Spending Week</span>
                            <span className="insight-value subtle">
                                Week of {formatDate(lowest.week_start)} – {formatCurrency(lowest.total_spent)}
                            </span>
                        </div>

                        <div className="insight-item">
                            <span className="insight-label">Total Weekly Spending</span>
                            <span className="insight-value">
                                {formatCurrency(total)}
                            </span>
                        </div>

                        <div className="insight-item">
                            <span className="insight-label">Average Weekly Spending</span>
                            <span className="insight-value">
                                {formatCurrency(average)}
                            </span>
                        </div>
                    </>
                )}

                {/* MONTHLY */}
                {type === "monthly" && (
                    <>
                        <div className="insight-item">
                            <span className="insight-label">Highest Spending Month</span>
                            <span className="insight-value highlight">
                                {formatDate(highest.month_start, "month")} – {formatCurrency(highest.total_spent)}
                            </span>
                        </div>

                        <div className="insight-item">
                            <span className="insight-label">Lowest Spending Month</span>
                            <span className="insight-value subtle">
                                {formatDate(lowest.month_start, "month")} – {formatCurrency(lowest.total_spent)}
                            </span>
                        </div>

                        <div className="insight-item">
                            <span className="insight-label">Total Monthly Spending</span>
                            <span className="insight-value">
                                {formatCurrency(total)}
                            </span>
                        </div>

                        <div className="insight-item">
                            <span className="insight-label">Average Monthly Spending</span>
                            <span className="insight-value">
                                {formatCurrency(average)}
                            </span>
                        </div>
                    </>
                )}

            </div>
        </div>
    );
};

export default InsightsPanel;
