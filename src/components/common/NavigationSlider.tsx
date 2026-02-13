import { useState } from 'react';
import { ChevronRight } from 'lucide-react';

type Page = 'privacy' | 'refund' | 'pricing';

interface NavigationSliderProps {
  onNavigate?: (page: Page) => void;
}

export default function NavigationSlider({ onNavigate }: NavigationSliderProps) {
  const [activePage, setActivePage] = useState<Page>('privacy');

  const pages: { id: Page; label: string }[] = [
    { id: 'privacy', label: 'Privacy' },
    { id: 'refund', label: 'Refund' },
    { id: 'pricing', label: 'Pricing' },
  ];

  const handleNavigation = (page: Page) => {
    setActivePage(page);
    onNavigate?.(page);
  };

  return (
    <div className="w-full bg-white py-4 px-6 shadow-sm">
      <div className="flex items-center gap-2 max-w-4xl mx-auto">
        {pages.map((page, index) => (
          <div key={page.id} className="flex items-center gap-2">
            <button
              onClick={() => handleNavigation(page.id)}
              className={`px-6 py-2.5 rounded-lg font-medium transition-all duration-200 ${
                activePage === page.id
                  ? 'bg-yellow-400 text-gray-900 shadow-md'
                  : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
              }`}
            >
              {page.label}
            </button>
            {index < pages.length - 1 && (
              <ChevronRight className="w-5 h-5 text-gray-400" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}