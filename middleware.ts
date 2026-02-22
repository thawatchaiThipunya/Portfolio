// // middleware.ts
// import { NextResponse } from 'next/server';
// import type { NextRequest } from 'next/server';
// import { jwtVerify } from 'jose';
// const JWT_SECRET = new TextEncoder().encode(
//   process.env.JWT_SECRET || "your_secret_key"
// );

// export async function middleware(request: NextRequest) {
//   const token = request.cookies.get("session_token")?.value;
//   const { pathname } = request.nextUrl;

  
//   if (pathname.startsWith('/admin') || pathname.startsWith('/(cms)') || pathname.startsWith('/cms')) {
    
    
//     if (!token) {
//       return NextResponse.redirect(new URL('/login', request.url));
//     }

//     try {
      
//       await jwtVerify(token, JWT_SECRET);
      
      
//       return NextResponse.next();
//     } catch  {
      
//       console.error("Middleware Auth Error:", error);
//       const response = NextResponse.redirect(new URL('/login', request.url));
//       response.cookies.delete("session_token"); 
//       return response;
//     }
//   }

//   return NextResponse.next();
// }


// export const config = {
//   matcher: [
//     '/admin/:path*', 
//     '/cms/:path*',
    
//   ],
// };




import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || "your_secret_key");

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const method = request.method;
  const token = request.cookies.get("session_token")?.value;

  
  if (pathname.startsWith('/api/auth/login') || pathname.startsWith('/api/auth/forgotpass') || pathname.startsWith('/api/auth/resetpass') ) {
    return NextResponse.next();
  }

  
  if (pathname.startsWith('/api')) {
    
    // --- ส่วนป้องกัน Postman สำหรับ GET ---
    if (method === 'GET') {
      const referer = request.headers.get('referer');
      const host = request.headers.get('host');

      if (!referer || !referer.includes(host || "")) {
        return NextResponse.json({ error: "Access denied: Direct API calls are not allowed" }, { status: 403 });
      }
      
      return NextResponse.next(); // ถ้ามาจากเวปเราเอง ให้ผ่านได้โดยไม่ต้องมี Token
    }

    // --- ส่วนเช็ค Token สำหรับ POST, PATCH, DELETE ---
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
      await jwtVerify(token, JWT_SECRET);
      return NextResponse.next();
    } catch  {
      return NextResponse.json({ error: "Invalid Token" }, { status: 401 });
    }
  }

  // 3. จัดการหน้า CMS (เหมือนเดิม)
  if (pathname.startsWith('/cms')) {
    if (!token) return NextResponse.redirect(new URL('/login', request.url));
    try {
      await jwtVerify(token, JWT_SECRET);
      return NextResponse.next();
    } catch  {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/api/:path*', '/cms/:path*'],
};