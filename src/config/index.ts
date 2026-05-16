import path from "path";
import dotenv from "dotenv";
dotenv.config({
    path: path.resolve(process.cwd(), ".env.local"),
}); 


const config = {
    apiBaseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000/api/v1",
    demoAdminEmail: process.env.NEXT_PUBLIC_DEMO_ADMIN_EMAIL || "restos-admin@gmail.com",
    demoAdminPassword: process.env.NEXT_PUBLIC_DEMO_ADMIN_PASSWORD || "admin1234*$#",
    demoUserEmail: process.env.NEXT_PUBLIC_DEMO_USER_EMAIL || "mina882@gmail.com",
    demoUserPassword: process.env.NEXT_PUBLIC_DEMO_USER_PASSWORD || "mina1234*$#",
}

export default config;