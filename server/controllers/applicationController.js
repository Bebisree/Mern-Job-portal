const Application = require("../models/Application");
const Job = require("../models/Job");


// Apply for Job
const applyJob = async (req, res) => {
    try {

        const jobId = req.params.jobId;
console.log("Job ID from frontend:", jobId);
console.log("Applicant ID:", req.user.id);

        // Check job exists
        const job = await Job.findById(jobId);

        if (!job) {
            return res.status(404).json({
                success:false,
                message:"Job Not Found"
            });
        }


        // Check already applied
        const existingApplication = await Application.findOne({
            job: jobId,
            applicant: req.user.id
        });


        if(existingApplication){
            return res.status(400).json({
                success:false,
                message:"Already Applied"
            });
        }


        const application = await Application.create({

            job: jobId,

            applicant: req.user.id

        });


        res.status(201).json({

            success:true,

            message:"Job Applied Successfully",

            application

        });


    } catch(error){

        res.status(500).json({

            success:false,

            message:error.message

        });

    }
};




// Get My Applications (Candidate)
const getMyApplications = async (req,res)=>{

    try{

        const applications = await Application.find({

            applicant:req.user.id

        })
        .populate("job");


        res.status(200).json({

            success:true,

            applications

        });


    }catch(error){

        res.status(500).json({

            success:false,
            message:error.message
        });
    }
};

   



// Get Applicants For Job (Employer)
const getApplicants = async (req, res) => {

    try {

        const applications = await Application.find({
            job: req.params.jobId
        })
        .populate(
  "applicant",
  "name email resume"
)
        .populate("job", "title company");

        res.status(200).json({
            success: true,
            applications
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};
// Get Application Stats For Employer (all jobs combined)
const getEmployerStats = async (req, res) => {
  try {

    // Find all jobs posted by this employer
    const jobs = await Job.find({ createdBy: req.user.id }).select("_id");
    const jobIds = jobs.map((job) => job._id);

    const applications = await Application.find({
      job: { $in: jobIds }
    });

    const stats = {
      totalJobs: jobs.length,
      totalApplications: applications.length,
      pending: applications.filter((app) => app.status === "Pending").length,
      accepted: applications.filter((app) => app.status === "Accepted").length,
      rejected: applications.filter((app) => app.status === "Rejected").length
    };

    res.status(200).json({
      success: true,
      stats
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};

// Update Application Status
// Update Application Status
const updateApplicationStatus = async (req, res) => {
    try {

        console.log("Application ID:", req.params.id);
        console.log("Request Body:", req.body);

        const { status } = req.body;

        const application = await Application.findByIdAndUpdate(
            req.params.id,
            { status },
            {
                returnDocument: "after"
            }
        );

        if (!application) {
            return res.status(404).json({
                success: false,
                message: "Application Not Found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Application Status Updated",
            application
        });

    } catch (error) {

        console.log("Error:", error);

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};



     




module.exports = {

    applyJob,
    getMyApplications,
    getApplicants,
    updateApplicationStatus,
    getEmployerStats

};