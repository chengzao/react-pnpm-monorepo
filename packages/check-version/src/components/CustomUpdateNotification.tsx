// src/components/CustomUpdateNotification.tsx
import React from 'react';
import type { NotificationComponentProps } from './UpdateChecker';

const CustomUpdateNotification: React.FC<NotificationComponentProps> = ({
  onReload,
  onDismiss,
  showReloadButton,
  showDismissButton,
  currentVersion,
}) => {
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        padding: '16px',
        zIndex: 10000,
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        animation: 'slideDown 0.3s ease-out',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          maxWidth: '1200px',
          margin: '0 auto',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span
            style={{
              background: 'rgba(255,255,255,0.2)',
              borderRadius: '50%',
              width: '32px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '16px',
            }}
          >
            🔄
          </span>
          <div>
            <h4 style={{ margin: 0, fontSize: '16px' }}>新版本已就绪！</h4>
            <p style={{ margin: 0, fontSize: '14px', opacity: 0.9 }}>发现新版本，立即刷新体验最新功能 (v{currentVersion} → 最新)</p>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          {showReloadButton && (
            <button
              onClick={onReload}
              style={{
                background: 'white',
                color: '#667eea',
                border: 'none',
                padding: '8px 16px',
                borderRadius: '6px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.background = '#f8f9fa';
                e.currentTarget.style.transform = 'translateY(-1px)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = 'white';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              立即刷新
            </button>
          )}

          {showDismissButton && (
            <button
              onClick={onDismiss}
              style={{
                background: 'transparent',
                color: 'white',
                border: '1px solid rgba(255,255,255,0.3)',
                padding: '8px 16px',
                borderRadius: '6px',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = 'transparent';
              }}
            >
              稍后提醒
            </button>
          )}
        </div>
      </div>

      <style>{`
        @keyframes slideDown {
          from {
            transform: translateY(-100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

export default CustomUpdateNotification;
