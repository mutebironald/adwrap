'use client'

interface MediaTypeToggleProps {
  selected: string
  onSelect: (val: string) => void
  counts: {
    static: number
    poles: number
  }
}

export default function MediaTypeToggle({
  selected,
  onSelect,
  counts
}: MediaTypeToggleProps) {
  const tabs = [
    { label: 'Static Media', value: 'static', count: counts.static },
    { label: 'Street Poles', value: 'poles', count: counts.poles }
  ]

  return (
    <div className="flex space-x-6 border-b border-gray-200">
      {tabs.map((tab) => {
        const isActive = tab.value === selected
        return (
          <button
            key={tab.value}
            onClick={() => onSelect(tab.value)}
            className={`relative pb-2 text-sm font-medium transition-colors ${
              isActive ? 'text-blue-600' : 'text-gray-500'
            }`}
          >
            {tab.label}
            <span
              className={`ml-2 rounded-full px-2 py-0.5 text-xs ${
                isActive ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600'
              }`}
            >
              {tab.count}
            </span>
            {isActive && (
              <span className="absolute bottom-0 left-0 h-0.5 w-full bg-blue-600 rounded" />
            )}
          </button>
        )
      })}
    </div>
  )
}
