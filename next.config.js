/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  env: {
    NEXT_APPWRITE_PROJECT_ID: process.env.NEXT_APPWRITE_PROJECT_ID,
    NEXT_APPWRITE_DB_ID: process.env.NEXT_APPWRITE_DB_ID,
    NEXT_APPWRITE_COLLECTION_ID: process.env.NEXT_APPWRITE_COLLECTION_ID,
  },
};

module.exports = nextConfig;
