import React, { useState } from 'react';
import { Brain, Zap, RefreshCw, Lightbulb, BookOpen, Sparkles as SparklesIcon, Target } from 'lucide-react';
import { MnemonicMode } from '../types';
import { generateMnemonic } from '../services/openRouterService';
import ModeSelector from '../components/ModeSelector';
import InputSection from '../components/InputSection';
import ResultCard from '../components/ResultCard';
import ThemeToggle from '../components/ThemeToggle';
import ErrorMessage from '../components/ErrorMessage';

const MnemonicMakerPage: React.FC = () => {
  const [darkMode, setDarkMode] = useState(true);
  const [input, setInput] = useState('');
  const [mode, setMode] = useState<MnemonicMode>('acrostic');
  const [result, setResult] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState('');

  const handleGenerate = async () => {
    if (!input.trim()) {
      setError('Please enter text to memorize');
      return;
    }

    setIsGenerating(true);
    setError('');
    setResult('');

    try {
      const response = await generateMnemonic(input, mode);
      setResult(response.content);
    } catch (err) {
      console.error('Error generating mnemonic:', err);
      setError(err instanceof Error ? err.message : 'Failed to generate mnemonic. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !isGenerating) {
      handleGenerate();
    }
  };

  return (
    <div className={`app ${darkMode ? 'dark' : 'light'}`}>
      <div className="container">
        <ThemeToggle darkMode={darkMode} onToggle={() => setDarkMode(!darkMode)} />

        {/* Main Header */}
        <div className="main-header">
          <div className="icon-wrapper">
            <Brain size={64} />
          </div>
          <h1>Mnemonic Maker Pro</h1>
          <p className="subtitle">AI-Powered Memory Enhancement - Memorize Faster & Better</p>
        </div>

        {/* Main Card */}
        <div className="main-card">
          <ModeSelector selectedMode={mode} onModeChange={setMode} />
          
          <InputSection
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
          />

          <ErrorMessage message={error} />

          {/* Generate Button */}
          <button
            onClick={handleGenerate}
            disabled={!input.trim() || isGenerating}
            className="generate-btn"
          >
            {isGenerating ? (
              <>
                <RefreshCw size={20} className="spinning" />
                Generating with AI...
              </>
            ) : (
              <>
                <Zap size={20} />
                Generate Mnemonic
              </>
            )}
          </button>

          <ResultCard result={result} />
        </div>

        {/* How It Works Section */}
        <div className="info-section">
          <h2 className="section-title">
            <Target size={24} />
            How It Works
          </h2>
          <div className="info-grid">
            <div className="info-card">
              <div className="info-number">1</div>
              <h3>Enter Your Content</h3>
              <p>Input the words, letters, or concepts you want to remember</p>
            </div>
            <div className="info-card">
              <div className="info-number">2</div>
              <h3>AI Processing</h3>
              <p>Our advanced AI creates multiple mnemonic options tailored to your input</p>
            </div>
            <div className="info-card">
              <div className="info-number">3</div>
              <h3>Get Results</h3>
              <p>Receive personalized memory aids that make learning effortless</p>
            </div>
          </div>
        </div>

        {/* Example Mnemonics Section */}
        <div className="info-section">
          <h2 className="section-title">
            <BookOpen size={24} />
            Example Mnemonics
          </h2>
          <div className="examples-grid">
            <div className="example-card">
              <h4>HOMES</h4>
              <p className="example-desc">Great Lakes</p>
              <p className="example-text">
                <strong>H</strong>uron, <strong>O</strong>ntario, <strong>M</strong>ichigan, <strong>E</strong>rie, <strong>S</strong>uperior
              </p>
            </div>
            <div className="example-card">
              <h4>ROY G. BIV</h4>
              <p className="example-desc">Colors of the Rainbow</p>
              <p className="example-text">
                <strong>R</strong>ed, <strong>O</strong>range, <strong>Y</strong>ellow, <strong>G</strong>reen, <strong>B</strong>lue, <strong>I</strong>ndigo, <strong>V</strong>iolet
              </p>
            </div>
            <div className="example-card">
              <h4>PEMDAS</h4>
              <p className="example-desc">Order of Operations</p>
              <p className="example-text">
                <strong>P</strong>lease <strong>E</strong>xcuse <strong>M</strong>y <strong>D</strong>ear <strong>A</strong>unt <strong>S</strong>ally
              </p>
            </div>
            <div className="example-card">
              <h4>FANBOYS</h4>
              <p className="example-desc">Coordinating Conjunctions</p>
              <p className="example-text">
                <strong>F</strong>or, <strong>A</strong>nd, <strong>N</strong>or, <strong>B</strong>ut, <strong>O</strong>r, <strong>Y</strong>et, <strong>S</strong>o
              </p>
            </div>
          </div>
        </div>

        {/* Memory Tips Section */}
        <div className="info-section">
          <h2 className="section-title">
            <Lightbulb size={24} />
            Memory Tips & Techniques
          </h2>
          <div className="tips-grid">
            <div className="tip-card">
              <SparklesIcon size={32} className="tip-icon" />
              <h3>Association</h3>
              <p>Connect new information to things you already know. The brain remembers connections better than isolated facts.</p>
            </div>
            <div className="tip-card">
              <Brain size={32} className="tip-icon" />
              <h3>Visualization</h3>
              <p>Create vivid mental images. The more unusual or exaggerated, the more memorable they become.</p>
            </div>
            <div className="tip-card">
              <RefreshCw size={32} className="tip-icon" />
              <h3>Repetition</h3>
              <p>Review your mnemonics regularly using spaced repetition. Practice makes permanent!</p>
            </div>
            <div className="tip-card">
              <Zap size={32} className="tip-icon" />
              <h3>Rhythm & Rhyme</h3>
              <p>Use rhythm, rhymes, and music for better recall. Our brains love patterns and melodies.</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="footer">
          <div className="footer-item">
            <div className="pulse-dot"></div>
            <span>AI-Powered</span>
          </div>
          <div className="footer-item">
            <div className="pulse-dot"></div>
            <span>Multiple Models</span>
          </div>
          <div className="footer-item">
            <div className="pulse-dot"></div>
            <span>Auto-Fallback</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MnemonicMakerPage;