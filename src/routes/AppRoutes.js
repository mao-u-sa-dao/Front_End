import React from "react";
import AnimatedPage from "../components/AnimatedPage/AnimatedPage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// page client
import About from "../Pages/About/About";
import Movie from "../Pages/Movie/Movie";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import MovieUserOwned from "../Pages/MoviesUserOwned/MoviesUserOwned";
import MovieWareHouse from "../Pages/MovieWareHouse/MovieWareHouse";
// layout client, admin
import Layout from "../Layout/Layout";
import AdminLayout from "../Areas/Admin/AdminLayout/AdminLayout";
// page admin
import HomeAdmin from "../Areas/Admin/Pages/Home/Home";
import BillManagement from "../Areas/Admin/Pages/BillManagement/BillManagement";
import MovieListManagement from "../Areas/Admin/Pages/MovieListManagement/MovieListManagement";
import CategoryManagement from "../Areas/Admin/Pages/CategoryManagement/CategoryManagement";
import UserManagement from "../Areas/Admin/Pages/UserManagement/UserManegement";
import AuthorManagement from "../Areas/Admin/Pages/AuthorManagement/AuthorManagement";
//

export default function AppRoutes() {
  return (
    <div>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <Layout>
                <AnimatedPage>
                  <Home />
                </AnimatedPage>
              </Layout>
            }
          />
          <Route
            path="/about"
            element={
              <AnimatedPage>
                <About />
              </AnimatedPage>
            }
          />
          <Route
            path="/movie/:id"
            element={
              <Layout>
                <AnimatedPage>
                  <Movie />
                </AnimatedPage>
              </Layout>
            }
          />
          <Route
            path="/login"
            element={
              <AnimatedPage>
                <Login />
              </AnimatedPage>
            }
          />
          <Route
            path="/moviesuserowned"
            element={
              <Layout>
                <AnimatedPage>
                  <MovieUserOwned />
                </AnimatedPage>
              </Layout>
            }
          />
          <Route
            path="/moviewarehouse/:id"
            element={
              <Layout>
                <AnimatedPage>
                  <MovieWareHouse />
                </AnimatedPage>
              </Layout>
            }
          />
          <Route
            path="/admin/billmanagement"
            element={
              <AdminLayout>
                <AnimatedPage>
                  <BillManagement />
                </AnimatedPage>
              </AdminLayout>
            }
          />
          <Route
            path="/admin/home"
            element={
              <AdminLayout>
                <AnimatedPage>
                  <HomeAdmin />
                </AnimatedPage>
              </AdminLayout>
            }
          />
          <Route
            path="/admin/movielistmanagement"
            element={
              <AdminLayout>
                <AnimatedPage>
                  <MovieListManagement />
                </AnimatedPage>
              </AdminLayout>
            }
          />
          <Route
            path="/admin/categorymanagement"
            element={
              <AdminLayout>
                <AnimatedPage>
                  <CategoryManagement />
                </AnimatedPage>
              </AdminLayout>
            }
          />
          <Route
            path="/admin/usermanagement"
            element={
              <AdminLayout>
                <AnimatedPage>
                  <UserManagement />
                </AnimatedPage>
              </AdminLayout>
            }
          />
          <Route
            path="/admin/authormanagement"
            element={
              <AdminLayout>
                <AnimatedPage>
                  <AuthorManagement />
                </AnimatedPage>
              </AdminLayout>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}
