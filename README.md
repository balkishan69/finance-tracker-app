# VaultWise - Personal Finance Tracker

VaultWise is a modern, responsive web application for personal finance management, featuring real-time transaction tracking, budget management, and interactive data visualization.

- Developed a full-stack personal finance management application using React, TypeScript, and Tailwind CSS, implementing real-time transaction tracking and budget management
- Introduced responsive data visualization components using Chart.js, displaying spending trends and budget progress with interactive charts
- Implemented persistent data storage using browser's localStorage with automatic monthly data resets and state management using React Context API
- Built an intuitive dark/light theme system with Framer Motion animations for enhanced user experience and accessibility
- Integrated achievement system and savings goals tracking to gamify financial management and encourage positive financial habits

## 🌟 Features

- **Transaction Management**
  - Add and track expenses across multiple categories
  - Real-time transaction history
  - Detailed transaction insights

- **Budget Control**
  - Set and manage category-wise budgets
  - Visual progress tracking
  - Monthly budget reset automation

- **Data Visualization**
  - Interactive spending trends charts
  - Category-wise expense breakdown
  - Progress tracking visualizations

- **Achievement System**
  - Gamified financial goals
  - Unlockable achievements
  - Progress tracking

- **Additional Features**
  - Dark/Light theme support
  - Responsive design
  - Smooth animations
  - Persistent data storage
  - Monthly data management

## 🚀 Technologies Used

- React 18
- TypeScript
- Tailwind CSS
- Chart.js
- Framer Motion
- Lucide Icons
- date-fns
- Vite

## 📦 Installation

1. Clone the repository:
```bash
git clone <repo-link>

Navigate to the project directory:
cd <repository-name>

Install dependencies:
npm install

Start the development server:
npm run dev

🛠️ Development
npm run dev - Start development server
npm run build - Build for production
npm run preview - Preview production build
npm run lint - Run ESLint


🏗️ Project Structure

src/
├── components/     # React components
├── context/       # React Context providers
├── hooks/         # Custom React hooks
├── types/         # TypeScript type definitions
├── utils/         # Utility functions
└── main.tsx       # Application entry point


🔒 Local Storage
The application uses browser's localStorage for data persistence with:

- Automatic monthly data resets
- Transaction history
- Budget settings
- Achievement progress
- Theme preferences


🎨 Theming
VaultWise supports both light and dark themes:


Automatic system preference detection
Manual theme toggle
Persistent theme selection


📱 Responsive Design
The application is fully responsive and works across:
- Desktop computers
- Tablets
- Mobile devices


🤝 Contributing
Contributions are welcome! Please feel free to submit a Pull Request.
