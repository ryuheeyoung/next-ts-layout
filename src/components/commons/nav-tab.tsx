import React from "react";
import Tab, { TabProps } from "@mui/material/Tab";
import Link from "next/link";

type CurrentTabProps = TabProps<"a">;

const NavTab = ({ href, ...props }: CurrentTabProps) => {
  return (
    <Link href={href ?? "/soap"} passHref>
      <Tab component="a" {...props} />
    </Link>
  );
};

export default NavTab;
