type QuestionNavigatorProps = {
  total: number
  currentIndex: number
  answeredIndexes?: number[]
  flaggedIndexes?: number[]
  onSelect: (index: number) => void
}

export default function QuestionNavigator({
  total,
  currentIndex,
  answeredIndexes = [],
  flaggedIndexes = [],
  onSelect,
}: QuestionNavigatorProps) {
  return (
    <div className="rounded-[24px] border border-white/10 bg-[#0d1733] p-5">
      <div className="flex items-center justify-between gap-4 mb-4">
        <h3 className="text-lg font-extrabold">Question Navigator</h3>
        <div className="text-sm text-white/50">
          {currentIndex + 1} / {total}
        </div>
      </div>

      <div className="grid grid-cols-5 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-2">
        {Array.from({ length: total }).map((_, index) => {
          const isCurrent = index === currentIndex
          const isFlagged = flaggedIndexes.includes(index)
          const isAnswered = answeredIndexes.includes(index)

          const classes = isCurrent
            ? "bg-cyan-400 text-black border-cyan-400"
            : isFlagged
            ? "bg-yellow-400/20 text-yellow-300 border-yellow-400/40"
            : isAnswered
            ? "bg-blue-400/15 text-blue-300 border-blue-400/30"
            : "bg-[#111d3d] text-white/75 border-[#21345d] hover:border-cyan-400/30"

          return (
            <button
              key={index}
              onClick={() => onSelect(index)}
              className={`h-10 rounded-xl border text-sm font-bold transition ${classes}`}
            >
              {index + 1}
            </button>
          )
        })}
      </div>

      <div className="flex flex-wrap gap-4 mt-4 text-xs text-white/55">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-cyan-400 inline-block" />
          Current
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-blue-400 inline-block" />
          Answered
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-yellow-400 inline-block" />
          Flagged
        </div>
      </div>
    </div>
  )
}