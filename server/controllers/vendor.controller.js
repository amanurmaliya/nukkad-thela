const mongoose = require("mongoose")

const Vendor = require("../models/vendor.model.js")

const Shop = require("../models/shop.model.js")


const createVendor = async (req, res) => {
    try {
        
        const {name, email, password, phone} = req.body

        if(!name || !email || !password)
        {
            return res.status(400).json({
                success : false,
                message : "Kindly Fill all the details to create account",
                error : error
            })
        }

        if(!phone)
        {
            const newVendor = await Vendor.create({name, email, password})

            if(newVendor)
            {
                return res.status(201).json({
                    success : false,
                    message : "Vendor Account Created SuccessFully"
                })
            }
            else
            {
                return res.status(400).json({
                    success : false,
                    message : "Failed To Create Account Kindly Try again",
                    error : error
                })
            }
        }

        else
        {
            const newVendor = await Vendor.create({name, email, password, phone})

            if(newVendor)
            {
                return res.status(201).json({
                    success : false,
                    message : "Vendor Account Created SuccessFully"
                })
            }
            else
            {
                return res.status(400).json({
                    success : false,
                    message : "Failed To Create Account Kindly Try again",
                    error : error
                })
            }
        }

    } catch (error) {
        return res.status(500).json({
            success : false,
            message : "Failed To create Account Due to server. Please try again",
            error : error.message
        })
    }
}

const createShop = async (req, res) => {
    try {
        const {shopName, description, location, image} = req.body

        if(!shopName || !description || !location)
        {
            return res.status(400).json({
                success : false,
                message : "Kindly enter all details to create shop"
            })
        }

        if(!image)
        {
            const newShop = await Shop.create({shopName, description, location})
            if(newShop)
            {
                return res.json({
                    success : true,
                    message : "New Shop Created Successfully"
                })
            }
        }
        const newShop = await Shop.create({shopName, description, location, image})
        if(newShop)
        {
            return res.json({
                success : true,
                message : "New Shop Created Successfully"
            })
        }

        return res.status(500).json({
            success : false,
            message : "Failed To Create Shop due to db error please try later",
            error : error
        })
    } catch (error) {
        return res.status(500).json({
            success : false,
            message : "",
            error : error
        })   
    }
}

// This syntax is also used to export multiple functions from files
exports.createVendor = createVendor
exports.createShop = createShop