import React from "react";
import DashLayout from '../DashLayout';
import Sidebar from '../Sidebar';

import './index.scss';

const Dashboards = () => {
  return (
    <section className="dashboard">
      <main className="dashboard__sidebar">
        <Sidebar />
      </main>
      <main className="dashboard__layout">
        <DashLayout />
      </main>
    </section>
  )
};

export default Dashboards;
