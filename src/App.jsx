import React, { useRef, useEffect, useState } from 'react';
import * as tf from '@tensorflow/tfjs';
import * as cocoSsd from '@tensorflow-models/coco-ssd';
import { Activity, Shield, Cpu, Zap, Maximize2 } from 'lucide-react';
import './App.css';

function App() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [model, setModel] = useState(null);
  const [objects, setObjects] = useState([]);
  const [isModelLoading, setIsModelLoading] = useState(true);
  const [fps, setFps] = useState(0);

  // Load Model
  useEffect(() => {
    const loadModel = async () => {
      try {
        await tf.ready();
        const loadedModel = await cocoSsd.load();
        setModel(loadedModel);
        setIsModelLoading(false);
      } catch (err) {
        console.error("Model load failed", err);
      }
    };
    loadModel();
  }, []);

  // Setup Webcam
  useEffect(() => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({
        audio: false,
        video: { facingMode: 'user' }
      }).then(stream => {
        videoRef.current.srcObject = stream;
        videoRef.current.onloadedmetadata = () => {
          videoRef.current.play();
        };
      });
    }
  }, []);

  // Detection Loop
  useEffect(() => {
    let animationFrameId;
    let lastTime = performance.now();

    const detectFrame = async () => {
      if (model && videoRef.current && videoRef.current.readyState === 4) {
        const predictions = await model.detect(videoRef.current);
        setObjects(predictions);
        renderPredictions(predictions);
        
        const now = performance.now();
        setFps(Math.round(1000 / (now - lastTime)));
        lastTime = now;
      }
      animationFrameId = requestAnimationFrame(detectFrame);
    };

    detectFrame();
    return () => cancelAnimationFrame(animationFrameId);
  }, [model]);

  const renderPredictions = (predictions) => {
    const ctx = canvasRef.current.getContext('2d');
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    
    predictions.forEach(prediction => {
      const [x, y, width, height] = prediction.bbox;
      
      // Draw Bounding Box
      ctx.strokeStyle = '#00ff41';
      ctx.lineWidth = 2;
      ctx.strokeRect(x, y, width, height);
      
      // Draw Label Background
      ctx.fillStyle = 'rgba(0, 255, 65, 0.8)';
      const textWidth = ctx.measureText(prediction.class).width;
      ctx.fillRect(x, y - 25, textWidth + 10, 25);
      
      // Draw Text
      ctx.fillStyle = '#000';
      ctx.font = '14px JetBrains Mono';
      ctx.fillText(
        `${prediction.class} (${Math.round(prediction.score * 100)}%)`,
        x + 5, y - 7
      );
      
      // Corner Brackets for detail
      ctx.beginPath();
      ctx.moveTo(x, y + 20); ctx.lineTo(x, y); ctx.lineTo(x + 20, y);
      ctx.stroke();
    });
  };

  return (
    <div className="hud-container">
      <div className="hud-border">
        <div className="hud-corner top-left"></div>
        <div className="hud-corner top-right"></div>
        <div className="hud-corner bottom-left"></div>
        <div className="hud-corner bottom-right"></div>
      </div>

      <header style={{ display: 'flex', justifyContent: 'space-between', zIndex: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <Shield color="#00ff41" size={32} />
          <div>
            <h1 style={{ fontSize: '1.2rem', letterSpacing: '4px' }}>VISIONARY_OS v1.0</h1>
            <p style={{ fontSize: '0.7rem', color: 'var(--hud-green)' }}>NEURAL LINK: ESTABLISHED</p>
          </div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <p style={{ fontSize: '0.8rem' }}>SYSTEM_TIME: {new Date().toLocaleTimeString()}</p>
          <p style={{ fontSize: '0.8rem', color: 'var(--hud-green)' }}>CORE_TEMP: 42°C</p>
        </div>
      </header>

      <div className="video-wrapper">
        <video
          ref={videoRef}
          style={{ width: '100%', display: 'block' }}
          muted
        />
        <canvas
          ref={canvasRef}
          width={900}
          height={675}
        />
        <div className="scanning-line"></div>
      </div>

      <aside className="stats-panel">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', borderBottom: '1px solid var(--hud-green)', paddingBottom: '0.5rem' }}>
          <Activity size={16} color="#00ff41" />
          <span style={{ fontSize: '0.9rem' }}>ANALYSIS_LOG</span>
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem' }}>
            <span>MODEL:</span>
            <span style={{ color: 'var(--hud-green)' }}>{isModelLoading ? 'LOADING...' : 'COCO-SSD'}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem' }}>
            <span>FPS:</span>
            <span style={{ color: 'var(--hud-green)' }}>{fps}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem' }}>
            <span>DETECTIONS:</span>
            <span style={{ color: 'var(--hud-green)' }}>{objects.length}</span>
          </div>
        </div>

        <div style={{ marginTop: '1.5rem', fontSize: '0.7rem', color: 'var(--hud-green-dim)' }}>
          {objects.map((obj, i) => (
            <div key={i} style={{ marginBottom: '0.2rem' }}>
              [{new Date().getMilliseconds()}] OBJECT_ID_{i}: {obj.class.toUpperCase()} DETECTED
            </div>
          ))}
        </div>

        <button className="btn-hud" style={{ width: '100%', marginTop: '2rem' }}>
          Initialize Protocol
        </button>
      </aside>

      <footer style={{ marginTop: 'auto', display: 'flex', gap: '2rem', zIndex: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Cpu size={16} /> <span>CPU_USAGE: 12%</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Zap size={16} /> <span>POWER: STABLE</span>
        </div>
      </footer>
    </div>
  );
}

export default App;
