const Job = require("../models/Job");

// Create Job
const createJob = async (req, res) => {
    try {
        const job = await Job.create({
    ...req.body,
    createdBy: req.user.id
});

        res.status(201).json({
            success: true,
            message: "Job Created Successfully",
            job
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Get All Jobs
const getAllJobs = async (req, res) => {
  try {

    const { search, location, jobType } = req.query;

    let filter = {};

    if (search) {
      filter.title = { $regex: search, $options: "i" };
    }

    if (location) {
      filter.location = { $regex: location, $options: "i" };
    }

    if (jobType) {
      filter.jobType = jobType;
    }

    const jobs = await Job.find(filter).populate("createdBy", "name");

    res.status(200).json({
      success: true,
      jobs,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// Get Single Job
const getJobById = async (req, res) => {
    try {
        const job = await Job.findById(req.params.id);

        if (!job) {
            return res.status(404).json({
                message: "Job Not Found"
            });
        }

        res.status(200).json({
            success: true,
            job
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Update Job
const updateJob = async (req, res) => {
    try {
        const job = await Job.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.status(200).json({
            success: true,
            message: "Job Updated Successfully",
            job
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Delete Job
const deleteJob = async (req, res) => {

    try {

        const job = await Job.findById(req.params.id);

        if(!job){
            return res.status(404).json({
                success:false,
                message:"Job Not Found"
            });
        }


        await Job.findByIdAndDelete(req.params.id);


        res.status(200).json({
            success:true,
            message:"Job Deleted Successfully"
        });


    } catch(error){

        res.status(500).json({
            success:false,
            message:error.message
        });

    }

};
// Get Employer Jobs
const getEmployerJobs = async (req, res) => {
    try {

        const jobs = await Job.find({
            createdBy: req.user.id
        });

        res.status(200).json({
            success: true,
            jobs
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

module.exports = {
    createJob,
    getAllJobs,
    getJobById,
    updateJob,
    deleteJob,
    getEmployerJobs
};