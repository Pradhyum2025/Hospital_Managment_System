import { Appointment } from '../models/appointment.js';
import { User } from '../models/user.js';

export const getMyAppoinment = async (req, res) => {
  try {
    const userId = req.user.id;
    const currUser = await User.findOne({ _id: userId,
      $or:[
        {role:'patient'},
        {role:'doctor'}
      ]
    }, { appoinmentHistory: true }).populate({path:"appoinmentHistory",populate:{path:'doctor',select:'firstName lastName'}});


    res.status(200).json({
      success: true,
      myAppointments: currUser.appoinmentHistory,
      message: "Appointments Got!"
    });

  } catch (error) {
    console.log(error.message)
    res.status(400).json({
      success: false,
      message: "Internal server error"
    });
  }
};


export const createNewAppoinment = async (req, res) => {
  try {

    const { doctor, firstName, lastName,age, appointmentDate, reason, phoneNumber, email, time } = req.body;

    const userId = req.user.id;

    // Basic field validation
    if (!doctor || !firstName || !age || !lastName || !appointmentDate || !reason || !phoneNumber || !email || !time) {
      return res.status(400).json({
        success: false,
        message: "All fields (doctor, appointmentDate, reason, phone, email, time) are required.",
      });
    }

    const doctorObj = await User.findOne({ _id: doctor, role: 'doctor' })

    if (!doctorObj) {
      return res.status(400).json({
        success: false,
        message: "Current doctor details not found",
      });
    }


    const newAppointment = new Appointment({
      doctor,
      age,
      patient: `${firstName} ${lastName}`,
      appointmentDate,
      reason,
      phone: phoneNumber,
      email,
      time,
    });

    const savedAppointment = await newAppointment.save();

    await User.findByIdAndUpdate(doctorObj._id,
      {
        $push: {
          appoinmentHistory: savedAppointment._id
        }
      }
    )

    await User.findByIdAndUpdate(userId,
      {
        $push: {
          appoinmentHistory: savedAppointment._id
        }
      }
    )

    return res.status(201).json({
      success: true,
      message: "Appointment created successfully.",
    });
  } catch (error) {
    console.error("Error saving appointment:", error.message);
    return res.status(500).json({
      success: false,
      message: "Internal server error. Please try again later.",
      error: error.message,
    });
  }
}



export const scheduleAppoinment = async (req, res) => {
  try {
    const {appoinmentId }=  req.params;
    const { appointmentDate, time,department,notes } = req.body;

    const userId = req.user.id;

    // Basic field validation
    if ( !appointmentDate || !time || !department || !notes ) {
      return res.status(400).json({
        success: false,
        message: "All fields ( appointmentDate ,time) are required.",
      });
    }

    const appoinmentObj = await Appointment.findOne({ _id: appoinmentId})

    if (!appoinmentObj) {
      return res.status(400).json({
        success: false,
        message: "Current appoinment details not found",
      });
    }
   
    if(appoinmentObj.status==='cancelled' || appoinmentObj.status==='completed'){
      return res.status(400).json({
        success: false,
        message: "Current appoinment is aleady cancelled/completed",
      });
    }

    const savedAppointment = await Appointment.findByIdAndUpdate(appoinmentId,{
      time,
      appointmentDate,
      notes,
      department,
      status:'scheduled'
    },{new:true}).populate('doctor','firstName lastName');


    return res.status(201).json({
      success: true,
      savedAppointment,
      message: "Appointment Scheduled successfully.",
    });
  } catch (error) {
    console.error("Error Scheduling appointment:", error.message);
    return res.status(500).json({
      success: false,
      message: "Internal server error. Please try again later.",
      error: error.message,
    });
  }
}

export const chnageAppoinmentStatus = async (req, res) => {
  try {
    const {appoinmentId }=  req.params;
    const { statusValue} = req.body;
    const userId = req.user.id;

    // Basic field validation
    if ( !statusValue ) {
      return res.status(400).json({
        success: false,
        message: "Status value is required",
      });
    }

    const appoinmentObj = await Appointment.findOne({ _id: appoinmentId})

    if (!appoinmentObj) {
      return res.status(400).json({
        success: false,
        message: "Current appoinment details not found",
      });
    }
   
    if(appoinmentObj.status==='cancelled' || appoinmentObj.status==='completed'){
      return res.status(400).json({
        success: false,
        message: "Current appoinment is aleady cancelled/completed",
      });
    }

    const savedAppointment = await Appointment.findByIdAndUpdate(appoinmentId,{
      status:statusValue
    });


    return res.status(201).json({
      success: true,
      message: `Appointment ${statusValue} successfully`,
    });
  } catch (error) {
    console.error("Error status updating appointment:", error.message);
    return res.status(500).json({
      success: false,
      message: "Internal server error. Please try again later.",
      error: error.message,
    });
  }
}
