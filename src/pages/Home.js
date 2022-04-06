import axios from 'axios';
import React, {useEffect, useState} from 'react'
import { toast } from 'react-toastify';
import Blogs from '../components/Blogs'
import Navbar from '../components/Navbar'

const Home = () => {

  const [data, setData] = useState([]);

  useEffect(() => {
    loadBlogs();
  }, [])
  

  const loadBlogs = async ()=>{
    const response = await axios.get('http://localhost:500/blogs');
    if(response.status === 200){
      setData(response.data)
      // console.log(data)
      
    }else{
      toast.error('something went wrong')
    }
  }

 const excerpt = (str)=>{
   if(str.length > 100){
     str = str.substring(0,100) + ' ... ';
    }
    return str; 
  }

  const handleDelete = async (id)=>{

    if(window.confirm('Are you sure you want to delete the blog')){
      const response = await axios.delete(`http://localhost:500/blogs/${id}`);

      if(response.status === 200){

        toast.success('Blog Deleted successfully');
        loadBlogs();
      }

    }else{
      toast.error('Something went wrong')
    }

  }
  return (
    <div>
        <div className="container my-5">
          {data.length === 0 && (
            <h3>No blog Found</h3>
          )}

          <div className="row">
            {data && data.map((item,index)=>(
              <Blogs
              
                key={index}
                {...item}
                excerpt={excerpt}
                handleDelete = {handleDelete}
              />
            ))}
          </div>
        </div>
    </div>
  )
}

export default Home