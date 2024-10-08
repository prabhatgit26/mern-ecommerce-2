import { v2 as cloudinary } from "cloudinary";
import productModel from "../models/productModel.js";

// Function for add product
const addProduct = async (req,res) => {
    try {
        
        const { name, description, price, category, subCategory, sizes, bestseller } = req.body;

        const image1 = req.files.image1 && req.files.image1[0]
        const image2 = req.files.image2 && req.files.image2[0]
        const image3 = req.files.image3 && req.files.image3[0]
        const image4 = req.files.image4 && req.files.image4[0]

        // saved images in images array 
        const images = [image1,image2,image3,image4].filter((item)=> item !== undefined)

        // upload images on URL (from cloudinary)
        let imagesUrl = await Promise.all(
            images.map(async (item) =>{
                let result = await cloudinary.uploader.upload(item.path, {resource_type:'image'});
                return result.secure_url
            })
        )

        // 
        const productdata = {
            name,
            description,
            category,
            price: Number(price),
            subCategory,
            bestseller: bestseller === "true" ? true : false,
            sizes: JSON.parse(sizes), //sizes in form of array and array can't access in form data so we use JSON.parse here
            image: imagesUrl,
            date: Date.now()
        }

        console.log(productdata);


        const product = new productModel(productdata);
        await product.save()

        res.json({success:true, message:"Product Added Successfully."})

        // res.json({})

    } catch (error) {
        res.json({success:false, message:error.message})
        console.log(error);
    }

}

// Function for list product
const listProducts = async (req,res) => {

    try {
        
        const products = await productModel.find({});
        res.json({success:true, products}) 

    } catch (error) {
        console.log(error);
        res.json({success:false, message:error.message})
    }

}

// Function for removing product
const removeProduct = async (req,res) => {
    try {
        await productModel.findByIdAndDelete(req.body.id)
        res.json({success:true, message:"Product Removed Successfully."})
    } catch (error) {
        console.log(error);
        res.json({success:false, message:error.message})

    }

}

// Function for single product info
const singleProduct = async (req,res) => {
    try {

        const { productId } =req.body
        const product = await productModel.findById(productId)
        res.json({success:true, product})


    } catch (error) {
        console.log(error);
        res.json({success:false, message:error.message})
        
    }

}

export { listProducts, addProduct, removeProduct, singleProduct };