import { Post, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const createPost = async ( data: Post):Promise<Post> => {
     const result = await prisma.post.create({
        data,
        include: {
            author: true,
            category: true
        }
     })
     return result;
}

const getAllPost = async (options: any) => {
     const {sortBy, sortOrder} = options
    const result = await prisma.post.findMany({
      include: {
        author: true,
        category: true
      },
      orderBy: sortBy && sortOrder ? {
         [sortBy] : sortOrder
      } : {createdAt: 'desc'} 
    });
    return result;
    
}


export const PostService = {
    createPost,
    getAllPost
}