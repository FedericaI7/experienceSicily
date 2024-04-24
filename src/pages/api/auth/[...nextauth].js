import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import clientPromise from "../../../../utils/mongodb";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "username" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const { username } = credentials;
        const { password } = credentials;

        const client = await clientPromise;
        const db = client.db("final-project");
        const user = await db
          .collection("users")
          .findOne({ username: username });

        if (user.username === username && user.password === password) {
          console.log("User found", user);
          return user;
        } else {
          console.log("User not found");
          return null;
        }
      },
    }),
  ],
  strategy: "jwt",
  pages: {
    signIn: "/signIn",
    error: "/error",
  },
  callbacks: {
    async jwt({ token, user }) {
      // Persist the OAuth access_token to the token right after signin
      if (user) {
        token.username = user.username;
        token.id = user._id;
        token.favorites = user.favorites;
      }
      return token;
    },
    async session({ session, token }) {
      // Send properties to the client, like an access_token from a provider.
      if (session.user) {
        session.user.username = token.username;
        session.user.id = token.id;
        session.user.favorites = token.favorites;
      }
      return session;
    },
  },
  async redirect({ url, baseUrl }) {
    console.log("NextAuth Redirect callback", {
      millis: Date.now(),
      url,
      baseUrl,
    });
    // Allows relative callback URLs
    if (url.startsWith("/")) return `${baseUrl}${url}`;
    // Allows callback URLs on the same origin
    else if (new URL(url).origin === baseUrl) return url;

    return baseUrl;
  },
};

export default NextAuth(authOptions);
