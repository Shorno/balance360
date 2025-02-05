# Balance360 : Ultimate Fitness Management 

## Overview
Balance360 is a web application that helps users track and manage their financial transactions efficiently. It provides a seamless interface for users to add, edit, and view their income and expenses, ensuring better financial management.

## Screenshot
![Screenshot](https://res.cloudinary.com/def3zwztt/image/upload/v1738739363/all-devices-black_hfhboq.png)

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

## Key Technologies Used
### Frontend
- **React.js**
- **Vite**
- **Zustand** (State management)
- **Firebase** (Authentication & storage)
- **React Query** (Data fetching & caching)
- **Stripe.js** (Payment processing)
- **Tailwind CSS** (Styling)
- **Framer Motion** (Animations)
- **Lucide React** (Icons)

### Backend
- **Node.js**
- **Express.js**
- **MongoDB** (Database)
- **Stripe API** (Payment processing)
- **JWT Authentication**

## Backend Repository Overview
The backend repository powers the Balance360 application, handling user authentication, transaction storage, and financial data processing. Built using JavaScript, it provides secure APIs for smooth operation.

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
VITE_STRIPE_PUBLIC_KEY=your_stripe_public_key
VITE_BASE_API_URL=your_api_url
VITE_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
VITE_PUBLIC_CLOUDINARY_UPLOAD_PRESET=your_cloudinary_upload_preset
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
MONGODB_URI=your_mongodb_uri
STRIPE_SECRET_KEY=your_stripe_secret_key
JWT_SECRET=your_jwt_secret
```

## Live Project Link
[Balance360](https://balance360.vercel.app)

## Relevant Resources
- [Balance360 GitHub Repository](https://github.com/Shorno/balance360)
- [Balance360 Backend GitHub Repository](https://github.com/Shorno/balance360-backend)
