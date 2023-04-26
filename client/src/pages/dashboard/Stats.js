import React, { useEffect } from "react";
import { useAppContext } from "../../context/AppContext.js";
import Loading from "../../components/Loading.js";
import StatsContainer from "../../components/StatsContainer.js";
import ChartsContainer from "../../components/ChartsContainer.js";

const Stats = () => {
  const { showStats, isLoading, stats, monthlyApplications } = useAppContext();

  useEffect(() => {
    showStats();
    // eslint-disable-next-line 
  }, []);

  if (isLoading) return <Loading center/>;

  return (
    <>
      <StatsContainer stats={stats} />
      {monthlyApplications?.length > 0 && <ChartsContainer monthlyApplications={monthlyApplications} />}
    </>
  );
};

export default Stats;
