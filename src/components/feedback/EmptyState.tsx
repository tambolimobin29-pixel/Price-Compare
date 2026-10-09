import React from 'react';
import Link from 'next/link';
import { SearchX, RotateCcw, PackageSearch } from 'lucide-react';

interface EmptyStateProps {
  title?: string;
  description?: string;
  onReset?: () => void;
  resetLabel?: string;
  actionHref?: string;
  actionLabel?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title = 'No products found',
  description = 'We couldn   t find any matching products with the selected filters. Try broadening your search or resetting active filters.',
  onReset,
  resetLabel = 'Reset all filters',
  actionHref,
  actionLabel,
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center bg-white rounded-3xl border border-slate-200 shadow-xs max-w-md mx-auto my-8">
      <div className="w-16 h-16 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 mb-4">
        <SearchX size={32} />
      </div>
      <h3 className="text-lg font-bold text-slate-900 mb-1">{title}</h3>
      <p className="text-xs text-slate-500 mb-6 leading-relaxed">
        {description}
      </p>
      {onReset && (
        <button
          onClick={onReset}
          type="button"
          className="inline-flex items-center gap-2 px-4.5 py-2.5 rounded-xl bg-indigo-600 text-white font-bold text-xs hover:bg-indigo-700 transition shadow-xs cursor-pointer"
        >
          <RotateCcw size={14} />
          <span>{resetLabel}</span>
        </button>
      )}
      {actionHref && actionLabel && (
        <Link
          href={actionHref}
          className="inline-flex items-center gap-2 px-4.5 py-2.5 rounded-xl bg-indigo-600 text-white font-bold text-xs hover:bg-indigo-700 transition shadow-xs cursor-pointer"
        >
          <span>{actionLabel}</span>
        </Link>
      )}
    </div>
  );
};

export const NoProductsFound: React.FC<{ query?: string; onClear?: () => void }> = ({
  query,
  onClear,
}) => {
  return (
    <EmptyState
      title={query ? `No results for "${query}"` : 'No products found'}
      description="Try checking for spelling errors, using more general search terms, or clearing your active store filters."
      onReset={onClear}
      resetLabel="Clear Search"
    />
  );
};
