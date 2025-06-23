# BACKEND

## BACKEND PROJECT SETUP
```
mkdir backend
cd backend
npm init -y
npm install express mongoose cors dotenv bcryptjs jsonwebtoken express-validator
npm install --save-dev nodemon
```

### FOLDER STRUCTURE
```
backend/
├── config/
│   └── db.js
├── controllers/
│   ├── authController.js
│   ├── milestoneController.js
│   └── tipController.js
├── models/
│   ├── User.js
│   ├── Milestone.js
│   └── Tip.js
├── routes/
│   ├── authRoutes.js
│   ├── milestoneRoutes.js
│   └── tipRoutes.js
├── middlewares/
│   └── auth.js
├── .env
└── server.js
```
