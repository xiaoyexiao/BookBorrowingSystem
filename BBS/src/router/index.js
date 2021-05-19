import Vue from 'vue'
import Router from 'vue-router'
// 导入页面组件
import Login from '../pages/Login/Login'
import Enroll from '../pages/Login/Enroll'
import StudentHome from '../pages/Main/student/index'
import ManagerHome from '../pages/Main/manager/index'
import PersonalInfo from '../pages/Main/student/pages/PersonalInfo'
import BorrowInfo from '../pages/Main/student/pages/BorrowInfo'
import BookSearching from '../pages/Main/student/pages/BookSearching'
import PaperShelves from '../pages/Main/student/pages/PaperShelves'
import ElectronicLibrary from '../pages/Main/student/pages/ElectronicLibrary'
import BookHandling from '../pages/Main/manager/pages/BookHandling'
import BorrowingRecords from '../pages/Main/manager/pages/BorrowingRecords'
import UserRecords from '../pages/Main/manager/pages/UserRecords'
import MainPage from '../pages/Main/MainPage'
import NotFound from '../pages/NotFound'
import SkipPage from '../pages/Login/SkipPage'
import ElectronicBook from '../pages/Main/student/pages/ElectronicBook'
Vue.use(Router)

export default new Router({
  // mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/enroll',
      name: 'Enroll',
      component: Enroll
    },
    {
      path: '/skipping',
      name: 'SkipPage',
      component: SkipPage
    },
    {
      path: '/student',
      name: 'StudentHome',
      component: StudentHome,
      children: [
        {path: '/student/info', component: PersonalInfo},
        {path: '/student/borrow-info', component: BorrowInfo},
        {path: '/student/book-searching', component: BookSearching},
        {path: '/student/paper-shelves', component: PaperShelves},
        {path: '/student/home', component: MainPage},
        {
          path: '/student/electronic-book',
          component: ElectronicBook
        },
        {path: '/student/electronic-library', component: ElectronicLibrary}
      ]
    },
    {
      path: '/manager',
      name: 'ManagerHome',
      component: ManagerHome,
      children: [
        {path: '/manager/book-handling', component: BookHandling},
        {path: '/manager/borrowing-records', component: BorrowingRecords},
        {path: '/manager/user-records', component: UserRecords},
        {path: '/manager/home', component: MainPage}
      ]
    },
    {
      path: '*',
      component: NotFound
    }
  ]
})
