import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../services/api";


function EditJob(){

  const { id } = useParams();
  const navigate = useNavigate();

  const [job,setJob] = useState({
    title:"",
    company:"",
    location:"",
    salary:"",
    description:""
  });


  useEffect(()=>{
    getJob();
  },[]);


  const getJob = async()=>{

    try{

      const res = await API.get(`/jobs/${id}`);

      setJob(res.data.job);

    }catch(error){

      console.log(error);

    }

  };


  const updateJob = async(e)=>{

    e.preventDefault();

    try{

      const token = localStorage.getItem("token");

      const res = await API.put(
        `/jobs/${id}`,
        job,
        {
          headers:{
            Authorization:`Bearer ${token}`
          }
        }
      );


      alert(res.data.message);

      navigate("/employer-dashboard");


    }catch(error){

      console.log(error.response?.data);

    }

  };


  return(
    <div>

      <h1>Edit Job</h1>

      <form onSubmit={updateJob}>

        <input
          value={job.title}
          onChange={(e)=>setJob({...job,title:e.target.value})}
        />
        <br/>

        <input
          value={job.company}
          onChange={(e)=>setJob({...job,company:e.target.value})}
        />
        <br/>

        <input
          value={job.location}
          onChange={(e)=>setJob({...job,location:e.target.value})}
        />
        <br/>

        <input
          value={job.salary}
          onChange={(e)=>setJob({...job,salary:e.target.value})}
        />
        <br/>

        <textarea
          value={job.description}
          onChange={(e)=>setJob({...job,description:e.target.value})}
        />

        <br/>

        <button>
          Update Job
        </button>

      </form>

    </div>
  )

}

export default EditJob;