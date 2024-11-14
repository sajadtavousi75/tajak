import React,{useContext} from 'react'
import AddProductContent from '../../../components/AdminPanel/AddProductContent/AddProductContent'
import AuthContext from '../../../Context/AuthContext/AuthContext'

export default function AdminAddProduct() {
  const context= useContext(AuthContext)
  console.log(context.userInfos.role)
  return (
    <div className="adminaddproduct">
        <div className="container">
            <AddProductContent />
        </div>
    </div>
  )
}
