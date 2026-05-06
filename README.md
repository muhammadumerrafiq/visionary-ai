# 👁️ Visionary AI: Real-Time Neural HUD

Visionary AI is a state-of-the-art object detection dashboard that brings a "Cyber-HUD" experience to the browser. Powered by **TensorFlow.js** and the **COCO-SSD** model, it provides real-time analysis of video streams with high-performance bounding box tracking and system diagnostics.

<p align="center">
  <img src="https://img.shields.io/badge/AI-Object%20Detection-00ff41?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Tech-TensorFlow.js-FF6F00?style=for-the-badge&logo=tensorflow" />
  <img src="https://img.shields.io/badge/UI-Cyberpunk%20HUD-black?style=for-the-badge" />
</p>

---

## ✨ Features

- **🎯 Real-Time Detection**: Instantly identifies over 80 classes of objects with confidence scoring.
- **📟 Matrix HUD Interface**: A custom-built, immersive "Heads-Up Display" with scanning animations and system logs.
- **⚡ High Performance**: Optimized rendering using HTML5 Canvas and asynchronous neural processing.
- **📊 Live Analytics**: Real-time FPS tracking and detection logs.
- **Responsive Design**: Fully immersive full-screen experience.

---

## 🛠️ Tech Stack

- **Framework**: React (Vite)
- **Engine**: TensorFlow.js
- **Model**: COCO-SSD
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **Styling**: Custom CSS (HUD Design System)

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18+)
- A webcam (for detection)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/muhammadumerrafiq/visionary-ai.git
   cd visionary-ai
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

---

## 🧬 How It Works

Visionary AI utilizes the **COCO-SSD** model, which is a Single Shot MultiBox Detector designed for speed and accuracy in browser environments. 

1. **Webcam Stream**: Captures video data via `getUserMedia`.
2. **Preprocessing**: Frames are passed to TensorFlow.js for tensor conversion.
3. **Inference**: The COCO-SSD model predicts object classes and bounding box coordinates.
4. **HUD Rendering**: Results are drawn on a transparent canvas overlaying the video stream with custom-styled HUD elements.

---

## 📜 License

Distributed under the MIT License. See `LICENSE` for more information.

---

<p align="center">
  Created with ❤️ by <a href="https://github.com/muhammadumerrafiq">Muhammad Umer Rafiq</a>
</p>
