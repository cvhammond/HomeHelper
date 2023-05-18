// In this file, all Page components from 'src/pages` are auto-imported. Nested
// directories are supported, and should be uppercase. Each subdirectory will be
// prepended onto the component name.
//
// Examples:
//
// 'src/pages/HomePage/HomePage.js'         -> HomePage
// 'src/pages/Admin/BooksPage/BooksPage.js' -> AdminBooksPage

import { Router, Route, Set, Private } from '@redwoodjs/router'

import ScaffoldLayout from 'src/layouts/ScaffoldLayout'

import { useAuth } from './auth'

import MainLayout from './layouts/MainLayout/MainLayout'

const Routes = () => {
  return (
    <Router useAuth={useAuth}>
        //<Set wrap={ScaffoldLayout} title="Users" titleTo="users" buttonLabel="New User" buttonTo="newUser">
          //<Route path="/users/new" page={UserNewUserPage} name="newUser" />
          //<Route path="/users/{id:Int}/edit" page={UserEditUserPage} name="editUser" />
          //<Route path="/users/{id:Int}" page={UserUserPage} name="user" />
          //<Route path="/users" page={UserUsersPage} name="users" />
        //</Set>
      <Set wrap={MainLayout} title="Tasks" titleTo="tasks" buttonLabel="New Task" buttonTo="newTask">
        <Private unauthenticated="login">
          <Route path="/tasks/new" page={TaskNewTaskPage} name="newTask" />
          <Route path="/tasks/{id:Int}/edit" page={TaskEditTaskPage} name="editTask" />
          <Route path="/tasks/{id:Int}" page={TaskTaskPage} name="task" />
          <Route path="/tasks" page={TaskTasksPage} name="tasks" />
          <Route path="/profile" page={ProfilePage} name="profile" />
        </Private>
      </Set>
      <Set wrap={MainLayout}>
        <Route path="/login" page={LoginPage} name="login" />
        <Route path="/signup" page={SignupPage} name="signup" />
        <Route path="/forgot-password" page={ForgotPasswordPage} name="forgotPassword" />
        <Route path="/reset-password" page={ResetPasswordPage} name="resetPassword" />
        <Route notfound page={NotFoundPage} />
        <Private unauthenticated="login">
          <Route path="/" page={HomePage} name="home" />
        </Private>
      </Set>
    </Router>
  )
}

export default Routes
