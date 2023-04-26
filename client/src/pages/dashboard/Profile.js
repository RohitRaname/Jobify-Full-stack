import React, { useState } from "react";
import Wrapper from "../../assets/wrappers/DashboardFormPage";
import { useAppContext } from "../../context/AppContext";
import { Alert, FormRow } from "../../components";

const Profile = () => {
  const { user, updateUser, displayAlert, showAlert, isLoading } =
    useAppContext();

  const [name, setName] = useState(user?.name);
  const [lastName, setLastName] = useState(user?.lastName);
  const [email, setEmail] = useState(user?.email);
  const [location, setLocation] = useState(user?.location);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !email || !lastName || !location) return displayAlert();

    updateUser({ name, lastName, email, location });
  };

  return (
    <Wrapper>
      <form className="form" onSubmit={handleSubmit}>
        <h3>Profile</h3>
        {showAlert && <Alert />}

        <div className="form-center">
          <FormRow
            name="name"
            type="text"
            value={name}
            handleChange={(e) => setName(() => e.target.value)}
          />
          <FormRow
            name="lastName"
            type="text"
            value={lastName}
            handleChange={(e) => setLastName(() => e.target.value)}
          />
          <FormRow
            name="email"
            type="email"
            value={email}
            handleChange={(e) => setEmail(() => e.target.value)}
          />
          <FormRow
            name="location"
            type="text"
            value={location}
            handleChange={(e) => setLocation(() => e.target.value)}
          />

          <button className="btn btn-block" type="submit" disabled={isLoading}>
            Save changes
          </button>
        </div>
      </form>
    </Wrapper>
  );
};

export default Profile;
