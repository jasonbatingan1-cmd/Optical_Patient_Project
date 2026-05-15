# 👓 Optical Patient Management App 

A full-stack web application designed to manage optical patient information, prescriptions, lens options, frame details, and other related data. Intended to be used at the practice level, where employees will perform different CRUD operations when working with patients daily.

---

## 🚀 Features

- Patient information intake (name, contact, medical notes, etc.)
- Prescription entry (OD/OS sphere, cylinder, axis, add, prism)
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
├── config/
│   ├── db.js
│   └── passport.js
│
├── controllers/
│   ├── authController.js
│   ├── userController.js
│   ├── patientController.js
│   ├── rxController.js
│   ├── lensController.js
│   ├── coatController.js
│   ├── treatmentController.js
│   └── frameController.js
│
├── middleware/
│   ├── isLoggedIn.js
│   ├── isAdmin.js
│   └── validate.js
│
├── models/
│   ├── User.js
│   ├── Patient.js
│   ├── Prescription.js
│   ├── Lens.js
│   ├── Coat.js
│   ├── Treatment.js
│   └── Frame.js
│
├── routes/
│   ├── authRouter.js
│   ├── userRouter.js
│   ├── patientRouter.js
│   ├── rxRouter.js
│   ├── lensRouter.js
│   ├── coatRouter.js
│   ├── treatmentRouter.js
│   └── frameRouter.js
│
├── views/
│   ├── auth/
│   │   ├── login.ejs
│   │   └── register.ejs
│   │
│   ├── users/
│   │   ├── index.ejs
│   │   └── edit.ejs
│   │
│   ├── patients/
│   │   ├── index.ejs
│   │   ├── new.ejs
│   │   ├── edit.ejs
│   │   └── show.ejs
│   │
│   ├── rx/
│   │   ├── new.ejs
│   │   ├── edit.ejs
│   │   └── show.ejs
│   │
│   ├── lens/
│   ├── coats/
│   ├── treatments/
│   ├── frames/
│   │   └── (same pattern: index/new/edit/show)
│   │
│   ├── partials/
│   │   ├── header.ejs
│   │   ├── footer.ejs
│   │   └── nav.ejs
│   │
│   └── home.ejs
│
├── public/
│   ├── css/
│   ├── js/
│   └── images/
│
├── index.js
└── package.json

```

---

## 📦 Installation

### 1. Clone the repository
```bash
git clone https://github.com/your-username/optical-app.git
cd optical-app
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
PORT=5000
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

Backend API: http://localhost:5000

## 🛣️ Roadmap

 Build patient CRUD

 Add prescription entry UI

 Add lens/frame selection UI

 Authentication + roles

 Order management dashboard

 Deploy (Render/MongoDB Atlas)

## 📬 Contact

Your Name
GitHub: https://github.com/jasonbatingan1-cmd

Email: jason.batingan1@gmail.com