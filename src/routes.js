

import Home from "./Pages/Home/Home"
import Book from "./Pages/Book/Book"
import BookShop from "./Pages/BookShop/BookShop"
import Author from "./Pages/Author/Author"
import About from "./Pages/About/About"
import Register from "./Pages/Register/Register"
import Login from "./Pages/Login/Login"
import EditProfile from "./Pages/UserPanel/EditProfile/EditProfile"
import Histories from "./Pages/UserPanel/Histories/Histories"
import Saved from "./Pages/UserPanel/Saved/Saved"
import Addres from "./Pages/UserPanel/Addres/Addres"
import Basket from "./Pages/Basket/Basket"

import AdminPanel from "./Pages/AdminPanel/AdminPanel"
import AdminPanelIndex from "./Pages/AdminPanel/AdminPanelIndex/AdminPanelIndex"
import AdminSlider from "./Pages/AdminPanel/AdminSlider/AdminSlider"
import AdminUsers from "./Pages/AdminPanel/AdminUsers/AdminUsers"
import AdminComments from "./Pages/AdminPanel/AdminComments/AdminComments"
import AdminOrder from "./Pages/AdminPanel/AdminOrder/AdminOrder"
import AdminAddProduct from "./Pages/AdminPanel/AdminAddProduct/AdminAddProduct"
import AdminProduct from "./Pages/AdminPanel/AdminProduct/AdminProduct"
import UserPrivate from "./components/UserPanel/UserPrivate/UserPrivate"
import NotFound from "./Pages/404/NotFound"

const routes=[
    {path:'/' , element:<Home />},
    {path:'/book/:bookName' , element:<Book />},
    {path:'/shop/:categoryName' , element:<BookShop />},
    {path:'/author/:authorName' , element:<Author />},
    {path:'/about' , element:<About />},
    {path:'/register' , element:<Register />},
    {path:'/login' , element:<Login />},
    {path:'/basket' , element:<Basket />},
    {path: '/my-account/*', element: <UserPrivate /> ,children: [
        {path:'edit' , element:<EditProfile />},
        {path:'history' , element:<Histories />},
        {path:'saved' , element:<Saved />},
        {path:'addres' , element:<Addres />},
    ]},
    {path:'/p-admin/*' , element:<AdminPanel />,
    children:[
        {path: "" , element: <AdminPanelIndex />},
        {path: "slider" , element: <AdminSlider />},
        {path: "users" , element: <AdminUsers />},
        {path: "comments" , element: <AdminComments />},
        {path: "orders" , element: <AdminOrder />},
        {path: "add-product" , element: <AdminAddProduct />},
        {path: "products" , element: <AdminProduct />},
    ]
},
{path: '/*' , element: <NotFound />}
]

export default routes