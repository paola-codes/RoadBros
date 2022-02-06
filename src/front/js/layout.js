import React, { useContext, useState } from "react";
import { Context } from "./store/appContext";
import { BrowserRouter, Route, Switch, useLocation } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";

import { Home } from "./pages/home";
import { LoginRequired } from "./pages/LoginRequired";

//PAGES

//Navbars
import { NavbarClient } from "./component/NavbarClient";
import { NavbarTrucker } from "./component/NavbarTrucker";

//Main Home Page
import { SignUpPage } from "./pages/SignUpPage";
import { LoginPage } from "./pages/LoginPage";

//Client Pages
import { ClientHomePage } from "./pages/ClientHomePage";
import { ClientProfile } from "./pages/ClientProfile";
import { ClientEditProfile } from "./pages/ClientEditProfile";
import { ClientVehiclesList } from "./pages/ClientVehiclesList";
import { ClientAddVehicles } from "./pages/ClientAddVehicles";
import { ClientRequestHelp } from "./pages/ClientRequestHelp";
import { ClientPayment } from "./pages/ClientPayment";
import { ClientServiceManagement } from "./pages/ClientServiceManagement";
import { ClientServiceHistory } from "./pages/ClientServiceHistory";

//Trucker Pages
import { TruckerHomePage } from "./pages/TruckerHomePage";
import { TruckerProfile } from "./pages/TruckerProfile";
import { TruckerEditProfile } from "./pages/TruckerEditProfile";
import { TruckerRequestsList } from "./pages/TruckerRequestsList";
import { TruckerAcceptedRequest } from "./pages/TruckerAcceptedRequest";
import { TruckerServiceManagement } from "./pages/TruckerServiceManagement";
import { TruckerCompletedRequest } from "./pages/TruckerCompletedRequest";
import { TruckerServiceHistory } from "./pages/TruckerServiceHistory";

import injectContext from "./store/appContext";

//create your first component
const Layout = () => {
  //the basename is used when your project is published in a subdirectory and not in the root of the domain
  // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
  const basename = process.env.BASENAME || "";

  const { store, actions } = useContext(Context);

  return (
    <div>
      <BrowserRouter basename={basename}>
        <ScrollToTop>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/SignUpPage">
              <SignUpPage />
            </Route>
            <Route exact path="/LoginPage">
              <LoginPage />
            </Route>
            <Route exact path="/LoginRequired">
              <LoginRequired />
            </Route>

            <Route exact path="/navbarClient">
              <NavbarClient />
            </Route>
            <Route exact path="/navbarTrucker">
              <NavbarTrucker />
            </Route>

            <Route exact path="/ClientAddVehicles">
              <NavbarClient />
              <ClientAddVehicles />
            </Route>
            <Route exact path="/ClientHomePage">
              <NavbarClient />
              <ClientHomePage />
            </Route>
            <Route exact path="/ClientProfile">
              <NavbarClient />
              <ClientProfile />
            </Route>
            <Route exact path="/ClientEditProfile">
              <NavbarClient />
              <ClientEditProfile />
            </Route>
            <Route exact path="/ClientVehiclesList">
              <NavbarClient />
              <ClientVehiclesList />
            </Route>
            <Route exact path="/ClientServiceHistory">
              <NavbarClient />
              <ClientServiceHistory />
            </Route>
            <Route exact path="/ClientServiceManagement">
              <NavbarClient />
              <ClientServiceManagement />
            </Route>
            <Route exact path="/ClientPayment/:trucker_id/:request_id">
              <NavbarClient />
              <ClientPayment />
            </Route>
            <Route exact path="/ClientRequestHelp">
              <NavbarClient />
              <ClientRequestHelp />
            </Route>

            <Route exact path="/TruckerHomePage">
              <NavbarTrucker />
              <TruckerHomePage />
            </Route>
            <Route exact path="/TruckerProfile">
              <NavbarTrucker />
              <TruckerProfile />
            </Route>
            <Route exact path="/TruckerEditProfile">
              <NavbarTrucker />
              <TruckerEditProfile />
            </Route>
            <Route exact path="/TruckerServiceHistory">
              <NavbarTrucker />
              <TruckerServiceHistory />
            </Route>
            <Route exact path="/TruckerRequestsList">
              <NavbarTrucker />
              <TruckerRequestsList />
            </Route>
            <Route exact path="/TruckerAcceptedRequest/:id">
              <NavbarTrucker />
              <TruckerAcceptedRequest />
            </Route>
            <Route exact path="/TruckerServiceManagement">
              <NavbarTrucker />
              <TruckerServiceManagement />
            </Route>
            <Route exact path="/TruckerCompletedRequest">
              <NavbarClient />
              <TruckerCompletedRequest />
            </Route>

            <Route>
              <h1>Not found!</h1>
            </Route>
          </Switch>
        </ScrollToTop>
      </BrowserRouter>
    </div>
  );
};

export default injectContext(Layout);
