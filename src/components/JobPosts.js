import React from "react";
import styles from "./jobpost.module.css";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { EXPERIENCE, LOCATION, ROLES } from "../utils/constants/filters";

const animatedComponents = makeAnimated();

const JobPosts = () => {
  return (
    <div className={styles.container}>
      <div className={styles.filters}>
        <Select
          closeMenuOnSelect={false}
          components={animatedComponents}
          isMulti
          options={ROLES}
          className={styles.select}
          classNamePrefix="select"
          placeholder="Role"
        />

        <Select
          closeMenuOnSelect={false}
          components={animatedComponents}
          isMulti
          options={EXPERIENCE}
          className={styles.select}
          classNamePrefix="select"
          placeholder="Experience"
        />
        <Select
          closeMenuOnSelect={false}
          components={animatedComponents}
          isMulti
          options={ROLES}
          className={styles.select}
          classNamePrefix="select"
          placeholder="Location"
        />

        <Select
          closeMenuOnSelect={false}
          components={animatedComponents}
          isMulti
          options={LOCATION}
          className={styles.select}
          classNamePrefix="select"
          placeholder="Remote"
        />

        <Select
          closeMenuOnSelect={false}
          components={animatedComponents}
          isMulti
          options={ROLES}
          className={styles.select}
          classNamePrefix="select"
          placeholder="Tech Stack"
        />
        <Select
          closeMenuOnSelect={false}
          components={animatedComponents}
          isMulti
          options={ROLES}
          className={styles.select}
          classNamePrefix="select"
          placeholder="Min Base Pay"
        />
        <input
          type="text"
          placeholder="Company Name"
          className={styles.input}
        />
      </div>
    </div>
  );
};

export default JobPosts;
