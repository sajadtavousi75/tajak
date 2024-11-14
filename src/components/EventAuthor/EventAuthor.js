import React,{useState,useEffect} from 'react'
import BookBox from '../BookBox/BookBox'

export default function EventAuthor({data}) {
  const [products, setProducts] = useState([]);

  const authorName=data.name

  const getProduct =() => {
    fetch("https://tajak-project.liara.run/api/product", {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.filter((author)=> author.authorID.name === authorName));
      });
  };

  useEffect(() => {
    getProduct();
  }, [authorName]);
  return (
    <div className="eventauthor bg-gmelo mt-16 pb-16">
        <div className="container">
            <div className="eventauthor-content">
                <h1 className="eventauthor-title w-[300px] h-[40px] mx-auto flex items-center justify-center bg-bg font-bold text-xs rounded-b-lg shadow-lg md:text-sm ">آثار {data.name}</h1>
                <div className="eventauthor-boxes flex flex-wrap items-center justify-center py-4 gap-3">
                  {products.map((product)=>(

                    <BookBox key={product._id} {...product}/>
                  ))}
                </div>
            </div>
        </div>
    </div>
  )
}
