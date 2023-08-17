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
     const {sortBy, sortOrder, searchTerm,page, limit  } = options;
     const skip = parseInt(limit)* parseInt(page) - parseInt(limit);
     const take = parseInt(limit);

     return await prisma.$transaction( async(tx) => {
            const result = await tx.post.findMany({
              //
              include: {
                author: true,
                category: true,
              },
              orderBy:
                sortBy && sortOrder
                  ? {
                      [sortBy]: sortOrder,
                    }
                  : { createdAt: "desc" },
              where: {
                OR: [
                  {
                    title: {
                      contains: searchTerm,
                      mode: "insensitive",
                    },
                  },
                  {
                    author: {
                      name: {
                        contains: searchTerm,
                        mode: "insensitive",
                      },
                    },
                  },
                ],
              },
            });

            const total = await tx.post.count();

            return { data: result, total };   
     })
     
    
}


export const PostService = {
    createPost,
    getAllPost
}