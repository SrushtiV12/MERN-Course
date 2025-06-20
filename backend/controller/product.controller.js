import mongoose from 'mongoose';
import Product from '../models/product.model.js'; // Import the Product model

export const getProducts =  async (req, res) => {
    try{
        const products = await Product.find(); // Fetch all products from the database
        res.status(200).json({success: true, data: products}); // Send the products as a JSON response
    }catch(error){
        res.status(500).json({success: false, message: "Internal Server Error"}); // Handle errors
    }
}

export const createProducts = async (req,res) =>{
   const product = req.body; // user will send this data

   if(!product.name || !product.price || !product.image){
       return res.status(400).json({success:false,message: "Please fill all the fields"});
   }
   const newProduct = new Product(product)

   try{
    await newProduct.save();
    res.status(201).json({success:true,product:newProduct});
}
    catch(error){
        console.error("Error creating product:", error.message);
        res.status(500).json({success:false,message:"Internal Server Error"});
    }
   }

export const updateProduct = async (req,res) =>{
    const {id} = req.params; // destructuring to get id from params
    const product = req.body;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({success:false,message:"Invalid product ID"});
    }
    try{
       const updatedProduct =  await Product.findByIdAndUpdate(id, product, {new: true});
       res.status(200).json({success:true,data:updatedProduct});
    }catch(error){
      //  console.error("Error updating product:", error.message);
        res.status(500).json({success:false,message:"Internal Server Error"});
    }
}

export const deleteProduct = async (req,res) =>{
       const {id} = req.params // destructuring to get id from params
      // console.log("id:",id);
//console.log("Deleting product ID:", req.params.id);

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({success:false,message:"Invalid product ID"});
    }

      try{
        await Product.findByIdAndDelete(id);
        res.status(200).json({success:true,message:"Product deleted successfully"});
      }catch(error){
        console.log("error in deleting product:", error.message);
        res.status(500).json({success:false,message:"Server Error"});
      }
    };