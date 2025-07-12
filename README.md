# 🌍 Travaura - Modern Travel Platform

A full-stack web application built with the MERN stack for discovering and sharing amazing travel destinations worldwide.

## ✨ Features

### 🏠 **Property Listings**
- Create, read, update, and delete travel listings
- Image upload with Cloudinary integration
- Detailed property information with pricing
- Location-based filtering and search

### 🔍 **Advanced Search & Filtering**
- Real-time search across titles, descriptions, and locations
- Category-based filtering (12 different categories)
- Combined search and filter functionality
- Interactive filter UI with active states

### 👤 **User Authentication**
- Secure user registration and login
- Session-based authentication with MongoDB
- User-specific listings and reviews
- Authorization middleware for resource protection

### ⭐ **Review System**
- User-generated reviews with ratings (1-5 stars)
- Review management (create, delete)
- Author verification for review ownership
- Populated review data with user information

### 🗺️ **Geocoding Integration**
- Automatic coordinate generation from location names
- OpenCage Geocoding API integration
- Interactive maps with Leaflet.js
- Fallback coordinates for missing data

### 📱 **Responsive Design**
- Mobile-first responsive design
- Bootstrap 5 for modern UI components
- Font Awesome icons throughout
- Smooth animations and transitions

## 🛠️ Tech Stack

### **Backend**
- **Node.js** (v22.11.0) with **Express.js** framework
- **MongoDB** with **Mongoose** ODM
- **Passport.js** for authentication (Local Strategy)
- **Express-session** with **MongoStore** for session management
- **Multer** with **Cloudinary** for file uploads
- **Axios** for external API calls

### **Frontend**
- **EJS** templating engine with **EJS-Mate** for layouts
- **Bootstrap 5** for responsive UI components
- **Font Awesome** for icons
- **Leaflet.js** for interactive maps
- **Custom CSS** for styling and animations

### **External Services**
- **Cloudinary** for image storage and optimization
- **OpenCage Geocoding API** for location coordinates
- **MongoDB Atlas** for database hosting

## 🚀 Getting Started

### Prerequisites
- Node.js (v22.11.0 or higher)
- MongoDB Atlas account
- Cloudinary account
- OpenCage API key



## 📁 Project Structure

```
travaura/
├── app.js                 # Main application file
├── package.json           # Dependencies and scripts
├── .env                   # Environment variables
├── .gitignore            # Git ignore rules
├── models/               # Database models
│   ├── listing.js        # Listing schema
│   ├── review.js         # Review schema
│   └── user.js           # User schema
├── routes/               # Express routes
│   ├── listing.js        # Listing CRUD operations
│   ├── review.js         # Review operations
│   └── user.js           # Authentication routes
├── views/                # EJS templates
│   ├── layouts/          # Layout templates
│   ├── listings/         # Listing views
│   ├── users/            # User views
│   └── includes/         # Reusable components
├── public/               # Static assets
│   ├── css/             # Stylesheets
│   └── js/              # Client-side JavaScript
├── utils/                # Utility functions
├── middleware.js         # Custom middleware
├── cloudConfig.js        # Cloudinary configuration
└── seed.js              # Database seeding script
```

## 🎯 Key Features Explained

### **Authentication System**
- Uses Passport.js with Local Strategy
- Session-based authentication with MongoDB store
- Secure password hashing with passport-local-mongoose
- Authorization middleware for resource protection

### **Search & Filtering**
- Real-time search with MongoDB regex queries
- Category-based filtering with 12 predefined categories
- Combined search and filter functionality
- URL parameter management for bookmarkable filters

### **File Upload System**
- Multer middleware for file handling
- Cloudinary integration for cloud storage
- Automatic image optimization and compression
- Support for multiple image formats

### **Geocoding Integration**
- OpenCage Geocoding API for location coordinates
- Automatic coordinate generation from location names
- Interactive maps with Leaflet.js
- Fallback coordinates for missing data

## 🔧 API Endpoints

### **Listings**
- `GET /listings` - Display all listings (with search/filter)
- `GET /listings/new` - Show create form
- `POST /listings` - Create new listing
- `GET /listings/:id` - Show specific listing
- `GET /listings/:id/edit` - Show edit form
- `PUT /listings/:id` - Update listing
- `DELETE /listings/:id` - Delete listing

### **Reviews**
- `POST /listings/:id/reviews` - Create review
- `DELETE /listings/:id/reviews/:reviewId` - Delete review

### **Users**
- `GET /signup` - Registration page
- `POST /signup` - User registration
- `GET /login` - Login page
- `POST /login` - User authentication
- `GET /logout` - User logout

## 🎨 UI/UX Features

### **Responsive Design**
- Mobile-first approach with Bootstrap 5
- Responsive navigation with hamburger menu
- Adaptive layouts for different screen sizes
- Touch-friendly interface elements



## 🔒 Security Features

- **Session Management**: Secure session storage with MongoDB
- **Password Security**: Hashed passwords with passport-local-mongoose
- **Authorization**: Resource-level access control
- **Input Validation**: Form validation and sanitization
- **File Upload Security**: Secure file handling with Multer

## 🚀 Deployment

### **Environment Variables**
Ensure all required environment variables are set:
- Database connection string
- Cloudinary credentials
- OpenCage API key
- Session secret

### **Production Considerations**
- Use environment variables for sensitive data
- Enable HTTPS in production
- Set up proper logging and monitoring
- Configure database indexes for performance
- Implement rate limiting and security headers

## 👨‍💻 Author

**Varalakshmi** - Full Stack Developer

## 🙏 Acknowledgments

- Bootstrap for responsive UI components
- Font Awesome for beautiful icons
- Leaflet.js for interactive maps
- Cloudinary for image management
- OpenCage for geocoding services

---

**Travaura** - Where every journey begins! 🌍✈️ 
