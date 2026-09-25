import Trip from "../models/trips.js"


 export const createTrip= async (req,res)=>{
  try {
    const
    {title,
    startDate,
    endDate,
    destination,
    description,
    rating
     }=req.body
     if(
        !title||
        !startDate||
        !endDate|| 
        !destination||
        !description|| 
        !rating 
    )
     {
        return res.status(400).json({
            message:"All fields are required"
        })
     }
     const trip = await Trip.create({
            title,
            startDate,
            endDate,
            destination,
            description,
            rating,
            user: req.user.id
        }) 
      return res.status(201).json({
            message: "Trip created successfully!",
            trip
        })
  } catch (error) {
      return res.status(500).json({
        message:"Failed to create trip",
        error:error.message
      })
  }  
}

export const getTrips= async (req,res)=>{
try {
    const trips = await Trip.find({ user:req.user.id})
    if(!trips){
        return res.status(401).json({
            message:"No trip  found"
        })
    }
      return  res.status(200).json({
        message:"All trips fetch successfully",
        trips
      })
} catch (error) {
    return res.status(500).json({
        message:"Get all trips failed",
        error:error.message
    })
}
}

export const  getTrip= async(req,res)=>{
    try {
        const trip= await Trip.findOne({
            _id: req.params.id,
            user:req.user.id
        })  
  if(!trip){
        return res.status(404).json({
            message:"No trip  found"
        })
    }
      return  res.status(200).json({
        message:"Trip fetch successfully",
        trip
      })
} catch (error) {
    return res.status(500).json({
        message:"Get trip failed",
        error:error.message
    })
}
}  

export const updateTrip = async (req, res) => {
  try {
const {
    title,
    startDate,
    endDate,
    description,
    destination,
    rating
}=req.body
const existTrip= await Trip.findOne({
    _id:req.params.id,
    user: req.user.id
})

 if(!existTrip)
    {
        return res.status(404).json({
            message:"Trip not found"
        })
    }

   existTrip.title = title ?? existTrip.title;
    existTrip.startDate = startDate ?? existTrip.startDate;
    existTrip.endDate =  endDate ?? existTrip.endDate;
    existTrip.description = description ?? existTrip.description;
    existTrip.destination = destination ?? existTrip.destination;
    existTrip.rating = rating ?? existTrip.rating
    await existTrip.save()
     return res.status(200).json({
    message:"Trip updated successfully!"
 })
  } catch (error) {
    return res.status(500).json({
      message: "Trip not updated successfully",
      error: error.message,
    });
  }
};

export const deleteTrip = async (req, res) => {
  try {
    const trip = await Trip.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!trip) {
      return res.status(404).json({
        message: "Trip not found",
      });
    }

    return res.status(200).json({
      message: "Trip deleted successfully",
      trip,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Deletion not successful",
      error: error.message,
    });
  }
};