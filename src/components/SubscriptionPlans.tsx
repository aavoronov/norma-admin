import { Theme, useMediaQuery } from "@mui/material";
import {
  BooleanField,
  BooleanInput,
  Create,
  Datagrid,
  DateField,
  DateInput,
  Edit,
  EditButton,
  List,
  NumberField,
  NumberInput,
  SimpleForm,
  SimpleList,
  TextField,
  TextInput,
} from "react-admin";

export const SubscriptionPlanList = () => {
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
        <Datagrid rowClick="edit">
          <TextField source="id" />
          <NumberField source="term" label="Срок" />
          <TextField source="humanFriendlyTerm" label="Срок для показа" />
          <NumberField source="price" label="Цена" />
          <BooleanField source="isPopular" label="Популярное" />
          <BooleanField source="isGoodOffer" label="Выгодное" />
          <DateField source="createdAt" label="Создан" />
          <DateField source="updatedAt" label="Обновлен" />
          <EditButton label="Редактировать" />
        </Datagrid>
      )}
    </List>
  );
};

export const SubscriptionPlanEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="id" disabled />
      <NumberInput source="term" label="Срок" required />
      <TextInput
        source="humanFriendlyTerm"
        label="Срок для показа"
        helperText="без предлогов, пример: 3 месяца. Если не указать, будет 'на <срок> дней'"
      />
      <NumberInput source="price" label="Цена" required />
      <BooleanInput source="isPopular" label="Популярное" />
      <BooleanInput
        source="isGoodOffer"
        label="Выгодное"
        helperText="имеет приоритет над 'популярное', если оба включены"
      />
      <DateInput source="createdAt" disabled label="Создан" />
      <DateInput source="updatedAt" disabled label="Обновлен" />
    </SimpleForm>
  </Edit>
);

export const SubscriptionPlanCreate = () => (
  <Create>
    <SimpleForm>
      <NumberInput source="term" label="Срок" required />
      <TextInput
        source="humanFriendlyTerm"
        label="Срок для показа"
        helperText="без предлогов, пример: 3 месяца. Если не указать, будет 'на <срок> дней'"
      />
      <NumberInput source="price" label="Цена" required />
      <BooleanInput source="isPopular" label="Популярное" />
      <BooleanInput
        source="isGoodOffer"
        label="Выгодное"
        helperText="имеет приоритет над 'популярное', если оба включены"
      />
    </SimpleForm>
  </Create>
);
