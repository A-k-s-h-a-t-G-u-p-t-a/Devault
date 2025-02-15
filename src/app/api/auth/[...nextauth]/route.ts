import NextAuth from "next-auth"
import bcrypt from "bcrypt"
import CredentialsProvider from 'next-auth/providers/credentials';
import {PrismaClient} from "@prisma/client"

const handler = NextAuth({
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
      })
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages:{
    signIn: "/signin",
  }
})

export { handler as GET, handler as POST }