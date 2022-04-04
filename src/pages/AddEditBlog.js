import React from 'react'
// oha7na0l
import axios from 'axios';
import { toast } from 'react-toastify';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const initiatState = {
    title: '',
    description: '',
    catagory: '',
    imageUrl: ''
}

const options = ['Travel', 'Fashion', 'Sports', 'Fitness', 'Food', 'Tech'];
const AddEditBlog = () => {


    const navigate = useNavigate();
    const [formValue, setFormValue] = useState(initiatState);
    const [catagoryErrMsg, setCatagoryErrMsg] = useState(null);

    const { title, description, catagory, imageUrl } = formValue;

    const getDate=()=>{
        let today = new Date();
        let dd = String(today.getDate()).padStart(2,'0');
        let mm = String(today.getMonth()+1).padStart(2,'0')
        let yy = today.getFullYear();

        today = mm + '/' + dd + '/' + yy;
        return today;
    }

    const handleSubmit = async (e) => { 
        e.preventDefault();

        console.log('submit')
        if(title && description && catagory && imageUrl){
            const currentDate = getDate();
            const updatedBlogData = {...formValue,date:currentDate};

            const response = await axios.post('http://localhost:500/blogs',updatedBlogData);
            if(response.status === 201){
                toast.success('Blog Created Successfully')
            }
            else{
                toast.error('Something Went Wrong')
            }

            setFormValue({title:'',description:'',catagory:'',imageUrl:''});
            navigate('/')
        }
    }
    const onInputChange = (e) => { 
        let {name,value} = e.target;
        setFormValue({...formValue,[name]:value})
    }
    const onFileUpload = (file) => {
        const formData = new FormData();
        formData.append('file',file);
        formData.append('upload_preset','oha7na0l');
        axios
            .post("http://api.cloudinary.com/v1_1/drkf8to4g/image/upload", formData)
            .then((resp)=>{
                toast.info('Image uploaded successfully');
                setFormValue({...formValue,imageUrl:resp.data.url})
            }).catch((err)=>{
                toast.error('Something Went wrong')
            })
     }
    const onCatagoryChange = (e) => { 
        setFormValue({...formValue,catagory:e.target.value})
    }
    return (

        <div className="form">
            <h3>Add Blog</h3>
            <form onSubmit={handleSubmit}>
                <input type="text" className="form-control" id="exampleInputEmail1" value={title} name='title' aria-describedby="emailHelp" placeholder='title' onChange={onInputChange} />
                <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" placeholder='description' onChange={onInputChange} value={description} name='description' ></textarea>
                <input className="form-control" type="file" id="formFile" onChange={(e) => onFileUpload(e.target.files[0])}></input>

                <select className="form-select" aria-label="Default select example" onChange={onCatagoryChange} value={catagory}>
                    <option>Please Select Catagory</option>
                    {options.map((option, index) => (
                        <option value={option || ''} key={index}>{option}</option>
                    ))}
                </select>

                <div className="d-flex justify-content-center"> 
                    <input type="submit" className="btn btn-primary" value='Create Blog'/>
                    <button type="button" className="btn btn-danger" onClick={()=> navigate('/')}>Go Back</button>
                </div>

            </form>
        </div>

    )
}

export default AddEditBlog