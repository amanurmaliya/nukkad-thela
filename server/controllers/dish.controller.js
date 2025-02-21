const Dish = require("../models/dish.model.js")

const createDish =  async (req, res) => {
    try {
        const {name, description, timeToCook, image} = req.body;

        if(!name || !timeToCook)
        {
            return res.status(400).json({
                success : false,
                message : "Name & timeToCook is mandatory. Kindly Fill these details"
            })
        }

        // const cloudinaryImageLink = 
        const newDish = await new Dish({
            name,
            description : description?description:"No Description",
            timeToCook,
            image 
        }) 

        try {
            await newDish.save();
        } catch (error) {
            return res.status(501).json({
                success : false,
                message: "Dish Data Failed to database",
                error
            })
        }

        return res.status(200).json({
            success : true,
            message : "Dish Created Successfully",
        })
    } catch (error) {
        return res.status(500).json({
            success : true,
            message : "Server Error While Creating the Dish"
        })
    }
}

module.exports = {createDish}