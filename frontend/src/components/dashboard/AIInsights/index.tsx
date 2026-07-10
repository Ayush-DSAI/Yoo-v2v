import React from 'react';
import { motion } from 'framer-motion';
import { Brain, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { AIInsightsProps } from './types';
import { styles } from './styles';
import { FALLBACK_INSIGHT } from './constants';
import { InsightSkeleton } from '../ui/Skeletons';

export const AIInsights: React.FC<AIInsightsProps> = ({ routeLoading, routeData, error, empty }) => {
  if (routeLoading) return <InsightSkeleton />;

  if (error) {
    return (
      <div className={styles.container}>
        <div className={styles.glow} />
        <div className="flex flex-col items-center justify-center text-center p-6 h-full space-y-3">
          <Brain className="w-8 h-8 text-rose-500" />
          <p className="text-rose-400 font-bold">Threat analysis failed</p>
          <p className="text-xs text-gray-400">{error}</p>
        </div>
      </div>
    );
  }

  if (empty) {
    return (
      <div className={styles.container}>
        <div className={styles.glow} />
        <div className="flex flex-col items-center justify-center text-center p-6 h-full space-y-2">
          <Brain className="w-8 h-8 text-gray-500" />
          <p className="text-gray-400 font-bold">No predictions active</p>
          <p className="text-xs text-gray-500">Aegis AI is currently idle.</p>
        </div>
      </div>
    );
  }

  const displayData = routeData ? {
    safety_score: routeData.safety_score,
    risk_level: routeData.risk_level,
    explanation: routeData.explanation,
    confidence: Math.round(routeData.safety_score * 0.95 + 7), // Derive fake confidence from safety score
    route_label: 'Avenue 4 (via Sector 3)'
  } : FALLBACK_INSIGHT;

  return (
    <div className={styles.container}>
      {/* Decorative Glow */}
      <div className={styles.glow} />

      <div>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.iconBox}>
            <Brain className="w-5 h-5 fill-current opacity-80" />
          </div>
          <div className="flex-1">
            <h3 className={styles.title}>Predictive Intel</h3>
          </div>
          <span className="flex items-center gap-1 text-[10px] font-bold text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded-full border border-blue-500/20">
            <Sparkles className="w-3 h-3 animate-pulse" /> AI ACTIVE
          </span>
        </div>

        {/* Content Body */}
        <div className={styles.content}>
          {/* Risk & Safety Score */}
          <div className={styles.scoreSection}>
            <span className={styles.scoreLabel}>Safety Index</span>
            <span className={styles.scoreValue}>{displayData.safety_score}/100</span>
          </div>

          {/* Explanation box */}
          <p className={styles.explanation}>
            {displayData.explanation}
          </p>

          {/* Recommended Route */}
          <div className={styles.routeInfo}>
            <div>
              <p className={styles.routeLabel}>Recommended Corridor</p>
              <p className={styles.routeText}>{displayData.route_label}</p>
            </div>
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
          </div>

          {/* Confidence metric */}
          <div className={styles.confidenceSection}>
            <div className={styles.confidenceHeader}>
              <span>Model Confidence</span>
              <span>{displayData.confidence}%</span>
            </div>
            <div className={styles.confidenceBarOuter}>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${displayData.confidence}%` }}
                transition={{ duration: 1.2, ease: 'easeOut' }}
                className={styles.confidenceBarInner}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Button */}
      <button 
        className={`${styles.applyBtn} mt-6`}
        aria-label={`Apply recommended route: ${displayData.route_label}`}
        onClick={() => alert('Safe Route applied to live navigation system.')}
      >
        <span>Apply Secure Corridor</span>
        <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
};

export default AIInsights;
