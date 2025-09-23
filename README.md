# 📝 Google Docs Clone (Real-Time Collaboration)

A **real-time collaborative document editor** built using **Next.js 15**, **React**, **Tailwind CSS**, **Shadcn UI**, **Convex**, **Clerk**, and **Liveblocks**. Multiple users can simultaneously edit documents with live synchronization—just like Google Docs!

## 📑 Table of Contents
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Installation](#-installation)
- [Setup Environment Variables](#-setup-environment-variables)
- [Usage](#usage)
- [Learn More](#learn-more)
- [Deploy on Vercel](#deploy-on-vercel)
- [Contributing](#-contributing)
- [License](#-license)

## 🚀 Features
- 🔐 **Authentication with [Clerk](https://clerk.com/)**
- 📝 **Rich Text Editor with [Tiptap](https://tiptap.dev)**
- 🔄 **Live Collaboration via [Liveblocks](https://liveblocks.io)**
- 💾 **Data Persistence with [Convex](https://convex.dev/)**
- ⚡ **Modern UI & UX with [Tailwind CSS](https://tailwindcss.com/) and [Shadcn UI](https://ui.shadcn.com/)**

## 🛠️ Tech Stack
| Tech         | Role                                             |
|--------------|--------------------------------------------------|
| [Next.js 15](https://nextjs.org/)   | React framework with App Router |
| [React](https://react.dev/)         | UI framework                 |
| [Tailwind CSS](https://tailwindcss.com/) | Utility-first styling        |
| [Shadcn UI](https://ui.shadcn.com/) | Accessible component library |
| [Clerk](https://clerk.dev/)         | Authentication & user management |
| [Convex](https://www.convex.dev/)   | Backend as a service & database |
| [Liveblocks](https://liveblocks.io/) | Real-time collaboration & presence |
| [Tiptap](https://tiptap.dev/)       | Rich text editor framework   |

## 📦 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/DakshSitapara/google_docs_clone
cd google_docs_clone

npm install
# or
pnpm install
```

## 🔐 Setup Environment Variables

Create a `.env.local` file in the root of your project and add the following keys:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key

NEXT_PUBLIC_CONVEX_URL=your_convex_url
CONVEX_DEPLOYMENT=your_convex_token

LIVEBLOCKS_SECRET_KEY=your_liveblocks_public_key
```

💡 Get your API keys from:

- [Clerk Dashboard](https://dashboard.clerk.dev/)
- [Convex Dashboard](https://dashboard.convex.dev/)
- [Liveblocks Dashboard](https://liveblocks.io/dashboard)

### How to Use

- This section helps you configure environment variables required for **Clerk**, **Convex**, and **Liveblocks** integration.
- Copy and paste the keys into your `.env.local` file and replace the placeholders (`your_clerk_publishable_key`, `your_convex_url`, etc.) with your actual values.

## 🚀 Usage

Start the development server:

```bash
npm run dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## 📚 Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## 🚀 Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## 🤝 Contributing

Contributions are welcome! Please open an issue or submit a pull request for any bug fixes or enhancements.

## 📝 License

This project is [MIT licensed](LICENSE).