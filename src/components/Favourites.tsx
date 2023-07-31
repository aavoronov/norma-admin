import { Theme, useMediaQuery } from "@mui/material";
import {
  Datagrid,
  DateField,
  List,
  ReferenceField,
  TextField,
} from "react-admin";
import { Resources } from "../resources";

export const FavouriteList = () => {
  const isSmall = useMediaQuery<Theme>((theme) => theme.breakpoints.down("sm"));

  return (
    <List>
      {isSmall ? (
        <Datagrid rowClick="edit">
          <ReferenceField source="userId" reference={Resources.users} />
          <ReferenceField source="lessonId" reference={Resources.lessons} />
          {/* <EditButton label="Редактировать" /> */}
        </Datagrid>
      ) : (
        <Datagrid rowClick="edit">
          <TextField source="id" />
          <DateField source="createdAt" label="Создан" />
          <DateField source="updatedAt" label="Обновлен" />
          <ReferenceField source="userId" reference={Resources.users} />
          <ReferenceField source="lessonId" reference={Resources.lessons} />
          {/* <EditButton label="Редактировать" /> */}
        </Datagrid>
      )}
    </List>
  );
};
