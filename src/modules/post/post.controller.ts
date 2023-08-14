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

export const PostController = {
  createPostController
};