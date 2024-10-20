/** @type {import('next').NextConfig} */
const branchName = process.env.BRANCH_NAME ? "/" + process.env.BRANCH_NAME : "";

const nextConfig = {
    output: "export"
};

export default nextConfig;