import  CredentialsProvider  from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt"
import { redirect } from "next/dist/server/api-utils";
export const NEXT_AUTH_CONFIG={
    providers: [
      CredentialsProvider({
          name: 'Credentials',
          credentials: {
            email: { label: 'email', type: 'text', placeholder: '' },
            password: { label: 'password', type: 'password', placeholder: '' },
          },
          async authorize(credentials: any) {
              const email=credentials.email;
              const password=credentials.password;
  
              const prisma=new PrismaClient();
  
              const user= await prisma.user.findFirst({
                where:{
                  email:email,
                }
              });
  
              if(!user){
                return null;
              }
  
              const match=await bcrypt.compare(password,user.passwordHash);
  
              if(match){
                return {
                  id:user.id
                }
              }else{
                return null;
              }  
          },
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID||"",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET||""
          })
    ],
    secret: process.env.NEXTAUTH_SECRET,
    callbacks:{
        async jwt({token,user}:any){
            if(user){
                token.id=user.id;
            }
            return token;
        },
        async session({session,token}:any){
            session.user.id=token.id;
            return session;
        },
        async redirect({url,baseUrl}:any){
            return `${baseUrl}/dashboard`
        }
    },
    pages:{
      signIn: "/signin",
    }
};