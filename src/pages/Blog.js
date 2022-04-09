import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import Badge from '../components/Badge';

const Blog = () => {

  const [blog, setBlog] = useState();
  const [relatedPost, setRelatedPost] = useState([])
  const { id } = useParams();

  const navigate = useNavigate()
  useEffect(() => {
    if (id) {
      loadSingleBlog();
    }
  }, [id])

  const loadSingleBlog = async () => {
    const response = await axios.get(`http://localhost:500/blogs/${id}`);
    const relatedPosts = await axios.get(`http://localhost:500/blogs?category=${response.data.catagory}&_start=0&_end=3`);
    console.log(relatedPosts.data);

    if (response.status === 200 || relatedPosts.status === 200) {
      setBlog(response.data);
      setRelatedPost(relatedPosts.data)

    } else {
      toast.error('something went wrong');

    }
  }


  const handleBack = ()=>{
    navigate('/')
  }
  
  return (
    <div className='container'>
      <div className="card my-4">
        <span className='btn btn-primary' onClick={handleBack}>Go Back</span>
            <h5 style={{fontSize:'30px',padding:'10px'}} className="card-title text-center">{blog && blog.title}</h5>
        <img src={blog && blog.imageUrl} className="card-img-top" alt="image" style={{height:'400px'}}/>
          <div className="card-body">
            <div className="d-flex justify-content-between p-2">
              <p>{blog && blog.date}</p>
              <Badge children={blog && blog.catagory}/>
            </div>
            <p className="card-text text-center">{blog && blog.description}</p>
            
          </div>
      </div>
    </div>
  )
}

export default Blog