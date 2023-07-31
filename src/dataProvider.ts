import { stringify } from "query-string";
import { DataProvider, HttpError, fetchUtils } from "react-admin";
import { Resources } from "./resources";

// export const dataProvider: DataProvider = jsonServerProvider(
//   import.meta.env.API_URL
// );

const apiUrl = import.meta.env.VITE_API_URL;

// const dataProvider = (type, resource, params) => new Promise((resolve, reject) => {
//   if (type === 'GET_LIST' && resource === 'posts') {
//       return fetch(...args)
//           .then(res => res.json())
//           .then(json => {
//               if (json.error) {
//                   // The notification will show what's in { error: "message" }
//                   reject(new Error(json.error.message));
//                   return;
//               }

//               resolve(json);
//           });
//   }

//   // ...
// });

const httpClient = fetchUtils.fetchJson;
const token: string = localStorage.getItem("token")!;
const options = { user: { token: token, authenticated: true } };

const dataProvider: DataProvider = {
  getList: (resource, params) => {
    const { page, perPage } = params.pagination;
    const { field, order } = params.sort;
    const query = {
      sort: JSON.stringify([field, order]),
      range: JSON.stringify([(page - 1) * perPage, page * perPage]),
      filter: JSON.stringify(params.filter),
    };
    const url = `${apiUrl}/${resource}?${stringify(query)}`;

    return httpClient(url, options).then(({ json }) => {
      return {
        data: json.data,
        total: json.count,
      };
    });
  },

  getOne: (resource, params) =>
    httpClient(`${apiUrl}/${resource}/${params.id}`, options).then(
      ({ json }) => ({
        data: json,
      })
    ),

  getMany: (resource, params) => {
    const query = {
      filter: JSON.stringify({ id: params.ids }),
    };
    const url = `${apiUrl}/${resource}?${stringify(query)}`;
    return httpClient(url, options).then(({ json }) => ({ data: json.data }));
  },

  // getManyReference: () => {
  //   throw new Error("getManyReference not implemented");
  // },

  getManyReference: (resource, params) => {
    const { page, perPage } = params.pagination;
    const { field, order } = params.sort;
    const query = {
      sort: JSON.stringify([field, order]),
      range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
      filter: JSON.stringify({
        ...params.filter,
        [params.target]: params.id,
      }),
    };
    const url = `${apiUrl}/${resource}?${stringify(query)}`;

    return httpClient(url, options).then(({ json }) => {
      return {
        data: json.data,
        total: json.count,
      };
    });
  },

  update: (resource, params) =>
    httpClient(`${apiUrl}/${resource}/${params.id}`, {
      method: "PUT",
      body: JSON.stringify(params.data),
      ...options,
    }).then(({ json }) => ({ data: json.data })),

  updateMany: () => {
    throw new Error("updateMany not implemented");
  },

  // updateMany: (resource, params) => {
  //   const query = {
  //     filter: JSON.stringify({ id: params.ids }),
  //   };
  //   return httpClient(`${apiUrl}/${resource}?${stringify(query)}`, {
  //     method: "PUT",
  //     body: JSON.stringify(params.data),
  //   }).then(({ json }) => ({ data: json }));
  // },

  create: (resource, params) =>
    httpClient(`${apiUrl}/${resource}`, {
      method: "POST",
      body: JSON.stringify(params.data),
      ...options,
    })
      .then(({ json }) => ({
        data: { ...params.data, id: json.id },
      }))
      // .catch((error) => console.log("HTTP call failed. Error message:", error)),
      .catch((error) =>
        Promise.reject(new HttpError(error && error.message, error.statusCode))
      ),

  delete: (resource, params) =>
    httpClient(`${apiUrl}/${resource}/${params.id}`, {
      method: "DELETE",
      ...options,
    }).then(({ json }) => ({ data: json.data })),

  deleteMany: (resource, params) => {
    const query = {
      filter: JSON.stringify({ id: params.ids }),
    };
    return httpClient(`${apiUrl}/${resource}?${stringify(query)}`, {
      method: "DELETE",
      ...options,
    }).then(({ json }) => ({ data: json.data }));
  },
};

const appDataProvider: DataProvider = {
  ...dataProvider,
  create: (resource, params) => {
    console.log("resource", resource);
    console.log("params", params);
    if (
      (resource !== Resources.previews && resource !== Resources.lessonFiles) ||
      !params.data.file
    ) {
      // fallback to the default implementation
      return dataProvider.create(resource, params);
    }

    const formData = new FormData();

    console.log("params", params);
    params.data.title && formData.append("title", params.data.title);
    params.data.order && formData.append("order", params.data.order);
    formData.append("file", params.data.file.rawFile, params.data.file.title);

    return httpClient(`${apiUrl}/${resource}`, {
      method: "POST",
      body: formData,
      ...options,
    })
      .then(({ json }) => ({
        data: { ...params.data, id: json.id },
      }))
      .catch((error) =>
        Promise.reject(new HttpError(error && error.message, error.statusCode))
      );
  },
};

export default appDataProvider;
