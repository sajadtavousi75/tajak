import React ,{useCallback,useState ,useEffect} from 'react'

export default function AuthorSection() {

    const [author , setAuthor] = useState([])

    const getAuthor = useCallback(() => {
        fetch("https://tajak-project.liara.run/api/author", {
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((res) => res.json())
          .then((data) => {
            setAuthor(data);
          });
      }, []);
    
      useEffect(() => {
        getAuthor();
      }, []);
  return (
    <div className="authorsection mt-16">
        <div className="container">
            <div className="authorsection-content  flex flex-wrap	gap-5 items-center justify-around	">
                {author.slice(9,13).map((data)=>(

                <div key={data._id} className="authorsection-content__box w-[170px]">
                <div className="authorsection-img flex items-center justify-center">
                    <img className='rounded-lg p-2 w-[130px] h-[130px] border-solid border-gmain border-x-2 rounded-lg ' src={`https://tajak-project.liara.run/uploads/${data.coverAuthor}`} alt="" />
                </div>
                <h1 className='text-center mt-3 border-solid border-gmain border-x-2 rounded-lg text-lg font-bold text-text'>{data.name}</h1>
                </div>
                ))}
            </div>
        </div>
    </div>
  )
}
