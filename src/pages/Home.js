import axios from 'axios';
import React, {useEffect, useState} from 'react'
import { toast } from 'react-toastify';
import Blogs from '../components/Blogs'
import Navbar from '../components/Navbar'
import Search from '../components/Search';

const Home = () => {

  const [data, setData] = useState([]);
  const [searchValue, setSearchValue] = useState('')

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


  const onInputChange = (e)=>{
    if(!e.target.value){
      loadBlogs();
    }
    setSearchValue(e.target.value);

  }
  const handleSearch = async (e)=>{
    e.preventDefault();
    const response = await axios.get(`http://localhost:500/blogs?q=${searchValue}`);
    if(response.status === 200){
      setData(response.data);
    }else{
      toast.error('something went wrong');
    }
  }
  return (
    <div>
      <Search searchValue={searchValue} onInputChange={onInputChange} handleSearch={handleSearch} />
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