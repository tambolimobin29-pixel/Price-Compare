import React from 'react';
import { AlertCircle, RefreshCw, WifiOff, ServerCrash } from 'lucide-react';

interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  retryLabel?: string;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  title = 'Something went wrong.',
  message = "We couldn't load the latest product information. Please try again.",
  onRetry,
  retryLabel = 'Try Again',
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center bg-white rounded-3xl border border-red-200 shadow-xs max-w-md mx-auto my-8">
      <div className="w-16 h-16 rounded-2xl bg-red-50 border border-red-100 flex items-center justify-center text-red-600 mb-4">
        <AlertCircle size={32} />
      </div>
      <h3 className="text-lg font-bold text-slate-900 mb-1">{title}</h3>
      <p className="text-xs text-slate-500 mb-6 leading-relaxed">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          type="button"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-slate-800 transition shadow-xs cursor-pointer"
        >
          <RefreshCw size={14} />
          <span>{retryLabel}</span>
        </button>
      )}
    </div>
  );
};

export const NetworkError: React.FC<{ onRetry?: () => void }> = ({
  onRetry,
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center bg-white rounded-3xl border border-amber-200 shadow-xs max-w-md mx-auto my-8">
      <div className="w-16 h-16 rounded-2xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-600 mb-4">
        <WifiOff size={32} />
      </div>
      <h3 className="text-lg font-bold text-slate-900 mb-1">
        Connection Interrupted
      </h3>
      <p className="text-xs text-slate-500 mb-6 leading-relaxed">
        Please check your internet connection and try reloading the prices.
      </p>
      {onRetry && (
        <button
          onClick={onRetry}
          type="button"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-slate-800 transition shadow-xs cursor-pointer"
        >
          <RefreshCw size={14} />
          <span>Try Again</span>
        </button>
      )}
    </div>
  );
};

export const APIUnavailable: React.FC<{ onRetry?: () => void }> = ({
  onRetry,
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center bg-white rounded-3xl border border-slate-200 shadow-xs max-w-md mx-auto my-8">
      <div className="w-16 h-16 rounded-2xl bg-slate-100 text-slate-600 flex items-center justify-center mb-4">
        <ServerCrash size={32} />
      </div>
      <h3 className="text-lg font-bold text-slate-900 mb-1">
        Retailer Feeds Temporarily Busy
      </h3>
      <p className="text-xs text-slate-500 mb-6 leading-relaxed">
        We are syncing live product catalog feeds. Cached prices remain available.
      </p>
      {onRetry && (
        <button
          onClick={onRetry}
          type="button"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 text-white font-bold text-xs hover:bg-indigo-700 transition shadow-xs cursor-pointer"
        >
          <RefreshCw size={14} />
          <span>Refresh Prices</span>
        </button>
      )}
    </div>
  );
};
