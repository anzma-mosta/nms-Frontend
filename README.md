# 🎓 WAKP Academy - Advanced Educational Platform

<div dir="rtl">

### أكاديمية WAKP - منصة تعليمية متكاملة
منصة تعليمية حديثة مصممة لتقديم تجربة تعليمية متميزة، تدعم تعدد اللغات والسمات البصرية، وتوفر أدوات إدارة شاملة للطلاب والمحاضرين والمديرين.

</div>

---

## 🚀 Key Features

### 💻 User Experience
- **Multi-language Support**: Full Arabic (RTL) and English (LTR) support with automatic direction switching.
- **Dynamic Theming**: Elegant Dark and Light modes with persistent user preferences.
- **Responsive Design**: Optimized for all devices using Tailwind CSS 4.0.
- **Modern UI/UX**: Smooth transitions and animations powered by Framer Motion.

### 📚 Learning Management
- **Comprehensive Dashboards**: Tailored experiences for Students, Parents, and Administrators.
- **Course Catalog**: Advanced filtering and search for courses and instructors.
- **Interactive Lessons**: Structured lesson content with progress tracking.
- **Assessment System**: Integrated assignments and exams module.
- **Communication Hub**: Built-in messaging and reporting systems.

### 🛡️ Core Functionality
- **Secure Authentication**: Robust login and registration system with Firebase integration.
- **E-commerce Ready**: Full cart and checkout flow for course subscriptions.
- **Admin Control Panel**: Comprehensive management of users, payments, and educational content.

---

## 🛠️ Tech Stack

| Category | Technology |
| :--- | :--- |
| **Frontend Framework** | React 18 with TypeScript |
| **Build Tool** | Vite (Rolldown) |
| **State Management** | Redux Toolkit |
| **Data Fetching** | TanStack Query (React Query) v5 |
| **Styling** | Tailwind CSS 4.0, Framer Motion |
| **Form Handling** | React Hook Form & Zod Validation |
| **Internationalization** | i18next |
| **Backend/Auth** | Firebase |
| **Testing** | Vitest & React Testing Library |
| **UI Components** | Lucide Icons, SweetAlert2 |

---

## 📂 Project Structure

```bash
src/
├── components/     # Reusable UI components (Atoms, Molecules, Organisms)
├── features/       # Business logic & components grouped by feature (Auth, Dashboard)
├── pages/          # Application views/routes
├── hooks/          # Custom React hooks
├── services/       # API services and Firebase configuration
├── store/          # Redux store and slices
├── i18n/           # Internationalization configurations
├── providers/      # Context providers (Theme, Auth, Query)
└── utils/          # Helper functions and constants
```

---

## ⚙️ Getting Started

### Prerequisites
- Node.js (Latest LTS recommended)
- npm or yarn

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/anzma-mosta/wakp-Frontend.git
   ```
2. Install dependencies:
   ```bash
   npm install --legacy-peer-deps
   ```

### Development
Run the development server:
```bash
npm run dev
```

### Production
Build the project for production:
```bash
npm run build
```

### Testing
Execute the test suite:
```bash
npm run test
```

---

## �️ Development Tools
- **Locator.js**: Enabled in development for quick code navigation (Alt+Click).
- **Prettier & ESLint**: Configured for consistent code style and quality.

---

## 🔗 Links
- **Live Preview**: [vercel](https://nms-frontend-rho.vercel.app)
- **Repository**: [GitHub](https://github.com/anzma-mosta/wakp-Frontend.git)

---

<div align="center">
Made with ❤️ by WAKP Academy Team
</div>
