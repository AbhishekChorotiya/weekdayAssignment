import React, { useState } from "react";
import styles from "./jobpost.module.css";
import { capitalizeFirstLetter } from "../utils/helpers";

const JobCard = ({
  name = "",
  role = "",
  location = "",
  salary = "",
  details = "",
  experience = "",
  logo = "",
  jdLink = "",
}) => {
  const [showMore, setShowMore] = useState(false);
  return (
    <div className={styles.card}>
      <div className={styles.companyInfo}>
        <div className={styles.logo}>
          <img
            alt="logo"
            src={logo}
            style={{ width: "100%", height: "100%", objectFit: "contain" }}
          />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "0.2rem",
          }}
        >
          <span style={{ fontWeight: "bold", color: "#8b8b8b" }}>{name}</span>
          <span>{capitalizeFirstLetter(role)}</span>
          <span style={{ fontSize: 14 }}>
            {capitalizeFirstLetter(location)}
          </span>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          gap: "0.5rem",
          marginTop: "1rem",
          fontWeight: "400",
        }}
      >
        <span>Estimated Salary:</span>
        <span>{salary || "Undisclosed"}</span>
        <span>✅</span>
      </div>
      <div
        style={{
          display: "flex",
          gap: "0.5rem",
          flexDirection: "column",
          marginTop: "0.5rem",
        }}
      >
        <span style={{ fontWeight: "bold" }}>Job Details:</span>
        <div
          className={styles.jobDetail}
          style={{ height: showMore ? "fit-content" : "12rem" }}
          onClick={() => showMore && setShowMore(false)}
        >
          <span>{details}</span>
          {!showMore && <div className={styles.overlay} />}
          {!showMore && (
            <span
              style={{
                position: "absolute",
                bottom: "1rem",
                cursor: "pointer",
                color: "#4943da",
              }}
              onClick={() => setShowMore(!showMore)}
            >
              Expand
            </span>
          )}
        </div>
      </div>
      <div
        style={{
          display: "flex",
          gap: "0.2rem",
          marginTop: "1rem",
          flexDirection: "column",
        }}
      >
        <span
          style={{ fontWeight: "bold", color: "#8b8b8b", letterSpacing: "1px" }}
        >
          Minimum Experience
        </span>
        <span>{experience || 0} years</span>
      </div>
      <a
        className={styles.button}
        href={jdLink}
        target="_blank"
        rel="noopener noreferrer"
      >
        ⚡ Easy Apply
      </a>
    </div>
  );
};

export default JobCard;
