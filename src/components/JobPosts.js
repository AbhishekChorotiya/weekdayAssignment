import React, { useEffect, useState } from "react";
import styles from "./jobpost.module.css";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { EXPERIENCE, LOCATION, PAY, ROLES } from "../utils/constants/filters";
import { useSelector, useDispatch } from "react-redux";
import { addJD, updateTotalCount } from "../redux/store";
import { fetchJobs } from "../utils/apis/fetchJobs";
const animatedComponents = makeAnimated();

const JobPosts = () => {
  const dispatch = useDispatch();
  const jdList = useSelector((state) => state.jdList);
  const locations = useSelector((state) => state.locations);
  const [tempJDList, setTempJDList] = useState([]);
  const [filter, setFilter] = useState({
    roles: [],
    location: [],
    experience: null,
    minPay: null,
    name: null,
    locationType: null,
  });
  const [fetching, setFetching] = useState(false);
  let page = 0;

  const handleInfiniteScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight &&
      !fetching
    ) {
      const jobsData = async () => {
        setFetching(true);
        const data = await fetchJobs(page++);
        if (!data) return;
        dispatch(addJD(data?.jdList));
        dispatch(updateTotalCount(data?.totalCount));
        setFetching(false);
      };
      jobsData();
    }
  };

  useEffect(() => {
    const jobsData = async () => {
      const data = await fetchJobs(page++);
      if (!data) return;
      dispatch(addJD(data?.jdList));
      setTempJDList(data?.jdList);
      dispatch(updateTotalCount(data?.totalCount));
      if (window.innerHeight >= document.documentElement.offsetHeight) {
        jobsData();
      }
    };
    jobsData();

    window.addEventListener("scroll", handleInfiniteScroll, {
      passive: true,
    });
    return () => window.removeEventListener("scroll", handleInfiniteScroll);
  }, []);

  useEffect(() => {
    console.log(filter);
    let filteredList = jdList;

    if (filter?.roles?.length > 0) {
      filteredList = filteredList?.filter((jd) =>
        filter?.roles?.includes(jd?.jobRole)
      );
    }
    if (filter?.experience) {
      filteredList = filteredList?.filter(
        (jd) => jd?.minExp <= filter?.experience
      );
    }
    if (filter?.minPay) {
      filteredList = filteredList?.filter(
        (jd) => jd?.minJdSalary >= filter?.minPay
      );
    }
    if (filter?.locationType?.length > 0) {
      filteredList = filteredList?.filter((jd) =>
        filter?.locationType?.includes(jd?.location.toLowerCase())
      );
    }

    if (filter?.location?.length > 0) {
      filteredList = filteredList?.filter((jd) =>
        filter?.location?.includes(jd?.location.toUpperCase())
      );
    }

    if (filter?.name) {
      filteredList = filteredList?.filter((jd) =>
        jd?.companyName?.toLowerCase().includes(filter?.name?.toLowerCase())
      );
    }
    console.log(filteredList);

    setTempJDList(filteredList);
  }, [filter, jdList]);

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
          onChange={(data) =>
            setFilter({ ...filter, roles: data.map((e) => e.value) })
          }
        />

        <Select
          closeMenuOnSelect={false}
          components={animatedComponents}
          options={EXPERIENCE}
          className={styles.select}
          classNamePrefix="select"
          placeholder="Experience"
          onChange={(data) => setFilter({ ...filter, experience: data.value })}
        />
        <Select
          closeMenuOnSelect={false}
          components={animatedComponents}
          isMulti
          options={locations.map((location) => ({
            label: location,
            value: location,
          }))}
          className={styles.select}
          classNamePrefix="select"
          placeholder="Location"
          onChange={(data) =>
            setFilter({ ...filter, location: data.map((e) => e.value) })
          }
        />

        <Select
          closeMenuOnSelect={false}
          components={animatedComponents}
          isMulti
          options={LOCATION}
          className={styles.select}
          classNamePrefix="select"
          placeholder="Remote"
          onChange={(data) =>
            setFilter({ ...filter, locationType: data.map((e) => e.value) })
          }
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
          options={PAY}
          className={styles.select}
          classNamePrefix="select"
          placeholder="Min Base Pay"
          onChange={(data) => setFilter({ ...filter, minPay: data.value })}
        />
        <input
          type="text"
          placeholder="Company Name"
          className={styles.input}
          onChange={(e) => setFilter({ ...filter, name: e.target.value })}
        />
      </div>
      {tempJDList.map((jd, i) => (
        <div
          key={i}
          style={{
            display: "flex",
            gap: "1rem",
            borderBottom: "1px solid black",
            marginTop: "1rem",
          }}
        >
          <span style={{ width: "150px", display: "flex", flexWrap: "wrap" }}>
            {jd.companyName}
          </span>
          <span style={{ width: "150px", display: "flex", flexWrap: "wrap" }}>
            {jd.jobRole}
          </span>
          <span style={{ width: "150px", display: "flex", flexWrap: "wrap" }}>
            {jd.location}
          </span>
          <span style={{ width: "150px", display: "flex", flexWrap: "wrap" }}>
            {jd.minExp}
          </span>
          <span style={{ width: "150px", display: "flex", flexWrap: "wrap" }}>
            ${jd.maxJdSalary}
          </span>
          <span style={{ width: "150px", display: "flex", flexWrap: "wrap" }}>
            currency {jd.salaryCurrencyCode}
          </span>
        </div>
      ))}
    </div>
  );
};

export default JobPosts;
