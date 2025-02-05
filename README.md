# Balance360

## Overview
Balance360 is a web application that helps users track and manage their financial transactions efficiently. It provides a seamless interface for users to add, edit, and view their income and expenses, ensuring better financial management.

## Screenshot
![Screenshot](https://res.cloudinary.com/def3zwztt/image/upload/v1738736266/all-devices-black_dl3zs4.png)

## Key Features
🏅 **Multi-Role Access System**  
Distinct dashboards for Admin, Trainer, and Member roles  
🔍 **Class Discovery & Filtering**  
Search and filter fitness classes  
🔐 **Secure Authentication**  
JWT-protected routes with Google/Facebook login options  
💳 **Integrated Payment System**  
Stripe integration for seamless membership purchases  
📅 **Book Training Slot**  
Instant booking for fitness classes and personal training  
👥 **Trainer Social Profiles**  
Connect with trainers via social media links and profiles  
💬 **Interactive Fitness Forum**  
Community discussions with upvote/downvote system  
📱 **Responsive Mobile Design**  
Optimized experience across all device sizes  
📧 **Newsletter Subscription**  
Stay updated with fitness tips and promotions  
🎯 **Membership Packages**  
Choose from Basic, Standard, and Premium workout plans  

## npm Packages Used
- **react-router:** Declarative routing for React
- **zustand:** A lightweight, scalable state-management solution
- **firebase:** Firebase authentication and related services
- **react-hot-toast:** Beautiful notifications for user actions
- **framer-motion:** Smooth animations for a better UI experience
- **lucide-react:** A collection of open-source icons for React

## Backend Repository Overview
The backend repository powers the Balance360 application, handling user authentication, transaction storage, and financial data processing. Built using JavaScript, it provides secure APIs for smooth operation.

### Backend Technologies Used
- **JavaScript**
- **Node.js**
- **Express**
- **MongoDB**

### Backend Repository URL
[Balance360 Backend](https://github.com/Shorno/balance360-backend)

## Setup Guide

### Frontend
1. **Clone the frontend repository:**
```bash
git clone https://github.com/Shorno/balance360.git
```

2. **Navigate to the project directory:**
```bash
cd balance360
```

3. **Install frontend dependencies:**
```bash
npm install
```

4. **Start the frontend development server:**
```bash
npm start
```

### Backend
1. **Clone the backend repository:**
```bash
git clone https://github.com/Shorno/balance360-backend.git
```

2. **Navigate to the backend project directory:**
```bash
cd balance360-backend
```

3. **Install backend dependencies:**
```bash
npm install
```

4. **Start the backend server:**
```bash
npm start
```

## Environment Variables

### Frontend
Create a `.env` file in the root directory of the frontend repository and add the following environment variables:

```plaintext
VITE_BASE_API_URL=your_api_url
VITE_FIREBASE_MEASUREMENT_ID=your_firebase_measurement_id
VITE_FIREBASE_APP_ID=your_firebase_app_id
VITE_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
VITE_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
VITE_FIREBASE_API_KEY=your_firebase_api_key
```

### Backend
Create a `.env` file in the root directory of the backend repository and add the following environment variables:

```plaintext
JWT_SECRET=your_jwt_secret
DATABASE_URL=your_database_url
```

## Live Project Link
[Balance360](https://balance360.vercel.app)

## Relevant Resources
- [Balance360 GitHub Repository](https://github.com/Shorno/balance360)
- [Balance360 Backend GitHub Repository](https://github.com/Shorno/balance360-backend)

