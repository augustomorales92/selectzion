import type { NextAuthConfig } from 'next-auth';
 
export const authConfig = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith('/backoffice');
      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return Response.redirect(new URL('/', nextUrl));
      } else if (isLoggedIn) {
        return Response.redirect(new URL('/backoffice', nextUrl));
      }
      return true;
    },
  },
  providers: [],
} satisfies NextAuthConfig;
