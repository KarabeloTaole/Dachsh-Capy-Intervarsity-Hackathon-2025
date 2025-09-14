# Setup Instructions

Follow the steps below to set up and run the DC Savings project.

---

## 📦 Requirements

Before getting started, ensure you have the following installed on your system:

- **Node.js** v18+ (recommended: latest LTS version)
- **npm** (comes with Node.js) or **yarn**
- **Git** for cloning the repository

You can verify your installations by running:
```bash
node --version
npm --version
git --version
```

---

## ⚙️ Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/KarabeloTaole/Dachsh-Capy-Intervarsity-Hackathon-2025.git
   cd Dachsh-Capy-Intervarsity-Hackathon-2025
   ```

2. **Navigate to the project directory**
   ```bash
   cd src/dc-savings
   ```

3. **Install dependencies**
   ```bash
   npm install
   ```
   
   Or if you prefer yarn:
   ```bash
   yarn install
   ```

---

## ▶️ Running the Project

1. **Start the development server**
   
   Make sure you're in the `src/dc-savings` directory, then run:
   ```bash
   npm run dev
   ```
   
   Or with yarn:
   ```bash
   yarn dev
   ```

2. **Access the application**
   
   Once the development server starts, open your browser and navigate to:
   ```
   http://localhost:3000
   ```
   (The exact port may vary - check the terminal output for the correct URL)

---

## 🛠️ Tech Stack

This project is built with:
- **React** - Frontend framework
- **Tailwind CSS** - Utility-first CSS framework
- **Vite** (assumed) - Build tool and development server

---

## 📁 Project Structure

```
Dachsh-Capy-Intervarsity-Hackathon-2025/
└── src/                         # Main project directory
    ├── dc-savings/              # React app configuration
    │   ├── node_modules/        # Dependencies
    │   ├── public/              # Public static files
    │   │   └── vite.svg         # Vite logo
    │   └── package.json         # Project dependencies & scripts
    └── src/                     # Source code
        ├── assets/              # Static assets (images, icons, etc.)
        ├── components/          # React components
        │   ├── Challenge.jsx    # Challenge component
        │   ├── Dashboard.jsx    # Dashboard component
        │   ├── GlobalState.jsx  # Global state management
        │   ├── Leaderboards.jsx # Leaderboards component
        │   ├── Login.jsx        # Login component
        │   ├── Navigation.jsx   # Navigation component
        │   ├── Profile.jsx      # Profile component
        │   └── SocialFeed.jsx   # Social feed component
        ├── App.css              # App-specific styles
        ├── App.jsx              # Main App component
        ├── index.css            # Global styles
        ├── main.jsx             # Entry point
        └── .gitignore           # Git ignore rules
```

---

## 🚨 Troubleshooting

### Common Issues:

**Port already in use:**
- If port 5173 is busy, Vite will automatically try the next available port
- Check the terminal output for the correct URL

**Dependencies issues:**
- Try deleting `node_modules` and `package-lock.json`, then run `npm install` again
- Ensure you're using Node.js v18 or higher

**Path issues:**
- Make sure you're running `npm run dev` from the `src/dc-savings` directory, not the root

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📞 Support

If you encounter any issues during setup, please:
1. Check the troubleshooting section above
2. Open an issue on the GitHub repository
3. Contact the development team
