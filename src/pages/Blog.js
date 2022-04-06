import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import Badge from '../components/Badge';

const Blog = () => {

  const [blog, setBlog] = useState();
  const { id } = useParams();

  const navigate = useNavigate()
  useEffect(() => {
    if (id) {
      loadSingleBlog();
    }
  }, [id])

  const loadSingleBlog = async (id) => {
    const response = await axios.get(`http://localhost:500/blogs/${id}`);
    if (response.status === 200) {
      setBlog(response.data);

    } else {
      toast.error('something went wrong');
    }
  }
  // http://res.cloudinary.com/drkf8to4g/image/upload/v1649260554/vfe1qvwvvr5gmxu3dgur.png
  const handleBack = ()=>{
    navigate('/')
  }

  return (
    <div className='container'>
      {/* <div className="card my-4">
        <span className='btn btn-primary' onClick={handleBack}>Go Back</span>
            <h5 style={{fontSize:'30px',padding:'10px'}} className="card-title text-center">{blog && blog.title}</h5>
        <img src={blog.imageUrl} className="card-img-top" alt="image" style={{height:'400px'}}/>
          <div className="card-body">
            <div className="d-flex justify-content-between p-2">
              <p>{blog.date}</p>
              <Badge children={blog.catagory}/>
            </div>
            <p className="card-text text-center">{blog.description}</p>
            
          </div>
      </div> */}
    </div>
  )
}

export default Blog