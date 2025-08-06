# 🐱 Cat Image Voting App

A beautiful, responsive web application where users can browse random cat photos from TheCatAPI and cast votes on their favorites. Built with React 18, TypeScript, Tailwind CSS, and Zustand for state management.

## ✨ Features

- **🐱 Random Cat Gallery**: Browse beautiful cat images from TheCatAPI
- **🗳️ Voting System**: Upvote or downvote cats with instant feedback
- **📊 Score Tracking**: See real-time scores after voting
- **👤 Persistent Identity**: Your votes are tracked across sessions
- **🌙 Dark Mode**: Toggle between light and dark themes
- **📱 Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **🔄 Refresh Functionality**: Get new batches of cat images
- **📋 My Votes Tab**: View your complete voting history
- **🔔 Toast Notifications**: Real-time error and success messages

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn
- TheCatAPI key (free at https://thecatapi.com/)

### Installation

1. **Clone the repository**

   ```bash
   git clone <your-repo-url>
   cd cat-app
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   ```bash
   cp .env.example .env
   ```

   Edit `.env` and add your TheCatAPI key:

   ```env
   VITE_CAT_API_KEY=your_actual_api_key_here
   ```

4. **Start the development server**

   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173`

## 🛠️ Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build app
- `npm run preview` - Preview build
- `npm run predeploy` - Build in production mode
- `npm run deploy` - Deploy using GH Pages
- `npm run lint` - Run ESLint
- `npm run test` - Run unit tests

## 🏗️ Tech Stack

- **Framework**: React 18 + Vite
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS + Headless UI
- **State Management**: Zustand
- **HTTP Client**: Axios
- **Icons**: Heroicons
- **Testing**: Vitest + Testing Library

## 📁 Project Structure

```
src/
├── components/          # React components
│   ├── CatCard.tsx     # Individual cat image card
│   ├── Gallery.tsx     # Main gallery view
│   ├── Header.tsx      # Navigation header
│   ├── LoadingSpinner.tsx
│   ├── MyVotes.tsx     # User voting history
│   └── Toast.tsx       # Notification component
├── services/           # API services
│   └── api.ts         # TheCatAPI integration
├── store/             # State management
│   └── useAppStore.ts # Zustand store
├── types/             # TypeScript definitions
│   └── index.ts       # App interfaces
├── App.tsx            # Main app component
└── index.css          # Global styles
```

## 🔧 Configuration

### TheCatAPI Setup

1. Visit [TheCatAPI](https://thecatapi.com/)
2. Sign up for a free account
3. Get your API key from the dashboard
4. Add it to your `.env` file

### Environment Variables

| Variable           | Description        | Required |
| ------------------ | ------------------ | -------- |
| `VITE_CAT_API_KEY` | Your TheCatAPI key | Yes      |

## 🎯 Core Functionality

### Gallery View

- Displays a responsive grid of random cat images
- Each card shows breed information and temperament
- Up/down voting buttons with visual feedback
- Real-time score display after voting

### Voting System

- One vote per image per user
- Votes are persisted via TheCatAPI
- Instant visual feedback
- Score calculation and display

### My Votes Tab

- Complete voting history
- Vote type indicators (up/down)
- Timestamp information
- Responsive grid layout

### Dark Mode

- System preference detection
- Manual toggle in header
- Persistent across sessions
- Smooth transitions

## 🧪 Testing

Run the test suite:

```bash
npm run test
```

## 📦 Building for Production

```bash
npm run build
```

The built files will be in the `dist/` directory, ready for deployment.

## 🌐 Deployment

### Github Pages

1. Open a terminal and navigate to root project dir
2. Configure environment variables in relevant .env file. Please refer to .env.example for examples
3. Run `$ npm run predeploy`
4. Run `$ npm run deploy`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details

## 🙏 Acknowledgments

- [TheCatAPI](https://thecatapi.com/) for providing the cat images and voting API
- [Tailwind CSS](https://tailwindcss.com/) for the beautiful styling system
- [Heroicons](https://heroicons.com/) for the amazing icons
- [Zustand](https://github.com/pmndrs/zustand) for simple state management

---

**Note**: This app requires a valid TheCatAPI key to function. Get your free key at https://thecatapi.com/
