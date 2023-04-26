import React, { useEffect } from "react";
import Wrapper from "../assets/wrappers/JobsContainer";
import Loading from "./Loading";
import { useAppContext } from "../context/AppContext";
import Job from "./Job";
import PageBtnContainer from "./PageBtnContainer";
import Alert from "./Alert";

// rohit focus just complete the course fast
const JobsContainer = () => {
  const {
    jobs,
    isLoading,
    showAlert,
    getJobs,
    searchText,
    searchJobStatus,
    searchJobType,
    searchSort,
    page,
  } = useAppContext();

  // due to mount and unmount(useEffect is applied from scratch)
  useEffect(() => {
    console.log("get-jobs");
    getJobs();
    // eslint-disable-next-line
  }, [searchText, searchJobStatus, searchJobType, searchSort, page]);

  if (isLoading)
    return (
      <Wrapper>
        <Loading center />
      </Wrapper>
    );
  if (jobs.length === 0)
    return (
      <Wrapper>
        <h3>No jobs</h3>
      </Wrapper>
    );

  return (
    <Wrapper>
      {showAlert && <Alert />}

      <div className="jobs">
        {jobs.map((job) => (
          <Job key={job._id} {...job} />
        ))}
      </div>
      {jobs.length > 0 && <PageBtnContainer />}
    </Wrapper>
  );
};

export default JobsContainer;
