import React,{useState , useEffect} from 'react'
import SavedBox from '../SavedBox/SavedBox'
import swal from 'sweetalert'
import NotFound from '../NotFound/NotFound'

export default function SavedSection() {

  const [products , setProducts] = useState([])

  const getProducts= () =>{
    const localData = JSON.parse(localStorage.getItem("user"));
  
    fetch('https://tajak-project.liara.run/api/user/saved',{
      headers:{
        "Content-Type" : "application/json",
            Authorization: `Bearer ${localData.token}`,
      },
    }).then((res) =>res.json())
    .then((data) =>{
      setProducts(data)
    })
  }
  
  useEffect(() => {
    getProducts()
  }, []);

  const handelDelete=(id)=>{
    const localData = JSON.parse(localStorage.getItem("user"));

    swal({
      title: "ایا ار حذف محصول اطمینان دارید؟",
      icon: "warning",
      buttons: ["خیر", "بله"],
    }).then((result) => {
      if (result) {
        fetch(`https://tajak-project.liara.run/api/user/saved/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localData.token}`,
          },
        }).then((res) => {
          if (res.ok) {
            getProducts();
          }
        });
      }
    });
  }

  return (
    <div className="savedsection bg-gmelo  rounded-lg w-full ">
        <div className="container">
          {products.length? (
            <div className="content flex items-center justify-center gap-3 flex-wrap	p-3">
              {products.map((product) =>(
                <SavedBox key={product._id}  data={product}  onclick={handelDelete}/>
              ))}
            </div>
          ) : (
                <NotFound title='محصولی وجود ندارد'/>
          )}
        </div>
    </div>
  )
}
