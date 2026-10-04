import cloudinary from "../config/cloudinary.js"
import {Readable} from 'stream'
import Trip from "../models/trips.js"
import { User } from "../models/users.model.js"
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
     const cloudinaryUpload=async (buffer,folder)=>{
 return new Promise((resolve,reject)=>{
 const stream=cloudinary.uploader.upload_stream({
  folder:folder,
 },
 (error,result)=>{
if(error){
reject(error)
}
else{
  resolve(result)
}
 }
)
Readable.from(buffer).pipe(stream)
 })
     }
     const tripPhoto= req.files?.coverImage?.[0].buffer
     let coverImage=null
     if(tripPhoto){
      const result= await cloudinaryUpload(
        tripPhoto,
        "coverImage-Image"
      )
coverImage =result.secure_url     }
const photoFiles = req.files?.photos || [];
const photos = []; 
if (photoFiles.length > 0) {
  for (const file of photoFiles) {
    const result = await cloudinaryUpload(file.buffer, "trip-photos");
    photos.push(result.secure_url); 
  }
}
     const trip = await Trip.create({
            title,
            startDate,
            endDate,
            destination,
            description,
            rating,
            coverImage,
            photos,
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
    const cloudinaryUpload= async( buffer,folder)=>{
return new Promise((resolve,reject)=>{
const stream= cloudinary.uploader.upload_stream({
  folder:folder
},
(error,result)=>{
  if(error){
    reject(error)
  }
  else{
    resolve(result)
  }
}
)
Readable.from(buffer).pipe(stream)
})
}
const tripPhoto = req.files?.coverImage?.[0]?.buffer
if(tripPhoto){
  const  result = await cloudinaryUpload(
    tripPhoto,
    "coverImage"
  )
existTrip.coverImage=result.secure_url
}
const photofile=req.files?.photos ||[]
if(photofile.length>0){
  const photos=[]
for(const file of photofile){
  const result= await cloudinaryUpload(
    file.buffer,
    "trip-photos"
  );
  photos.push(result.secure_url)
}
existTrip.photos = [...(existTrip.photos || []),...photos]
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

export const getPublicProfile = async (req, res) => {
  try {
    const { username } = req.params;
    const user = await User.findOne({ username}).select("name  username bio");
    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }
    const trips = await Trip.find({
      user: user._id
    }).select(
      "title destination startDate endDate rating coverImage photos"
    );
    return res.status(200).json({
      user: {
        name: user.name,
        username:user.username,
        bio: user.bio
      },
      trips
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to fetch public profile",
      error: error.message
    });
  }
};
