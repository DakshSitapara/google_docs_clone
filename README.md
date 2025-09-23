# 📝 Google Docs Clone (Real-Time Collaboration)

A **real-time collaborative document editor** built using **Next.js 15**, **React**, **Tailwind CSS**, **Shadcn UI**, **Convex**, **Clerk**, and **Liveblocks**. Multiple users can simultaneously edit documents with live synchronization—just like Google Docs!

---

## 🚀 Features

- 🔐**Authentication with [Clerk](https://clerk.com/)**  
  Secure and flexible user authentication with support for Google and GitHub sign-ins. Clerk handles session management, allowing users to authenticate and securely access their documents.

- 📝**Rich Text Editor with [Tiptap](https://tiptap.dev)**  
  A powerful, extensible text editor built on top of ProseMirror, offering rich text formatting capabilities. The editor supports custom extensions and collaborative editing features for real-time document creation.

- 🔄**Live Collaboration via [Liveblocks](https://liveblocks.io)**  
  Real-time, multi-user document editing powered by Liveblocks. Users can collaborate seamlessly, with live updates and user presence indicators, ensuring a smooth, synchronized editing experience.

- 💾**Data Persistence with [Convex](https://convex.dev/)**  
  Convex is used as the serverless backend, managing real-time data storage and syncing. It ensures that documents are auto-saved, and handles all database logic efficiently with live queries and subscriptions.

- ⚡**Modern UI & UX**  
  The user interface is designed using **[Tailwind CSS](https://tailwindcss.com/)** for utility-first styling and **[Shadcn UI](https://ui.shadcn.com/)** for accessible, reusable components. This results in a fast, responsive, and accessible design across devices.

- 📁**User-Specific Document Dashboard**  
  Each user has a personalized dashboard where they can view, manage, and organize their documents. Access is secured and protected based on user authentication, ensuring that only the rightful owner can edit and view their documents.


---

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
| [Vercel](https://vercel.com/)       | Hosting & deployment         |

---

## 📦 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/DakshSitapara/google_docs_clone
cd google-docs-clone

npm install
# or
pnpm install


## 🔐 Setup Environment Variables

Create a `.env.local` file in the root of your project and add the following keys:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key

CONVEX_DEPLOYMENT_URL=your_convex_url
CONVEX_DEPLOYMENT_TOKEN=your_convex_token

NEXT_PUBLIC_LIVEBLOCKS_PUBLIC_KEY=your_liveblocks_public_key

```
💡 Get your API keys from:

[Clerk Dashboard](https://dashboard.clerk.dev/)

[Convex Dashboard](https://dashboard.convex.dev/)

[Liveblocks Dashboard](https://liveblocks.io/dashboard)

### How to Use:
- This section helps you configure environment variables required for **Clerk**, **Convex**, and **Liveblocks** integration.
- Simply copy and paste the keys into your `.env.local` file and replace the placeholders (`your_clerk_publishable_key`, `your_convex_url`, etc.) with your actual values.

Let me know if you'd like to tweak anything further!

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

