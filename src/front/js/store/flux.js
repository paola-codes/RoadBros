const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      backEndUrl:
        "https://3001-4geeksacademy-reactflask-xemyhc771ad.ws-us31.gitpod.io",
      loggedUser: {},
      listOfVehicles: [],
      listOfRequests: [],
      pendingRequests: [],
    },
    actions: {
      /*Get Vehicles*/
      getVehicles: (id) => {
        fetch(`${getStore().backEndUrl}/api/vehicle/user/${id}`)
          .then((response) => response.json())
          .then((data) => setStore({ listOfVehicles: data }))
          .catch((err) => console.error("Error:", err));
      },
      /*Add Vehicles*/
      addVehicle: (myNewVehicle) => {
        fetch(`${getStore().backEndUrl}/api/vehicle`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(myNewVehicle),
        })
          .then((response) => response.json())
          .then((data) => setStore({ listOfVehicles: data }))
          .catch((err) => console.error("Error:", err));
      },
      /*Delete Vehicles*/
      deleteVehicles: (id) => {
        fetch(`${getStore().backEndUrl}/api/vehicle/${id}`, {
          method: "DELETE",
        })
          .then((response) => response.json())
          .then((data) => setStore({ listOfVehicles: data }))
          .catch((err) => console.error("Error:", err));
      },
      /*Get Requests*/
      getRequests: () => {
        fetch(`${getStore().backEndUrl}/api/request`)
          .then((response) => response.json())
          .then((data) => setStore({ listOfRequests: data }))
          .catch((err) => console.error("Error:", err));
      },
      /*Add Requests*/
      addRequest: (newVehicle, newService, newZipCode) => {
        let myNewRequest = {
          zip_code: newZipCode,
          service: newService,
          vehicle: newVehicle,
          user_id: getStore().loggedUser.id,
          client_name: getStore().loggedUser.full_name,
          client_phone: getStore().loggedUser.phone,
        };
        fetch(`${getStore().backEndUrl}/api/request`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(myNewRequest),
        })
          .then((response) => response.json())
          .then((data) => setStore({ listOfRequests: data }))
          .catch((err) => console.error("Error:", err));
      },
      /*Client Pending Requests (Client requests have been posted, yet no trucker has accpeted them)*/
      clientPendingRequests: (id) => {
        fetch(`${getStore().backEndUrl}/api/request/user/client/${id}`)
          .then((response) => response.json())
          .then((data) => {
            console.log("client pending request", data);
            setStore({ pendingRequests: data });
          })
          .catch((err) => console.error("Error", err));
      },
      /*Mark Request as Accepted*/
      acceptRequest: (trucker_info, request_id) => {
        fetch(`${getStore().backEndUrl}/api/request/accepted/${request_id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(trucker_info),
        })
          .then((response) => response.json())
          .catch((err) => console.error("Error:", err));
      },
      /*Mark Request as Completed*/
      completeRequest: (completed_status, request_id) => {
        fetch(`${getStore().backEndUrl}/api/request/completed/${request_id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(completed_status),
        })
          .then((response) => response.json())
          .catch((err) => console.error("Error:", err));
      },
      /*Mark Request as Finished*/
      finishRequest: (finished_status, request_id) => {
        fetch(`${getStore().backEndUrl}/api/request/finished/${request_id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(finished_status),
        })
          .then((response) => response.json())
          .catch((err) => console.error("Error:", err));
      },
      /*Client Profile*/
      updateClientProfile: (updatedProfile, id) => {
        fetch(`${getStore().backEndUrl}/api/user/client/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedProfile),
        })
          .then((response) => response.json())
          .then((data) => setStore({ loggedUser: data }))
          .catch((err) => console.error("Error:", err));
      },
      /*Trucker Profile*/
      updateTruckerProfile: (updatedProfile, id) => {
        fetch(`${getStore().backEndUrl}/api/user/trucker/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedProfile),
        })
          .then((response) => response.json())
          .then((data) => setStore({ loggedUser: data }))
          .catch((err) => console.error("Error:", err));
      },
      /*Trucker Rating*/
      updateTruckerRating: (newRating, id) => {
        fetch(`${getStore().backEndUrl}/api/user/trucker/rating/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newRating),
        })
          .then((response) => response.json())
          .then((data) => setStore({ loggedUser: data }))
          .catch((err) => console.error("Error:", err));
      },
      /*Sign Up*/
      changeUserType: (type) => {
        setStore({ userLogin: type });
      },
      /*Login*/
      updateUser: (loginInfo) => {
        setStore({ loggedUser: loginInfo });
      },
      /*Logout*/
      logOut: () => {
        setStore({ loggedUser: {} });
        setStore({ listOfVehicles: [] });
        setStore({ acceptedRequests: [] });
        setStore({ pendingRequests: [] });
      },
    },
  };
};

export default getState;
