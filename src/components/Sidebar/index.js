import React, { useState } from 'react';
import DashboardSvg from '../../svg/Dashboard';
import EmploySvg from '../../svg/Employee';
import TaskSvg from '../../svg/Task';
import DocSvg from '../../svg/DocSvg';
import Account from '../../svg/Account';
import SettingSvg from '../../svg/Setting';
import './index.scss';

const Sidebar = ({ setCurrentScreen }) => {
  const [active, setActive] = useState('dashboard');
  return (
    <section className="sidebar">
      <h1 className="sidebar__title">HR</h1>
      <ul className="sidebar__ul">
        <li 
          className={`sidebar__li ${active === "dashboard" ? "sidebar__li-active" : " "}`}
          onClick={() => {
              setActive('dashboard');
              setCurrentScreen('Dashboard');
            }
          }
        >
            <DashboardSvg active={active} />
            Dashboard
        </li>
        <li 
          className={`sidebar__li ${active === "employment" ? "sidebar__li-active" : " "}`}
          onClick={() => {
              setActive('employment')
              setCurrentScreen('Employment');
            }
          }
        >
            <EmploySvg active={active} />
            Employment
        </li>
        <li 
          className={`sidebar__li ${active === "task" ? "sidebar__li-active" : " "}`}
          onClick={() => {
              setActive('task')
              setCurrentScreen('Tasks');
              }
            }
          >
            <TaskSvg active={active} />
            Tasks
        </li>
        <li 
          className={`sidebar__li ${active === "document" ? "sidebar__li-active" : " "}`}
          onClick={() => {
              setActive('document')
              setCurrentScreen('Documents');
            }
          }
        >
            <DocSvg active={active} />
            Documents
        </li>
        <li 
          className={`sidebar__li ${active === "account" ? "sidebar__li-active" : " "}`}
          onClick={() => {
            setActive('account')
            setCurrentScreen('Account');
            }
          }
        >
            <Account active={active} />
            Account
        </li>
        <li 
          className={`sidebar__li ${active === "setting" ? "sidebar__li-active" : " "}`}
          onClick={() => {
            setActive('setting')
            setCurrentScreen('Setting');
            }
          }
        >
          <SettingSvg active={active} />
            Setting
        </li>
      </ul>
    </section>
  )
};

export default Sidebar;