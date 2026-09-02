import { useEffect, useState } from "react";
import Sidebar from "../../components/layout/Sidebar";
import { API_BASE_URL } from "../../services/apiBase";

const PLAN_LABELS = {
  daily: "Daily",
  weekly: "Weekly",
  monthly: "Monthly",
};

const STATUS_LABELS = {
  pending: "Pending",
  approved: "Approved",
  declined: "Declined",
};

const statusStyle = (status) => {
  const styles = {
    pending: {
      background: "#FFF4D6",
      color: "#9A6700",
      border: "1px solid #F2D58A",
    },
    approved: {
      background: "#E8F7EC",
      color: "#247A3B",
      border: "1px solid #B9E3C3",
    },
    declined: {
      background: "#FDECEC",
      color: "#B42318",
      border: "1px solid #F2B8B5",
    },
  };

  return styles[status] || styles.pending;
};

const formatDate = (value) => {
  if (!value) return "—";

  try {
    return new Date(value).toLocaleString("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  } catch {
    return "—";
  }
};

const styles = {
  container: {
    display: "flex",
    minHeight: "100vh",
    width: "100%",
    background: "#F5F8F3",
  },

  content: {
    marginLeft: "250px",
    width: "calc(100% - 250px)",
    minWidth: 0,
    padding: "35px",
    boxSizing: "border-box",
  },

  page: {
    width: "100%",
    maxWidth: "100%",
    minWidth: 0,
    overflowX: "hidden",
  },

  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "20px",
    marginBottom: "30px",
  },

  headerLeft: {
    minWidth: 0,
  },

  eyebrow: {
    margin: "0 0 8px",
    fontSize: "12px",
    fontWeight: "700",
    letterSpacing: "2px",
    color: "#7A8B76",
  },

  title: {
    margin: 0,
    fontSize: "38px",
    lineHeight: "1.15",
    fontWeight: "700",
    color: "#263525",
    letterSpacing: "-0.8px",
  },

  subtitle: {
    margin: "9px 0 0",
    fontSize: "14px",
    lineHeight: "1.6",
    color: "#748070",
  },

  refreshButton: {
    flexShrink: 0,
    border: "1px solid #D6E0D1",
    background: "#FFFFFF",
    color: "#344632",
    padding: "11px 18px",
    borderRadius: "10px",
    fontSize: "13px",
    fontWeight: "700",
    cursor: "pointer",
    transition: "all 0.2s ease",
  },

  summaryGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
    gap: "16px",
    marginBottom: "25px",
  },

  summaryCard: {
    background: "#FFFFFF",
    border: "1px solid #E3EADF",
    borderRadius: "15px",
    padding: "20px",
    boxSizing: "border-box",
    minWidth: 0,
  },

  summaryLabel: {
    margin: 0,
    fontSize: "11px",
    fontWeight: "700",
    letterSpacing: "1.3px",
    color: "#84907F",
    textTransform: "uppercase",
  },

  summaryValue: {
    margin: "8px 0 0",
    fontSize: "28px",
    fontWeight: "700",
    color: "#263525",
  },

  mainCard: {
    background: "#FFFFFF",
    border: "1px solid #E3EADF",
    borderRadius: "18px",
    overflow: "hidden",
    minWidth: 0,
  },

  cardHeader: {
    padding: "24px 26px",
    borderBottom: "1px solid #E8EDE5",
  },

  cardEyebrow: {
    margin: "0 0 5px",
    fontSize: "11px",
    fontWeight: "700",
    letterSpacing: "1.5px",
    color: "#82907C",
  },

  cardTitle: {
    margin: 0,
    fontSize: "21px",
    fontWeight: "700",
    color: "#293729",
  },

  list: {
    padding: "18px",
  },

  requestCard: {
    border: "1px solid #E2E9DE",
    borderRadius: "15px",
    overflow: "hidden",
    background: "#FFFFFF",
    marginBottom: "16px",
    minWidth: 0,
  },

  requestHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "20px",
    padding: "21px",
    background: "#FBFCFA",
    borderBottom: "1px solid #E8EDE5",
  },

  customerSection: {
    display: "flex",
    alignItems: "center",
    gap: "14px",
    minWidth: 0,
    flex: 1,
  },

  avatar: {
    width: "48px",
    height: "48px",
    minWidth: "48px",
    borderRadius: "50%",
    background: "#E8F0E5",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#496142",
    fontSize: "17px",
    fontWeight: "700",
  },

  customerInfo: {
    minWidth: 0,
  },

  requestNumber: {
    margin: "0 0 4px",
    fontSize: "11px",
    color: "#8A9485",
    fontWeight: "600",
  },

  customerName: {
    margin: 0,
    fontSize: "16px",
    color: "#283628",
    fontWeight: "700",
    wordBreak: "break-word",
  },

  contactRow: {
    display: "flex",
    flexWrap: "wrap",
    gap: "5px 18px",
    marginTop: "5px",
  },

  contactText: {
    margin: 0,
    fontSize: "12px",
    color: "#7B8677",
    wordBreak: "break-word",
  },

  statusSection: {
    flexShrink: 0,
  },

  statusBadge: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "7px 12px",
    borderRadius: "999px",
    fontSize: "11px",
    fontWeight: "700",
    whiteSpace: "nowrap",
  },

  detailsContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
    gap: "1px",
    background: "#E7ECE4",
    borderBottom: "1px solid #E7ECE4",
  },

  detailItem: {
    background: "#FFFFFF",
    padding: "18px",
    minWidth: 0,
  },

  detailLabel: {
    margin: "0 0 7px",
    fontSize: "10px",
    letterSpacing: "1.2px",
    fontWeight: "700",
    color: "#8A9485",
  },

  detailValue: {
    margin: 0,
    fontSize: "14px",
    fontWeight: "700",
    color: "#354633",
    wordBreak: "break-word",
  },

  notes: {
    padding: "18px 20px",
    background: "#FCFDFB",
    borderBottom: "1px solid #E7ECE4",
  },

  notesLabel: {
    margin: "0 0 6px",
    fontSize: "10px",
    fontWeight: "700",
    letterSpacing: "1.2px",
    color: "#8A9485",
  },

  notesText: {
    margin: 0,
    fontSize: "13px",
    lineHeight: "1.6",
    color: "#596457",
    whiteSpace: "pre-wrap",
    wordBreak: "break-word",
  },

  actionArea: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "20px",
    padding: "17px 20px",
  },

  actionText: {
    margin: 0,
    fontSize: "12px",
    color: "#7D8779",
  },

  statusControl: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    minWidth: "190px",
  },

  statusControlLabel: {
    fontSize: "11px",
    fontWeight: "700",
    color: "#697464",
    whiteSpace: "nowrap",
  },

  select: {
    width: "190px",
    height: "40px",
    padding: "0 12px",
    borderRadius: "9px",
    border: "1px solid #D5DED0",
    background: "#FFFFFF",
    color: "#344532",
    fontSize: "13px",
    fontWeight: "600",
    outline: "none",
    cursor: "pointer",
    boxSizing: "border-box",
  },

  alert: {
    padding: "13px 16px",
    borderRadius: "10px",
    marginBottom: "18px",
    fontSize: "13px",
    lineHeight: "1.5",
  },

  error: {
    background: "#FDECEC",
    border: "1px solid #F3C1BE",
    color: "#A4261B",
  },

  success: {
    background: "#EAF7ED",
    border: "1px solid #BDE2C4",
    color: "#24713A",
  },

  loading: {
    padding: "50px 20px",
    textAlign: "center",
    color: "#7B8677",
    fontSize: "14px",
  },

  empty: {
    padding: "55px 20px",
    textAlign: "center",
    color: "#788374",
  },

  emptyTitle: {
    margin: "0 0 7px",
    fontSize: "17px",
    fontWeight: "700",
    color: "#344332",
  },

  emptyText: {
    margin: 0,
    fontSize: "13px",
  },

  emptyButton: {
    marginTop: "18px",
    border: "none",
    background: "#4D6746",
    color: "#FFFFFF",
    padding: "10px 17px",
    borderRadius: "9px",
    fontWeight: "700",
    cursor: "pointer",
  },
};

export default function AdminSubscriptions() {
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState("");
  const [error, setError] = useState("");
  const [feedback, setFeedback] = useState("");

  const fetchSubscriptions = async () => {
    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("adminToken");

      const headers = {};

      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }

      const response = await fetch(
        `${API_BASE_URL}/api/admin/subscriptions`,
        { headers }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message || "Unable to load subscription requests"
        );
      }

      setSubscriptions(data.subscriptions || []);
    } catch (err) {
      setError(err.message || "Unable to load subscription requests");
      setSubscriptions([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubscriptions();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      setUpdatingId(id);
      setFeedback("");
      setError("");

      const token = localStorage.getItem("adminToken");

      const headers = {
        "Content-Type": "application/json",
      };

      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }

      const response = await fetch(
        `${API_BASE_URL}/api/admin/subscriptions/${id}/status`,
        {
          method: "PATCH",
          headers,
          body: JSON.stringify({ status }),
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message || "Unable to update status"
        );
      }

      setSubscriptions((current) =>
        current.map((item) =>
          item._id === id ? data.subscription : item
        )
      );

      setFeedback("Subscription status updated.");
    } catch (err) {
      setError(err.message || "Unable to update status");
    } finally {
      setUpdatingId("");
    }
  };

  const pendingCount = subscriptions.filter(
    (item) => item.status === "pending"
  ).length;

  const approvedCount = subscriptions.filter(
    (item) => item.status === "approved"
  ).length;

  const declinedCount = subscriptions.filter(
    (item) => item.status === "declined"
  ).length;

  return (
    <div style={styles.container}>
      <Sidebar />

      <main
        className="subscription-content"
        style={styles.content}
      >
        <div
          className="subscription-page"
          style={styles.page}
        >
          {/* HEADER */}
          <div
            className="subscription-header"
            style={styles.header}
          >
            <div style={styles.headerLeft}>
              <p style={styles.eyebrow}>
                AMRUTHAHARA ADMIN
              </p>

              <h1
                className="subscription-header-title"
                style={styles.title}
              >
                Subscription Management
              </h1>

              <p
                className="subscription-header-subtitle"
                style={styles.subtitle}
              >
                Review and manage customer subscription requests.
              </p>
            </div>

            <button
              className="subscription-refresh-button"
              style={styles.refreshButton}
              onClick={fetchSubscriptions}
              disabled={loading}
            >
              {loading ? "Refreshing..." : "↻ Refresh"}
            </button>
          </div>

          {/* SUMMARY */}
          <div
            className="subscription-summary-grid"
            style={styles.summaryGrid}
          >
            <div style={styles.summaryCard}>
              <p style={styles.summaryLabel}>
                Total Requests
              </p>
              <p style={styles.summaryValue}>
                {subscriptions.length}
              </p>
            </div>

            <div style={styles.summaryCard}>
              <p style={styles.summaryLabel}>
                Pending
              </p>
              <p style={styles.summaryValue}>
                {pendingCount}
              </p>
            </div>

            <div style={styles.summaryCard}>
              <p style={styles.summaryLabel}>
                Approved
              </p>
              <p style={styles.summaryValue}>
                {approvedCount}
              </p>
            </div>

            <div style={styles.summaryCard}>
              <p style={styles.summaryLabel}>
                Declined
              </p>
              <p style={styles.summaryValue}>
                {declinedCount}
              </p>
            </div>
          </div>

          {/* ALERTS */}
          {error && (
            <div
              style={{
                ...styles.alert,
                ...styles.error,
              }}
            >
              {error}
            </div>
          )}

          {feedback && (
            <div
              style={{
                ...styles.alert,
                ...styles.success,
              }}
            >
              {feedback}
            </div>
          )}

          {/* MAIN CARD */}
          <section style={styles.mainCard}>
            <div
              className="subscription-card-header"
              style={styles.cardHeader}
            >
              <p style={styles.cardEyebrow}>
                CUSTOMER REQUESTS
              </p>

              <h2 style={styles.cardTitle}>
                Subscription Requests
              </h2>
            </div>

            {loading ? (
              <div style={styles.loading}>
                Loading subscription requests...
              </div>
            ) : subscriptions.length === 0 ? (
              <div style={styles.empty}>
                <h3 style={styles.emptyTitle}>
                  No subscription requests
                </h3>

                <p style={styles.emptyText}>
                  There are currently no customer subscription
                  requests to display.
                </p>

                <button
                  className="subscription-empty-button"
                  style={styles.emptyButton}
                  onClick={fetchSubscriptions}
                >
                  Refresh Requests
                </button>
              </div>
            ) : (
              <div
                className="subscription-list"
                style={styles.list}
              >
                {subscriptions.map((item, index) => {
                  const customer =
                    item.user ||
                    item.customer ||
                    item;

                  const name =
                    customer?.name ||
                    customer?.fullName ||
                    "Customer";

                  const email =
                    customer?.email ||
                    item.email ||
                    "No email";

                  const phone =
                    customer?.phone ||
                    item.phone ||
                    "No phone";

                  const initials = name
                    .split(" ")
                    .map((part) => part.charAt(0))
                    .join("")
                    .slice(0, 2)
                    .toUpperCase();

                  const status =
                    item.status || "pending";

                  const plan =
                    PLAN_LABELS[item.plan] ||
                    item.plan ||
                    "—";

                  const days =
                    item.days ||
                    item.duration ||
                    "—";

                  return (
                    <article
                      className="subscription-request-card"
                      style={styles.requestCard}
                      key={item._id || index}
                    >
                      {/* REQUEST HEADER */}
                      <div
                        className="subscription-request-header"
                        style={styles.requestHeader}
                      >
                        <div
                          className="subscription-customer-section"
                          style={styles.customerSection}
                        >
                          <div style={styles.avatar}>
                            {initials}
                          </div>

                          <div style={styles.customerInfo}>
                            <p style={styles.requestNumber}>
                              REQUEST #{index + 1}
                            </p>

                            <h3 style={styles.customerName}>
                              {name}
                            </h3>

                            <div
                              className="subscription-contact-row"
                              style={styles.contactRow}
                            >
                              <p style={styles.contactText}>
                                {email}
                              </p>

                              <p style={styles.contactText}>
                                {phone}
                              </p>
                            </div>
                          </div>
                        </div>

                        <div
                          className="subscription-status-section"
                          style={styles.statusSection}
                        >
                          <span
                            style={{
                              ...styles.statusBadge,
                              ...statusStyle(status),
                            }}
                          >
                            {STATUS_LABELS[status] ||
                              status}
                          </span>
                        </div>
                      </div>

                      {/* DETAILS */}
                      <div
                        className="subscription-details-grid"
                        style={styles.detailsContainer}
                      >
                        <div style={styles.detailItem}>
                          <p style={styles.detailLabel}>
                            PLAN
                          </p>

                          <p style={styles.detailValue}>
                            {plan}
                          </p>
                        </div>

                        <div style={styles.detailItem}>
                          <p style={styles.detailLabel}>
                            DAYS
                          </p>

                          <p style={styles.detailValue}>
                            {days}
                          </p>
                        </div>

                        <div style={styles.detailItem}>
                          <p style={styles.detailLabel}>
                            REQUESTED
                          </p>

                          <p style={styles.detailValue}>
                            {formatDate(
                              item.createdAt ||
                                item.requestedAt
                            )}
                          </p>
                        </div>

                        <div style={styles.detailItem}>
                          <p style={styles.detailLabel}>
                            LAST UPDATED
                          </p>

                          <p style={styles.detailValue}>
                            {formatDate(
                              item.updatedAt
                            )}
                          </p>
                        </div>
                      </div>

                      {/* NOTES */}
                      {item.notes && (
                        <div style={styles.notes}>
                          <p style={styles.notesLabel}>
                            CUSTOMER NOTES
                          </p>

                          <p style={styles.notesText}>
                            {item.notes}
                          </p>
                        </div>
                      )}

                      {/* ACTION AREA */}
                      <div
                        className="subscription-action-area"
                        style={styles.actionArea}
                      >
                        <p style={styles.actionText}>
                          Update the current subscription status.
                        </p>

                        <div
                          className="subscription-status-control"
                          style={styles.statusControl}
                        >
                          <span
                            style={
                              styles.statusControlLabel
                            }
                          >
                            STATUS
                          </span>

                          <select
                            className="subscription-select"
                            style={styles.select}
                            value={status}
                            disabled={
                              updatingId === item._id
                            }
                            onChange={(event) =>
                              updateStatus(
                                item._id,
                                event.target.value
                              )
                            }
                          >
                            <option value="pending">
                              Pending
                            </option>

                            <option value="approved">
                              Approved
                            </option>

                            <option value="declined">
                              Declined
                            </option>
                          </select>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            )}
          </section>
        </div>
      </main>

      <style>{`
        * {
          box-sizing: border-box;
        }

        .subscription-content {
          min-width: 0;
        }

        .subscription-page {
          min-width: 0;
          max-width: 100%;
        }

        .subscription-refresh-button:hover {
          background: #F3F7F0 !important;
          border-color: #C7D4C1 !important;
        }

        .subscription-refresh-button:disabled {
          opacity: 0.65;
          cursor: not-allowed;
        }

        .subscription-empty-button:hover {
          background: #40583B !important;
        }

        .subscription-select:focus {
          border-color: #809478 !important;
          box-shadow: 0 0 0 3px rgba(91, 116, 82, 0.1);
        }

        .subscription-select:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .subscription-request-card:last-child {
          margin-bottom: 0 !important;
        }

        @media (max-width: 1250px) {
          .subscription-summary-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
          }

          .subscription-details-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
          }
        }

        @media (max-width: 1100px) {
          .subscription-content {
            margin-left: 0 !important;
            width: 100% !important;
          }
        }

        @media (max-width: 850px) {
          .subscription-content {
            padding: 24px 20px !important;
          }

          .subscription-header {
            align-items: flex-start !important;
          }

          .subscription-header-title {
            font-size: 32px !important;
          }

          .subscription-request-header {
            align-items: flex-start !important;
          }

          .subscription-status-section {
            padding-top: 2px;
          }

          .subscription-action-area {
            align-items: flex-start !important;
          }

          .subscription-status-control {
            min-width: 0 !important;
          }

          .subscription-select {
            width: 180px !important;
          }
        }

        @media (max-width: 700px) {
          .subscription-content {
            padding: 20px 12px !important;
          }

          .subscription-header {
            gap: 15px !important;
          }

          .subscription-card-header {
            padding: 20px !important;
          }

          .subscription-list {
            padding: 12px !important;
          }

          .subscription-request-header {
            padding: 17px !important;
          }

          .subscription-action-area {
            padding: 15px !important;
          }
        }

        @media (max-width: 600px) {
          .subscription-header {
            flex-direction: column !important;
            align-items: stretch !important;
            margin-bottom: 22px !important;
          }

          .subscription-header-title {
            font-size: 28px !important;
            line-height: 1.2 !important;
          }

          .subscription-header-subtitle {
            font-size: 12px !important;
          }

          .subscription-refresh-button {
            width: 100% !important;
            min-height: 42px;
          }

          .subscription-summary-grid {
            grid-template-columns: 1fr !important;
            gap: 12px !important;
            margin-bottom: 18px !important;
          }

          .subscription-summary-grid > div {
            padding: 16px !important;
          }

          .subscription-request-header {
            flex-direction: column !important;
            gap: 14px !important;
          }

          .subscription-customer-section {
            width: 100% !important;
          }

          .subscription-status-section {
            width: 100% !important;
            padding-top: 0 !important;
          }

          .subscription-status-section span {
            width: 100%;
          }

          .subscription-contact-row {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 3px !important;
          }

          .subscription-details-grid {
            grid-template-columns: 1fr !important;
            gap: 1px !important;
          }

          .subscription-details-grid > div {
            padding: 14px 16px !important;
          }

          .subscription-action-area {
            flex-direction: column !important;
            align-items: stretch !important;
            gap: 12px !important;
          }

          .subscription-action-area > p {
            width: 100%;
          }

          .subscription-status-control {
            width: 100% !important;
            flex-direction: column !important;
            align-items: stretch !important;
            gap: 7px !important;
          }

          .subscription-status-control .subscription-select {
            width: 100% !important;
          }

          .subscription-card-header {
            padding: 18px !important;
          }

          .subscription-card-header h2 {
            font-size: 19px !important;
          }

          .subscription-request-card {
            border-radius: 12px !important;
          }

          .subscription-list {
            padding: 10px !important;
          }

          .subscription-page {
            overflow-x: hidden !important;
          }
        }

        @media (max-width: 380px) {
          .subscription-content {
            padding: 18px 9px !important;
          }

          .subscription-header-title {
            font-size: 25px !important;
          }

          .subscription-customer-section {
            gap: 10px !important;
          }

          .subscription-customer-section > div:first-child {
            width: 42px !important;
            height: 42px !important;
            min-width: 42px !important;
          }
        }
      `}</style>
    </div>
  );
}
