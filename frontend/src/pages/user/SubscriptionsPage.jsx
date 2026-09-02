
import React from "react";
import UserSidebar from "../../components/user/UserSidebar";
import SubscriptionRequestSection from "../../components/SubscriptionRequestSection";
import { FaCrown } from "react-icons/fa";

function SubscriptionsPage() {
  return (
    <div className="subscription-page">
      <UserSidebar />

      <main className="subscription-content">
        <div className="subscription-header">
          <div className="subscription-eyebrow">
            <FaCrown size={10} />
            AMRUTHAHARA MEMBERSHIP
          </div>

          <h1 className="subscription-title">
            Subscriptions
          </h1>

          <p className="subscription-subtitle">
            Send a subscription request and track its status from your
            dashboard.
          </p>
        </div>

        <div className="subscription-request-wrapper">
          <SubscriptionRequestSection />
        </div>
      </main>

      <style>{`
        * {
          box-sizing: border-box;
        }

        /* ==========================================
           PAGE
        ========================================== */

        .subscription-page {
          min-height: 100vh;
          width: 100%;
          display: flex;
          background: #f7faf7;
          color: #23432e;
          overflow-x: hidden;
        }

        /* ==========================================
           MAIN CONTENT
        ========================================== */

        .subscription-content {
          flex: 1;
          width: calc(100% - 250px);
          min-width: 0;
          padding: 45px 5%;
          box-sizing: border-box;
        }

        /* ==========================================
           HEADER
        ========================================== */

        .subscription-header {
          width: 100%;
          max-width: 1120px;
          margin: 0 auto 35px;
        }

        .subscription-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          margin-bottom: 9px;

          color: #39764b;
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 1.5px;
          text-transform: uppercase;
        }

        .subscription-title {
          margin: 0 0 8px;

          color: #23432e;
          font-family: "Playfair Display", Georgia, serif;
          font-size: clamp(32px, 4vw, 48px);
          font-weight: 600;
          line-height: 1.15;
          letter-spacing: -0.8px;
        }

        .subscription-subtitle {
          max-width: 650px;
          margin: 0;

          color: #78847b;
          font-size: 14px;
          line-height: 1.7;
        }

        /* ==========================================
           REQUEST SECTION
        ========================================== */

        .subscription-request-wrapper {
          width: 100%;
          max-width: 1120px;
          margin: 0 auto;
        }

        /*
          Make the SubscriptionRequestSection use the
          same responsive structure as the working
          public Subscription page.
        */

        .subscription-request-wrapper
        .amrutha-sub-request-grid {
          width: 100%;
          max-width: 1120px;
          margin: auto;

          display: grid;
          grid-template-columns:
            minmax(0, 1.2fr)
            minmax(0, 0.8fr);

          gap: 24px;
          align-items: start;
        }

        .subscription-request-wrapper
        .amrutha-sub-form,

        .subscription-request-wrapper
        .amrutha-sub-track-card {
          width: 100%;
          min-width: 0;
          box-sizing: border-box;

          padding: 28px 26px;

          border: 1px solid #e6e5dd;
          border-radius: 18px;

          background: #ffffff;
        }

        .subscription-request-wrapper
        .amrutha-sub-input {
          width: 100%;
          max-width: 100%;
          box-sizing: border-box;
        }

        .subscription-request-wrapper
        textarea {
          max-width: 100%;
          box-sizing: border-box;
        }

        /* ==========================================
           TABLET
        ========================================== */

        @media (max-width: 1100px) {

          .subscription-content {
            padding: 40px 4%;
          }

          .subscription-request-wrapper
          .amrutha-sub-request-grid {
            grid-template-columns:
              minmax(0, 1fr)
              minmax(0, 1fr);
          }
        }

        /* ==========================================
           MOBILE / SMALL TABLET
        ========================================== */

        @media (max-width: 900px) {

          .subscription-page {
            display: block;
            width: 100%;
            min-height: 100vh;
          }

          .subscription-content {
            width: 100% !important;
            min-width: 0;
            padding: 28px 20px 50px !important;
          }

          .subscription-header {
            width: 100%;
            margin-bottom: 30px;
          }

          .subscription-title {
            font-size: 38px;
          }

          .subscription-subtitle {
            font-size: 13px;
          }

          .subscription-request-wrapper {
            width: 100%;
          }

          .subscription-request-wrapper
          .amrutha-sub-request-grid {
            grid-template-columns: 1fr !important;
            gap: 20px;
          }

          .subscription-request-wrapper
          .amrutha-sub-form,

          .subscription-request-wrapper
          .amrutha-sub-track-card {
            width: 100%;
            padding: 24px 20px;
          }
        }

        /* ==========================================
           MOBILE
        ========================================== */

        @media (max-width: 600px) {

          .subscription-content {
            padding: 24px 16px 45px !important;
          }

          .subscription-header {
            margin-bottom: 25px;
          }

          .subscription-eyebrow {
            font-size: 9px;
            letter-spacing: 1.5px;
          }

          .subscription-title {
            font-size: 34px;
            letter-spacing: -0.5px;
          }

          .subscription-subtitle {
            font-size: 12px;
            line-height: 1.7;
          }

          .subscription-request-wrapper
          .amrutha-sub-request-grid {
            gap: 16px;
          }

          .subscription-request-wrapper
          .amrutha-sub-form,

          .subscription-request-wrapper
          .amrutha-sub-track-card {
            padding: 22px 18px;
            border-radius: 16px;
          }

          .subscription-request-wrapper
          .amrutha-sub-track-card h3 {
            font-size: 24px;
          }

          .subscription-request-wrapper
          .amrutha-sub-label {
            font-size: 11px;
          }

          .subscription-request-wrapper
          .amrutha-sub-input {
            font-size: 13px;
            padding: 11px 13px;
          }

          .subscription-request-wrapper
          .amrutha-sub-textarea {
            min-height: 100px;
          }
        }

        /* ==========================================
           VERY SMALL PHONES
        ========================================== */

        @media (max-width: 380px) {

          .subscription-content {
            padding-left: 13px !important;
            padding-right: 13px !important;
          }

          .subscription-title {
            font-size: 30px;
          }

          .subscription-subtitle {
            font-size: 11px;
          }

          .subscription-request-wrapper
          .amrutha-sub-form,

          .subscription-request-wrapper
          .amrutha-sub-track-card {
            padding: 20px 15px;
          }
        }
      `}</style>
    </div>
  );
}

export default SubscriptionsPage;

