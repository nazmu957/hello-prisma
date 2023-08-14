import { Request, Response } from "express";
import { PostService } from "./post.service";

const createPostController = async (req: Request, res: Response) => {
    
    try{
        const  result = await PostService.createPost(req.body)
        res.send({
            success: true,
            message: "Post Created Successfully",
            data: result
        })
    }
    catch (err){
        res.send(err);
    }
}

const getAllPostController = async (req: Request, res: Response) => {
    console.log(req.query);
    const options = (req.query);
    try{
        const result = await PostService.getAllPost(options);
         res.send({
           success: true,
           message: "Post fetched Successfully",
           data: result,
         });
    }catch(err){
        res.send(err)
    }
}



export const PostController = {
  createPostController,
  getAllPostController
};