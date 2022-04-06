import React from 'react';
import { Link } from 'react-router-dom';
import Badge from './Badge';
// 

const Blogs = ({ title, catagory, description, id, imageUrl, excerpt, handleDelete }) => {
  return (
    <div className='col-md-4'>
      <div className="card">
        <img src={imageUrl} className="card-img-top" alt="image"/>
          <div className="card-body">
            <h5 className="card-title text-center">{title}</h5>
           

              <p className="card-text text-center">{excerpt(description)}</p>
              
              <span><Link to={`/blog/${id}`}>See more</Link></span>
        
            <Badge children={catagory}/>
          </div>

          <div className="icons">
            <Link to={`/addEditBlog/${id}`}>
              <i className="far fa-edit mx-2"></i>
            </Link>
            
            <i className="far fa-trash-alt mx-2" onClick={()=> handleDelete(id)}></i>
          </div>
      </div>
    </div>
  )
}

export default Blogs