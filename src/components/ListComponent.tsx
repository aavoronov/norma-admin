import { Theme, useMediaQuery } from "@mui/material";
import React from "react";
import { Datagrid, List, SimpleList } from "react-admin";

interface Props {
  children: React.JSX.Element;
  primary: string;
  secondary: string;
  tertiary?: string;
}

const ListComponent = (props: Props) => {
  const isSmall = useMediaQuery<Theme>((theme) => theme.breakpoints.down("sm"));
  return (
    <List>
      {isSmall ? (
        <SimpleList
          primaryText={(record) => record.title}
          secondaryText={(record) => record.description}
          tertiaryText={(record) => record.course}
        />
      ) : (
        <Datagrid rowClick="edit">{props.children}</Datagrid>
      )}
    </List>
  );
};

export default ListComponent;
