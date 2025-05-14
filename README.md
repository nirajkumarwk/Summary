# 📄 PDF Summary Generator

**Live Demo** 👉 [https://summary-tan.vercel.app/](https://summary-tan.vercel.app/)

A web application where users can upload PDF files and receive automated summaries. The summary is divided into digestible points and displayed using interactive UI cards with navigation controls and a progress indicator.

---

## ✨ Features

- Authentication with **Clerk**
- PDF Uploads handled by **UploadThing**
- Text extraction from PDF using **LangChain**
- AI-Powered Summarization using **Gemini API**
- Database Integration with **NeonDB**
- Interactive UI Summary Cards:
  - View summary point-by-point
  - Next/Previous buttons to navigate
  - Progress bar to indicate completion
- Built with **Next.js** and **Tailwind CSS**

---

## 🧰 Tech Stack

- **Next.js**: React framework for scalable UI
- **Tailwind CSS**: Utility-first CSS styling
- **UploadThing**: Simple file upload handling
- **LangChain**: Extracts and preprocesses text from uploaded PDFs
- **Gemini API**: Summarizes extracted content into clear bullet points
- **NeonDB**: PostgreSQL database for persistent storage
- **Clerk**: Authentication and user session management

---

## ⚙️ How It Works

1. User logs in using **Clerk**
2. Uploads a PDF via **UploadThing**
3. **LangChain** extracts raw text from the uploaded PDF
4. The extracted text is summarized into bullet points via **Gemini API**
5. The summary is stored in **NeonDB** and shown through interactive **UI cards**
   - Browse summary points using **Next/Previous** buttons
   - A **progress bar** shows how far the user has read

---

## 🧑‍💻 Local Setup

1. Clone the repo  
2. Install dependencies: `npm install`  
3. Create `.env.local` and add credentials for:
   - Clerk
   - UploadThing
   - NeonDB
   - Gemini API Key  
4. Run the development server: `npm run dev`  
5. Visit: `http://localhost:3000`


