import React from 'react';
import { FileText, ArrowLeft } from 'lucide-react';
import { useDarkMode } from '../hooks/useDarkMode';

const TermsOfService: React.FC = () => {
  const { darkMode } = useDarkMode();

  return (
    <div className={`app ${darkMode ? 'dark' : 'light'}`}>
      <div className="policy-page">
        <div className="policy-container">
          <button onClick={() => window.history.back()} className="policy-back-btn">
            <ArrowLeft size={20} />
            <span>Back</span>
          </button>

          <div className="policy-header">
            <div className="policy-icon-wrapper terms">
              <FileText size={32} />
            </div>
            <div className="policy-header-text">
              <h1>Terms of Service</h1>
              <p>Last updated: October 10, 2025</p>
            </div>
          </div>

          <div className="policy-content-card">
            <div className="policy-section">
              <h2>1. Acceptance of Terms</h2>
              <p>
                By accessing and using Mnemonic Maker Pro ("Service"), you accept and agree to be bound by the terms and provisions of this agreement. If you do not agree to these terms, please do not use our Service.
              </p>
            </div>

            <div className="policy-section">
              <h2>2. Description of Service</h2>
              <p>
                Our Service provides AI-powered tools to create, save, and manage mnemonics for educational and personal memory enhancement purposes. The Service includes:
              </p>
              <ul>
                <li>AI-powered mnemonic generation in multiple formats</li>
                <li>Personal account for saving and organizing mnemonics</li>
                <li>Search and categorization features</li>
                <li>Cloud storage of your created content</li>
              </ul>
            </div>

            <div className="policy-section">
              <h2>3. User Accounts</h2>
              <p>To access certain features of the Service, you must create an account. You agree to:</p>
              <ul>
                <li>Provide accurate and complete registration information</li>
                <li>Maintain the security of your password and account</li>
                <li>Notify us immediately of any unauthorized use of your account</li>
                <li>Accept responsibility for all activities that occur under your account</li>
              </ul>
            </div>

            <div className="policy-section">
              <h2>4. User Content</h2>
              <p>
                You retain all rights to the content you create using our Service. By using the Service, you grant us a limited license to store, display, and process your content solely for the purpose of providing the Service to you. We will not share your content with third parties without your consent.
              </p>
            </div>

            <div className="policy-section">
              <h2>5. Acceptable Use</h2>
              <p>You agree not to use the Service to:</p>
              <ul>
                <li>Violate any applicable laws or regulations</li>
                <li>Infringe on intellectual property rights of others</li>
                <li>Transmit harmful or malicious code</li>
                <li>Harass, abuse, or harm other users</li>
                <li>Attempt to gain unauthorized access to the Service</li>
                <li>Use the Service for commercial purposes without permission</li>
              </ul>
            </div>

            <div className="policy-section">
              <h2>6. Service Availability</h2>
              <p>
                We strive to maintain the Service's availability but do not guarantee uninterrupted access. We reserve the right to modify, suspend, or discontinue the Service at any time without prior notice.
              </p>
            </div>

            <div className="policy-section">
              <h2>7. Limitation of Liability</h2>
              <p>
                The Service is provided "as is" without warranties of any kind. We are not liable for any damages arising from your use of the Service, including but not limited to direct, indirect, incidental, or consequential damages.
              </p>
            </div>

            <div className="policy-section">
              <h2>8. Changes to Terms</h2>
              <p>
                We reserve the right to modify these terms at any time. We will notify users of significant changes via email or through the Service. Your continued use of the Service after changes constitutes acceptance of the new terms.
              </p>
            </div>

            <div className="policy-section">
              <h2>9. Contact Information</h2>
              <p>If you have any questions about these Terms of Service, please contact us:</p>
              <div className="policy-contact-box">
                <p><strong>Email:</strong> support@mnemonicmaker.com</p>
                <p><strong>Website:</strong> www.mnemonicmaker.com/contact</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
