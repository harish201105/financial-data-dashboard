import React from "react";
import { withRouter } from "react-router-dom";
import { useHistory } from "react-router";

import { Button } from "@progress/kendo-react-buttons";
import { Drawer, DrawerContent } from "@progress/kendo-react-layout";
import { DrawerSelectEvent } from "@progress/kendo-react-layout/dist/npm/drawer/interfaces/DrawerSelectEvent";

const user = {
  initials: "HP",
  name: "Harish Parthasarathy",
  img: "https://i.pinimg.com/736x/57/30/c3/5730c3045d4ae684ab27ca780645f673.jpg"
};

const items = [
  { text: "Home", icon: "k-i-home", route: "/", children: null },
  { text: "Tech Fund", icon: "k-i-dollar", route: "/tech-fund", children: null }
];

const DrawerRouterContainer = (props: React.PropsWithChildren<any>) => {
  const history = useHistory();
  const [expanded, setExpanded] = React.useState(false);
  const [selectedId, setSelectedId] = React.useState(0);

  const onSelect = (e: DrawerSelectEvent) => {
    setSelectedId(e.itemIndex);
    setExpanded(false);
    history.push(e.itemTarget.props.route);
    // this.props.history.push(e.itemTarget.props.route);
  }
  const closeDrawer = () => {
    setExpanded(false);
  }
  const toggleDrawer = () => {
    setExpanded(currentExpanded => {
      return !currentExpanded;
    });
  }

  return (
    <div>
      <Drawer
        expanded={expanded}
        items={items.map(
          (item) => ({ ...item, selected: items[selectedId].text === item.text }))}
        onSelect={onSelect}
        animation={{ duration: 400 }}
        position="start"
        onOverlayClick={closeDrawer}
      >
        <DrawerContent>
          <div className="header">
            <h1>
              <span>
                <Button icon="menu" look="flat" onClick={toggleDrawer} />
                <span className="title">
                  Financial Data Dashboard
                  <span className="divider">|</span>
                  <span className="fund">{items[selectedId].text}</span>
                </span>
              </span>
              <img alt={user.name} src={user.img} />
            </h1>
          </div>
          {props.children}
        </DrawerContent>
      </Drawer>
    </div>
  );
}

export default withRouter(DrawerRouterContainer);
