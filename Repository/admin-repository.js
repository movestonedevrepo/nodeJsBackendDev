const Config = require("../database/models/config");
const Products = require("../database/models/products");

const { Op, Sequelize } = require("sequelize");

const createProductRepo =  async (reqBody)=>{

    try{
        console.log(reqBody);
        const product= await Products.create(reqBody);
        return product;
    }
    catch(error){
        console.log("in repo",error.message)
        throw ({errorMessage:"error caught in repo level", message:error.message});
   }
    

}

const deleteProductRepo =  async ({productID,secretKey})=>{

    try{
   

       
        const findScretKey = await Config.findOne({where:{attribute1:secretKey},raw:true});
      console.log(findScretKey)
        if (findScretKey?.attribute1!==secretKey){
            throw ({errorMessage:"error caught in repo level", message:"secret key invalid"});
        }
        const product= await Products.destroy({where:{productID}});
        return product;
    }
    catch(error){
        console.log("in repo",error.message)
        throw ({errorMessage:"error caught in repo level", message:error.message});
   }
    

}

const getAllProducts = async ()=>{

    try{
        return await Products.findAll();
    }
    catch(error){
        console.log("in repo",error.message)
        throw ({errorMessage:"error caught in repo level", message:error.message});
   }
}

const updatedProductRepo=  async (reqBody)=>{

    try{
        console.log(reqBody);
        const product= await Products.update(reqBody,{where:{productID:reqBody.productID}});
        // await Products.save();
        return product;
    }
    catch(error){
        console.log("in repo",error.message)
        throw ({errorMessage:"error caught in repo level", message:error.message});
   }
    

}


module.exports={createProductRepo, deleteProductRepo, updatedProductRepo,getAllProducts}