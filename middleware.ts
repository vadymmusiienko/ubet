import { withAuth } from "@kinde-oss/kinde-auth-nextjs/server";

export default function middleware(req) {
    return withAuth(req);
}

// Put all protected routes here
export const config = {
    matcher: ["/dashboard"],
};
