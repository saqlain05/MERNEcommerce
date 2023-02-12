const Product = require("../models/productModel");
const ErrorHander = require("../utils/errorHander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors")


// Create Product -- Admin

exports.createProduct =  catchAsyncErrors(
    async (req, res, next) => {
        const product = await Product.create(req.body);
    
        res.status(201).json({
            success: true,
            product
        });
    }
)

//get All Products

exports.getAllProducts = catchAsyncErrors(
    async (req, res) => {
        const products = await Product.find();
        res.status(201).json({
            success: true,
            products
        });
    }
)

// Get Single Product
exports.getSingleProduct = catchAsyncErrors(
    async (req,res,next) =>{
        const product = await Product.findById(req.params.id);
    
        if (!product) {
            return next(new ErrorHander("Product Not Found", 404));
        }
    
        res.status(200).json({
            success : true,
            product
        })
    }
)

//Update Product - Admin

exports.updateProduct = catchAsyncErrors(
    async (req, res) => {
        let product = await Product.findById(req.params.id);
    
        if (!product) {
            return next(new ErrorHander("Product Not Found", 404));
        }
    
        product = await Product.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
            useFindAndModify: false
        });
        res.status(200).json({
            success : true,
            product
        })
    }
)

// Delete Product -- Admin
exports.deleteProduct = catchAsyncErrors(
    async (req,res,next) =>{
        const product = await Product.findById(req.params.id);
    
        if (!product) {
            return next(new ErrorHander("Product Not Found", 404));
        }
        await product.remove();
        res.status(200).json({
            success : true,
            message : "Product Deleted Successfully"
        })
    }
)


