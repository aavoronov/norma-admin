import { Theme, useMediaQuery } from "@mui/material";
import {
  BooleanField,
  BooleanInput,
  Create,
  CreateButton,
  Datagrid,
  DateField,
  DateInput,
  Edit,
  EditButton,
  EmailField,
  List,
  SimpleForm,
  SimpleList,
  TextField,
  TextInput,
} from "react-admin";

const filters = [
  <TextInput source="email" label="Почта" alwaysOn key="search1" />,
  <TextInput source="name" label="Имя" key="search2" />,
];

export const UserList = () => {
  const isSmall = useMediaQuery<Theme>((theme) => theme.breakpoints.down("sm"));
  return (
    <List filters={filters}>
      {isSmall ? (
        <SimpleList
          primaryText={(record) => record.email}
          secondaryText={(record) => record.name}
          tertiaryText={(record) => record.course}
        >
          {/* <EditButton label="Редактировать" /> */}
          <CreateButton />
        </SimpleList>
      ) : (
        <Datagrid rowClick="edit">
          <TextField source="id" />
          <TextField source="name" label="Имя" />
          <EmailField source="email" label="Почта" />
          <TextField source="role" label="Роль" />
          <BooleanField source="isDeleted" label="Удален" />
          <TextField source="subscriptionThrough" label="Подписка до" />
          <BooleanField
            source="subscriptionCancelled"
            label="Подписка отменена"
          />
          <BooleanField source="promoAgreement" label="Согласие на рассылку" />
          <DateField source="createdAt" label="Создан" />
          <DateField source="updatedAt" label="Обновлен" />
          <EditButton label="Редактировать" />
        </Datagrid>
      )}
    </List>
  );
};

export const UserEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="id" disabled />
      <TextInput source="name" label="Имя" />
      <TextInput source="email" label="Почта" />
      <TextInput source="password" label="Пароль" />
      <TextInput source="role" label="Роль" />
      <BooleanInput source="isDeleted" label="Удален" />
      <DateInput source="subscriptionThrough" label="Подписка до" />
      <BooleanInput source="subscriptionCancelled" label="Подписка отменена" />
      <BooleanInput source="promoAgreement" label="Согласие на рассылку" />
      <DateInput source="createdAt" disabled label="Создан" />
      <DateInput source="updatedAt" disabled label="Обновлен" />
    </SimpleForm>
  </Edit>
);

export const UserCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source="name" label="Имя" />
      <TextInput source="email" label="Почта" />
      <TextInput source="password" label="Пароль" />
      <TextInput source="role" label="Роль" />
      <BooleanInput source="isDeleted" label="Удален" />
      <DateInput source="subscriptionThrough" label="Подписка до" />
      <BooleanInput source="subscriptionCancelled" label="Подписка отменена" />
      <BooleanInput source="promoAgreement" label="Согласие на рассылку" />
    </SimpleForm>
  </Create>
);
