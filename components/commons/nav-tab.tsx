import React from "react";
import Tab from "@mui/material/Tab";
import Link from "next/link";

export interface NavTabProps {
  label?: string;
  href?: string;
}

const NavTab = (props: NavTabProps) => {
  const onClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) =>
    e.preventDefault();

  return (
    <Link href={props.href ?? "/soap"} passHref>
      <Tab
        component="a"
        onClick={(e) => console.log("ff")}
        label={props.label}
      />
    </Link>
  );
};

export default NavTab;
