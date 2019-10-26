import React, { useState } from "react";
import { find } from "lodash";
import {Menu, Label, Dropdown, Icon} from "semantic-ui-react";
import { logout } from "../../util/api";
import styles from "./styles.module.css";
import { paths } from "../../App";
import {withRouter} from "react-router-dom";

const handleLogout = () => logout()
  .then(() => window.location.reload());

const menuItems = [{
  name: "summary",
  icon: "sitemap",
  text: "Summary",
}, {
  name: "assets",
  icon: "diamond",
  text: "Assets",
}, {
  name: "reports",
  icon: "chart line",
  text: "Reports",
}, {
  name: "settings",
  icon: "settings",
  text: "Settings",
}, {
  name: "notifications",
  skip: true,
}];

const NavBar = ({ history }) => {
  const activeItem = (find(menuItems, (item) => paths[item.name] === window.location.pathname) || { name: "assets" }).name;

  const handleItemClick = (e, { name }) => {
    history.push(paths[name]);
  };

  return (
    <div className={styles.container}>
      <Menu pointing secondary size="massive">
        <Menu.Header>
          <div className={styles.brand}>
            AssTracker
          </div>
        </Menu.Header>
        {menuItems.filter(menuItem => !menuItem.skip).map(menuItem => (
          <Menu.Item
            key={menuItem.name}
            name={menuItem.name}
            active={activeItem === menuItem.name}
            onClick={handleItemClick}
          >
            <Icon name={menuItem.icon} color={activeItem === menuItem.name ? styles.white : styles.grey} />
            <span className={`${activeItem === menuItem.name ? styles.white : styles.grey} ${styles.menuItem}`}>{menuItem.text}</span>
          </Menu.Item>
        ))}
        <Menu.Item
          name="notifications"
          active={activeItem === 'notifications'}
          onClick={handleItemClick}
        >
          <Icon name="bell" color={activeItem === "notifications" ? styles.white : styles.grey} />
          <span className={`${activeItem === "notifications" ? styles.white : styles.grey} ${styles.menuItem}`}>Notifications</span>
          <Label color="red">3</Label>
        </Menu.Item>
        <Menu.Menu position="right">
          <Dropdown item pointing icon='user'>
            <Dropdown.Menu>
              <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Menu.Menu>
      </Menu>
    </div>
  );
};

export default withRouter(NavBar);
