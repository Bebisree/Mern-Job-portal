import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";
import "./Applicants.css";


function Applicants() {

  const { jobId } = useParams();

  const [applications, setApplications] = useState([]);


  useEffect(() => {
    getApplicants();
  }, [jobId]);



  const getApplicants = async () => {

    try {

      const token = localStorage.getItem("token");

      const res = await API.get(
        `/applications/job/${jobId}`,
        {
          headers:{
            Authorization:`Bearer ${token}`
          }
        }
      );


      setApplications(res.data.applications);


    } catch(error){

      console.log(error.response?.data);

    }

  };




  const updateStatus = async(id,status)=>{

    try{

      const token = localStorage.getItem("token");


      await API.put(
        `/applications/status/${id}`,
        {
          status
        },
        {
          headers:{
            Authorization:`Bearer ${token}`
          }
        }
      );


      alert("Status Updated");


      getApplicants();


    }
    catch(error){

      console.log(error.response?.data);

    }

  };
    return (
    <div className="applicants-page">

      <h1>Applicants</h1>

      <div className="applicant-container">

        {
          applications.length === 0 ? (

            <div className="no-data">
              No Applicants Found
            </div>

          ) : (

            applications.map((app)=>(

              <div className="applicant-card" key={app._id}>

                <div className="applicant-header">

                  <h2>
                    👤 {app.applicant?.name}
                  </h2>

                  <span className={`status ${app.status}`}>
                    {app.status}
                  </span>

                </div>


                <div className="details">

                  <p>
                    📧 <b>Email:</b> {app.applicant?.email}
                  </p>
                  {
 app.applicant?.resume && (

 <p>
   📄 <b>Resume:</b>

   <a
    href={`http://localhost:5000/uploads/${app.applicant.resume}`}
    target="_blank"
    rel="noreferrer"
   >
     View Resume
   </a>

 </p>

 )
}

                  <p>
                    💼 <b>Job:</b> {app.job?.title}
                  </p>

                  <p>
                    🏢 <b>Company:</b> {app.job?.company}
                  </p>

                </div>


                <div className="action">

                  <label>
                    Update Status
                  </label>


                  <select
                    value={app.status}
                    onChange={(e)=>
                      updateStatus(
                        app._id,
                        e.target.value
                      )
                    }
                  >

                    <option value="Applied">
                      Applied
                    </option>

                    <option value="Reviewing">
                      Reviewing
                    </option>

                    <option value="Interview">
                      Interview
                    </option>

                    <option value="Selected">
                      Selected
                    </option>

                    <option value="Rejected">
                      Rejected
                    </option>

                  </select>

                </div>


              </div>

            ))

          )
        }

      </div>

    </div>
  );

}

export default Applicants;

           


              






  
        
             
      