'use client';

import { useState } from 'react';

import OrbitalScene from '@/components/canvas/OrbitalScene';

const agentPills = [
  'Resume Analyzer',
  'Skill Gap Agent',
  'Interview AI',
  'Job Matching',
  'Career Intel',
] as const;

export default function OrbitalSection() {
  const [activePill, setActivePill] = useState<string | null>(null);

  return (
    <section
      style={{
        background: '#111418',
        padding: '96px 0 88px',
      }}
    >
      <div
        style={{
          maxWidth: 1280,
          margin: '0 auto',
          padding: '0 48px',
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <h2
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 'clamp(40px, 5vw, 48px)',
              fontWeight: 500,
              lineHeight: 1.1,
              color: '#faf9f5',
              margin: 0,
            }}
          >
            The Intelligence Core
          </h2>
          <p
            style={{
              marginTop: 14,
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 18,
              lineHeight: 1.5,
              color: '#9ea5ad',
            }}
          >
            Five agents. One system. Infinite readiness.
          </p>
        </div>

        <OrbitalScene />

        <div
          style={{
            marginTop: 30,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 10,
            flexWrap: 'wrap',
          }}
        >
          {agentPills.map((pill) => {
            const isActive = activePill === pill;

            return (
              <button
                key={pill}
                type="button"
                onMouseEnter={() => setActivePill(pill)}
                onMouseLeave={() => setActivePill(null)}
                style={{
                  background: '#1a1a18',
                  border: `1px solid ${isActive ? '#d4af37' : '#2a3038'}`,
                  borderRadius: 24,
                  padding: '9px 16px',
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 13,
                  fontWeight: 500,
                  color: isActive ? '#faf9f5' : '#b4bac0',
                  lineHeight: 1.2,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
              >
                {pill}
              </button>
            );
          })}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          section > * {
            padding: 0 20px !important;
          }
        }
      `}</style>
    </section>
  );
}
