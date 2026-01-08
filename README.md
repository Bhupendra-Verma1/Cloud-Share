# CloudShare Frontend

CloudShare Frontend is a modern, responsive web application built with **React + Vite**. It provides an intuitive user interface for secure file uploads, cloud storage management, credit-based payments, and file sharing, backed by the CloudShare backend API.

---

## ✨ Features

* **User Authentication**

  * Seamless authentication and session management using **Clerk**
  * Secure JWT-based API communication

* **Easy File Upload**

  * Drag-and-drop file uploads
  * Real-time upload feedback
  * Client-side file size validation

* **File Management Dashboard**

  * View, preview, and organize uploaded files
  * Delete and manage files across devices

* **Secure File Sharing**

  * Generate shareable, controlled links

* **Credits & Payments**

  * Credit-based usage system
  * Integrated **Razorpay Checkout**
  * View usage and purchase history

* **Responsive UI**

  * Optimized for desktop and mobile
  * Clean, minimal, and modern design

---

## 🏗️ Tech Stack

| Layer            | Technology        |
| ---------------- | ----------------- |
| Framework        | React (Vite)      |
| Language         | JavaScript        |
| Authentication   | Clerk             |
| Payments         | Razorpay          |
| Styling          | Tailwind CSS      |
| State Management | React Context API |
| Deployment       | Vercel            |

---

## 📁 Project Structure

```
frontend/
├── public/                 # Static assets
├── src/
│   ├── assets/             # Images, icons
│   ├── components/         # Reusable UI components
│   ├── context/            # Global state & auth context
│   ├── layout/             # Page layouts
│   ├── pages/              # Route-level pages
│   ├── util/
│   │   └── ApiEndpoint.js  # Backend API endpoint config
│   ├── App.jsx             # Root component
│   ├── main.jsx            # App entry point
│   ├── App.css
│   └── index.css
├── .env                    # Environment variables
├── index.html
├── vite.config.js
├── vercel.json
└── package.json
```

---

## ⚙️ Environment Variables

Create a `.env` file in the root directory:

```env
VITE_API_BASE_URL=https://your-backend-domain.com/api/v1.0

VITE_CLERK_PUBLISHABLE_KEY=pk_live_xxxxxxxxx

VITE_RAZORPAY_KEY_ID=rzp_live_xxxxx
```

> ⚠️ All Vite environment variables **must start with `VITE_`**.

---

## 🔗 API Integration

Backend API base URL is centralized in:

```
src/util/ApiEndpoint.js
```

This allows environment-based switching between local, staging, and production backends.

---

## 🧪 Running Locally

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at:

```
http://localhost:5173
```

---

## 🏗️ Build for Production

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

---

## 🚀 Deployment (Vercel)

* Push repository to GitHub
* Import project into **Vercel**
* Set environment variables in Vercel dashboard
* Vercel will auto-detect Vite configuration

---

## 🔐 Security Notes

* Authentication handled entirely by Clerk
* No sensitive secrets stored in frontend
* API requests require valid JWT tokens

---

## 📜 License

This project is licensed under the **MIT License**.

---

## 🤝 Contribution

Contributions are welcome. Please open an issue or submit a pull request for review.

---

## 📬 Contact

For frontend-related questions or UI integration support, please contact the project maintainer.

---

**CloudShare Frontend – Fast. Secure. User-Friendly.**
