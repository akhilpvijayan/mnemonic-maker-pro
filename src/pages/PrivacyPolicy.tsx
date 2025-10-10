import React from 'react';
import { Shield, ArrowLeft } from 'lucide-react';
import { useDarkMode } from '../hooks/useDarkMode';

const PrivacyPolicy: React.FC = () => {
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
            <div className="policy-icon-wrapper privacy">
              <Shield size={32} />
            </div>
            <div className="policy-header-text">
              <h1>Privacy Policy</h1>
              <p>Last updated: October 10, 2025</p>
            </div>
          </div>

          <div className="policy-content-card">
            <div className="policy-section">
              <h2>1. Information We Collect</h2>
              <p>We collect information that you provide directly to us when using our Service:</p>
              
              <h3>Account Information</h3>
              <ul>
                <li>Email address and password</li>
                <li>Display name (optional)</li>
                <li>Profile picture (optional)</li>
              </ul>

              <h3>User-Generated Content</h3>
              <ul>
                <li>Mnemonics you create and save</li>
                <li>Input text and preferences</li>
                <li>Favorites and organizational data</li>
              </ul>

              <h3>Usage Data</h3>
              <ul>
                <li>Device information and IP address</li>
                <li>Browser type and version</li>
                <li>Pages visited and features used</li>
                <li>Time and date of access</li>
              </ul>
            </div>

            <div className="policy-section">
              <h2>2. How We Use Your Information</h2>
              <p>We use the collected information for the following purposes:</p>
              <ul>
                <li>To provide, maintain, and improve our Service</li>
                <li>To create and manage your account</li>
                <li>To store and retrieve your saved mnemonics</li>
                <li>To personalize your experience</li>
                <li>To communicate with you about the Service</li>
                <li>To detect and prevent fraud or abuse</li>
                <li>To analyze usage patterns and improve features</li>
                <li>To comply with legal obligations</li>
              </ul>
            </div>

            <div className="policy-section">
              <h2>3. Data Storage and Security</h2>
              <p>We take the security of your data seriously:</p>
              <ul>
                <li>All data is encrypted in transit using SSL/TLS</li>
                <li>Passwords are hashed and never stored in plain text</li>
                <li>Data is stored on secure cloud servers (Firebase)</li>
                <li>Access to personal data is restricted to authorized personnel</li>
                <li>Regular security audits and updates are performed</li>
              </ul>
              <p>
                While we implement industry-standard security measures, no method of transmission over the Internet is 100% secure. We cannot guarantee absolute security.
              </p>
            </div>

            <div className="policy-section">
              <h2>4. Information Sharing</h2>
              <p>
                We do not sell, trade, or rent your personal information to third parties. We may share information only in the following circumstances:
              </p>
              <ul>
                <li><strong>Service Providers:</strong> With vendors who help us operate the Service (e.g., hosting, analytics)</li>
                <li><strong>Legal Requirements:</strong> When required by law or to protect our rights</li>
                <li><strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets</li>
                <li><strong>With Your Consent:</strong> When you explicitly authorize us to share information</li>
              </ul>
            </div>

            <div className="policy-section">
              <h2>5. Your Rights and Choices</h2>
              <p>You have the following rights regarding your personal data:</p>
              <ul>
                <li><strong>Access:</strong> Request a copy of your personal data</li>
                <li><strong>Correction:</strong> Update or correct inaccurate information</li>
                <li><strong>Deletion:</strong> Request deletion of your account and data</li>
                <li><strong>Export:</strong> Download your mnemonics and data</li>
                <li><strong>Opt-Out:</strong> Unsubscribe from marketing communications</li>
                <li><strong>Object:</strong> Object to certain processing of your data</li>
              </ul>
              <p>To exercise these rights, please contact us at privacy@mnemonicmaker.com</p>
            </div>

            <div className="policy-section">
              <h2>6. Cookies and Tracking</h2>
              <p>We use cookies and similar technologies to:</p>
              <ul>
                <li>Keep you signed in to your account</li>
                <li>Remember your preferences and settings</li>
                <li>Analyze how you use the Service</li>
                <li>Improve Service performance and user experience</li>
              </ul>
              <p>
                You can control cookie settings through your browser preferences. However, disabling cookies may limit functionality.
              </p>
            </div>

            <div className="policy-section">
              <h2>7. Data Retention</h2>
              <p>
                We retain your personal information for as long as your account is active or as needed to provide the Service. If you delete your account, we will delete your personal data within 30 days, except where we are required to retain it for legal purposes.
              </p>
            </div>

            <div className="policy-section">
              <h2>8. Children's Privacy</h2>
              <p>
                Our Service is not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13. If you believe we have collected information from a child under 13, please contact us immediately.
              </p>
            </div>

            <div className="policy-section">
              <h2>9. International Data Transfers</h2>
              <p>
                Your information may be transferred to and processed in countries other than your country of residence. These countries may have different data protection laws. By using the Service, you consent to such transfers.
              </p>
            </div>

            <div className="policy-section">
              <h2>10. Changes to Privacy Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. We will notify you of significant changes by email or through a prominent notice on the Service. Your continued use after changes indicates acceptance of the updated policy.
              </p>
            </div>

            <div className="policy-section">
              <h2>11. Contact Us</h2>
              <p>
                If you have questions or concerns about this Privacy Policy or our data practices, please contact us:
              </p>
              <div className="policy-contact-box">
                <p><strong>Email:</strong> privacy@mnemonicmaker.com</p>
                <p><strong>Website:</strong> www.mnemonicmaker.com/contact</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;