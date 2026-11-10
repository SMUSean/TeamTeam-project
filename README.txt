# Woodland Conservation Site

A full-stack web application for promoting woodland conservation, biodiversity awareness, and community engagement in the Saint Margaret's Bay Area. This platform combines educational resources, interactive galleries, and conservation initiatives into a modern, accessible web experience.

![Woodland Conservation](public/fern-leaves.jpg)

## 🌿 Project Overview

The Woodland Conservation Site is a React-based web application designed to:
- Educate visitors about local flora, fauna, and funga
- Provide a community gallery for sharing nature photography
- Promote sustainable practices and natural burial options
- Facilitate community engagement through contact forms and inquiries
- Offer accessible features like text-to-speech for all users

## ✨ Features

### 🖼️ Interactive Gallery
- **Image Upload System**: Users can upload nature photos with OTP email verification
- **Admin Approval Workflow**: Images are stored in unapproved folder until verified
- **Public Gallery Display**: Verified images are displayed in a beautiful grid layout
- **Drag & Drop Interface**: Built with `@hello-pangea/dnd` for intuitive organization

### 🌳 Educational Pages
- **Home**: Hero section with text-to-speech functionality and conservation overview
- **Ecosystem**: Information about local ecosystems and biodiversity
- **Fauna/Flora/Funga**: Detailed information about local species
- **Natural Burial**: Sustainable burial practices and options
- **About & Contact**: Organization information and inquiry forms

### 📧 Communication Features
- **OTP Email Verification**: Secure verification using Nodemailer
- **Contact Form Confirmation**: Automated email responses to inquiries
- **Rate Limiting**: Protection against spam with IP-based rate limiting

### ♿ Accessibility
- **Text-to-Speech**: Built-in speech synthesis for all content sections
- **Murf AI Integration**: Professional voice synthesis for key content
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Dark/Light Mode**: Theme switching for user preference

## 🛠️ Tech Stack

### Frontend
- **React 19** with Vite for fast development and building
- **Tailwind CSS 4** for utility-first styling
- **React Router DOM** for client-side routing
- **React Icons** for consistent iconography
- **@hello-pangea/dnd** for drag-and-drop functionality
- **Axios** for HTTP requests

### Backend
- **Express.js** server with RESTful API
- **Multer** for file upload handling
- **CORS** for cross-origin resource sharing
- **Body-parser** for request parsing

### Development Tools
- **ESLint** & **Stylelint** for code quality
- **PostCSS** & **Autoprefixer** for CSS processing
- **Concurrently** for running multiple processes
- **Vite** for fast development server and building

## 📁 Project Structure

```
SoftwareEngineering/
├── src/
│   ├── Components/          # Reusable UI components
│   │   ├── ImageCard.jsx    # Gallery image card
│   │   ├── navbar.jsx       # Navigation and footer
│   │   ├── UploadSection.jsx # Image upload interface
│   │   ├── VerifiedGallery.jsx # Gallery display
│   │   └── Weather.jsx      # Weather information
│   ├── pages/               # Page components
│   │   ├── Home.jsx         # Landing page
│   │   ├── About.jsx        # About us page
│   │   ├── Contact.jsx      # Contact form
│   │   ├── Ecosystem.jsx    # Ecosystem information
│   │   ├── FaunaFloraFunga.jsx # Species information
│   │   ├── Gallery.jsx      # Main gallery page
│   │   ├── NaturalBurial.jsx # Burial practices
│   │   └── Ecommerce.jsx    # E-commerce
│   ├── assets/              # Static images and resources
│   ├── App.jsx              # Main app component with routing
│   └── main.jsx             # Application entry point
├── public/                  # Public assets
├── gallery/                 # Image storage
│   ├── approved/           # Verified public images
│   └── unapproved/         # Pending verification images
├── server.cjs              # Express backend server
├── package.json            # Dependencies and scripts
└── configuration files     # Vite, Tailwind, ESLint, etc.
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm 11.6.0+
- Git for version control

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/RedactedWoodlandProject/SoftwareEngineering.git
   cd SoftwareEngineering
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```
   This starts both the frontend (Vite) and backend (Express) concurrently.

## 📝 Available Scripts

- `npm run dev` - Start development server (frontend + backend)
- `npm run build` - Build for production
- `npm run lint` - Run ESLint for code quality
- `npm run preview` - Preview production build locally

## 🔧 Configuration

### Backend Server
The Express server (`server.cjs`) provides:
- Image upload endpoints (`/api/gallery/uploads`)
- OTP verification (`/send-otp`, `/verify-otp`)
- Contact form confirmation (`/send-confirmation`)
- Static file serving for approved images

### Frontend Configuration
- **Vite**: Fast development and optimized builds
- **Tailwind CSS**: Custom configuration in `tailwind.config.js`
- **ESLint**: Code quality rules in `eslint.config.js`
- **PostCSS**: CSS processing with autoprefixer

## 📸 Gallery Features

### Uploading Images
1. Navigate to the Gallery page
2. Click "Upload Images" button
3. Select images (JPG, PNG, WebP supported)
4. Enter email for OTP verification
5. Verify OTP sent to your email
6. Images await admin approval

### Image Approval Process
1. Uploaded images go to `/gallery/unapproved/`
2. Administrators can move approved images to `/gallery/approved/`
3. Approved images are publicly accessible via the gallery

## 🧪 Testing

### Code Quality
- ESLint configuration follows React best practices
- Stylelint ensures consistent CSS styling
- TypeScript definitions available for type safety

### Browser Compatibility
- Modern browsers with ES6+ support
- Responsive design tested on mobile, tablet, and desktop
- Accessibility features tested with screen readers

### Development Guidelines
- Follow existing code style and ESLint rules
- Add comments for complex logic
- Update documentation for new features
- Test changes thoroughly before submitting

### Technologies Used
- React Documentation: https://reactjs.org/
- Tailwind CSS: https://tailwindcss.com/
- Vite: https://vitejs.dev/
- Express.js: https://expressjs.com/

## 🔮 Future Enhancements

- [ ] User authentication and profiles
- [ ] Admin dashboard for image approval
- [ ] E-commerce integration for conservation products
- [ ] Interactive maps of conservation areas
- [ ] Mobile app version using React Native
- [ ] Database integration (MongoDB/PostgreSQL)
- [ ] Analytics dashboard for engagement metrics

*"Preserving nature today for a sustainable tomorrow."*
### Acknowledgement
Several images on the website have been sourced from:
(1) "Natural History of the French Village Conservation Woodland
A Report to the French Village Conservation Woodland Committee
by David Patriquin, Jess Lewis, Livy Fraser, Liam Holwell, Rohan Kariyawansa.  Nov. 2021"
AND
(2) iNaturalist.org.

The images are being used for education exclusively and will be individually cited before the general public views them.

