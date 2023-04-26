import React from "react";
import { useAppContext } from "../../context/AppContext";
import Wrapper from "../../assets/wrappers/DashboardFormPage";
import { FormRow, FormRowSelect, Alert } from "../../components";

const AddJob = () => {
  const {
    isLoading,
    isEditing,
    showAlert,
    displayAlert,
    position,
    company,
    jobLocation,
    jobType,
    jobTypeOptions,
    status,
    statusOptions,

    // functions
    handleChange,
    clearValues,
    createJob,
    editJob,
  } = useAppContext();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!position || !company || !jobLocation) {
      displayAlert();
      return;
    }

    if (isEditing) {
      editJob();
      return;
    }

    createJob({ position, company, jobType, status, jobLocation });
  };

  const handleJobInput = (e) => {
    const { name, value } = e.target;
    handleChange({ name, value });
  };

  return (
    <Wrapper>
      <form className="form" onSubmit={handleSubmit}>
        <h3>{isEditing ? "edit job" : "add job"}</h3>
        {showAlert && <Alert />}

        <div className="form-center">
          <FormRow
            type="text"
            name="position"
            value={position}
            handleChange={handleJobInput}
          />
          <FormRow
            type="text"
            name="company"
            value={company}
            handleChange={handleJobInput}
          />
          <FormRow
            type="text"
            name="jobLocation"
            labelText="Job Location"
            value={jobLocation}
            handleChange={handleJobInput}
          />

          <FormRowSelect
            name="status"
            value={status}
            list={statusOptions}
            handleChange={handleJobInput}
          />
          <FormRowSelect
            name="jobType"
            labelText="Job Type"
            value={jobType}
            list={jobTypeOptions}
            handleChange={handleJobInput}
          />

          <div className="btn-container">
            <button
              type="submit"
              className="btn btn-block "
              disabled={isLoading}
            >
              Submit
            </button>
            <button
              type="button"
              className="btn btn-block  clear-btn"
              onClick={clearValues}
              disabled={isLoading}
            >
              Clear
            </button>
          </div>
        </div>
      </form>
    </Wrapper>
  );
};

export default AddJob;
