import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth";
import User from "@/modals/User";
import bcrypt from "bcrypt";
import GoogleProvider from "next-auth/providers/google";
import { signJwtToken } from "@/lib/jwt";
import dbConnect from "@/lib/dbConnect";

export const authOptions = {
  providers: [
    CredentialsProvider({
      type: "credentials",
      credentials: {},
      async authorize(credentials) {
        const { email, password } = credentials;
        try {
          const user = await User.findOne({ email });
          if (!user) {
            throw new Error("Invalid input");
          }
          const passwordMatch = await bcrypt.compare(password, user.password);
          if (!passwordMatch) {
            throw new Error("Password does not match");
          } else {
            const { password, ...currentUser } = user._doc;
            const accessToken = signJwtToken(currentUser, { expiresIn: "7d" });
            return {
              ...currentUser,
              accessToken,
            };
          }
        } catch (error) {
          console.log(error);
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET,
    }),
  ],
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXT_PUBLIC_NEXTAUTH_SECRET,
  callbacks: {
    async signIn({ user, account }) {
        if (account.provider === "google") {
          try {
            await dbConnect();
            console.log("Connected to MongoDB");
            const { email, name, image } = user;
            const userExist = await User.findOne({ email });
            if (!userExist) {
              console.log("Creating new user...");
              const newUser = await User.create({
                name,
                email,
                image,
                provider: account.provider,
              });
              console.log("New user created:", newUser);
            } else {
              console.log("User already exists:", userExist);
            }
            return true;
          } catch (error) {
            console.log("Error during sign-in:", error);
            return true;
          }
        }
        return true;
      },

    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.accessToken;
        token._id = user._id;
      }

      return token;
    },

    async session({ session, token }) {
      if (token) {
        session.user._id = token._id;
        session.user.accessToken = token.accessToken;
      }

      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
