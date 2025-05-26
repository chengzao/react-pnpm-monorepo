import { Outlet, NavLink } from 'react-router-dom';

import * as Components from '../components/index';

export default function Root() {
  const menus = Object.keys(Components) || [];

  return (
    <>
      <div id="sidebar">
        <h1>React Components</h1>
        <div>Menus List</div>
        <nav>
          <ul>
            {menus.map((link) => {
              return (
                <li key={link}>
                  <NavLink to={`component/${link}`}>{link}</NavLink>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
      <div id="detail">
        <Outlet />
      </div>
    </>
  );
}
