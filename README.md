# 👓 Optical Patient Management App 

A full-stack web application designed to manage optical patient information, prescriptions, lens options, frame details, and other related data. Intended to be used at the practice level, where employees will perform different CRUD operations when working with patients daily.

---

## 🚀 Features

- Patient information intake (name, contact, medical notes, etc.)
- Prescription entry (OD/OS sphere, cylinder, axis, add, prism)
- Print/Email presctiptions
- Lens selection (material, style, coating, AR options, etc.)
- Frame selection and inventory linkage
- Secure authentication + role-based access (admin/optician)
- Fully responsive UI

---

## 🛠️ Tech Stack

**Frontend:** React + Vite
**Backend:** Node.js, Express.js  
**Database:** MongoDB / Mongoose  
**Auth:** JWT-based authentication  
**Other Tools:**  
- Nodemon  
- Vite / CRA  
- Postman (API testing)

## Folder Structure

```
project/
├── README.md
├── api
│   ├── app.js
│   ├── config
│   │   └── db.js
│   ├── controllers
│   │   ├── authController.js
│   │   ├── coatController.js
│   │   ├── frameController.js
│   │   ├── lensController.js
│   │   ├── patientController.js
│   │   ├── rxController.js
│   │   ├── treatmentController.js
│   │   └── userController.js
│   ├── middleware
│   │   ├── auth.js
│   │   ├── isAdmin.js
│   │   ├── isLoggedIn.js
│   │   ├── roles.js
│   │   └── validate.js
│   ├── models
│   │   ├── Coat.js
│   │   ├── Frame.js
│   │   ├── Lens.js
│   │   ├── Patient.js
│   │   ├── Prescription.js
│   │   └── User.js
│   ├── node_modules
│   ├── package-lock.json
│   ├── package.json
│   ├── routes
│   │   ├── authRouter.js
│   │   ├── coatRouter.js
│   │   ├── frameRouter.js
│   │   ├── lensRouter.js
│   │   ├── patientRouter.js
│   │   ├── rxRouter.js
│   │   └── userRouter.js
│   └── test
│       └── patientTest.mjs
└── client
    ├── eslint.config.js
    ├── index.html
    ├── node_modules
    ├── package-lock.json
    ├── package.json
    ├── public
    │   ├── favicon.svg
    │   └── icons.svg
    ├── src
    │   ├── App.css
    │   ├── App.jsx
    │   ├── api.js
    │   ├── assets
    │   ├── components
    │   ├── context
    │   ├── index.css
    │   ├── main.jsx
    │   ├── pages
    │   ├── roles.js
    │   └── styles
    └── vite.config.js

338 directories, 45 files

```

---
### How to run locally:

## 📦 Installation

### 1. Clone the repository
```bash
git https://github.com/jasonbatingan1-cmd/Optical_Patient_Project
cd Optical_Patient_Project
```

## 2. Install server dependencies
```bash
cd server
npm install
```
## 3. Install client dependencies
```bash
cd ../client
npm install
```

## 🔧 Environment Variables

Create a .env file in /server with:
```ini
PORT=3000
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_secret_key
```
## ▶️ Running the App
***Start backend:***
```bash
cd server
npm run dev
```

***Start frontend:***
```bash
cd client
npm run dev
```


The app should now be running at:

Frontend: http://localhost:5173

Backend API: http://localhost:3000

## Website

View the live app here: https://optical-patient-project-1.onrender.com

## 🛣️ Roadmap

 Build patient CRUD

 Add prescription entry UI

 Add lens/frame selection UI

 Authentication + roles

 Order management dashboard

 Deploy (Render/MongoDB Atlas)

## Future additions

Frame images

AI implementation

## 📬 Contact

Your Name
GitHub: https://github.com/jasonbatingan1-cmd

Email: jason.batingan1@gmail.com