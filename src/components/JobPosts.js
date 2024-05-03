import React, { useEffect } from "react";
import styles from "./jobpost.module.css";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { EXPERIENCE, LOCATION, ROLES } from "../utils/constants/filters";
import { useSelector, useDispatch } from "react-redux";
import {
  addJD,
  fetchJobsData,
  filterByExperience,
  updateTotalCount,
} from "../redux/store";
import { fetchJobs } from "../utils/apis/fetchJobs";
const animatedComponents = makeAnimated();

const JobPosts = () => {
  const dispatch = useDispatch();
  const jdList = useSelector((state) => state.jdList);
  useEffect(() => {
    const jobsData = async () => {
      const data = await fetchJobs();
      if (!data) return;
      dispatch(addJD(data?.jdList));
      dispatch(updateTotalCount(data?.totalCount));
    };
    jobsData();
  }, []);

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
          options={EXPERIENCE}
          className={styles.select}
          classNamePrefix="select"
          placeholder="Experience"
          onChange={(e) => {
            dispatch(filterByExperience(e.value));
          }}
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
      {jdList.map((jd, i) => (
        <span key={i}>{jd.minExp}</span>
      ))}
    </div>
  );
};

export default JobPosts;
