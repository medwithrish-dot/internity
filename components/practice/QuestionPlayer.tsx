"use client"

import { useEffect, useMemo, useState } from "react"
import { Question, shuffleQuestions } from "@/app/data/practiceData"
import QuestionNavigator from "@/components/practice/QuestionNavigator"

export default function QuestionPlayer({
  questions,
  sectionTitle,
  subsectionTitle,
  sectionSlug,
  subsectionSlug,
}: {
  questions: Question[]
  sectionTitle: string
  subsectionTitle: string
  sectionSlug: string
  subsectionSlug: string
}) {
  const availableCounts = [5, 10, 15].filter((count) => count <= questions.length)
  const defaultCount =
    availableCounts.length > 0 ? availableCounts[0] : questions.length

  const DAILY_LIMIT = 7

  const [hasStarted, setHasStarted] = useState(false)
  const [timedMode, setTimedMode] = useState(false)
  const [selectedCount, setSelectedCount] = useState(defaultCount)
  const [activeQuestions, setActiveQuestions] = useState<Question[]>([])
  const [dailyCount, setDailyCount] = useState(0)
  const [userPlan, setUserPlan] = useState<"free" | "premium">("free")
  const [timeRemaining, setTimeRemaining] = useState(0)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  const [submitted, setSubmitted] = useState(false)
  const [answeredIndexes, setAnsweredIndexes] = useState<number[]>([])
  const [flaggedIndexes, setFlaggedIndexes] = useState<number[]>([])
  const [reviewMode, setReviewMode] = useState(false)
  const [userAnswers, setUserAnswers] = useState<Record<number, number | null>>({})

  const currentQuestion = activeQuestions[currentIndex]
  const isDailyLocked = userPlan === "free" && dailyCount >= DAILY_LIMIT

  useEffect(() => {
    if (!hasStarted) return
    setActiveQuestions(shuffleQuestions(questions).slice(0, selectedCount))
  }, [hasStarted, questions, selectedCount])

  useEffect(() => {
    setTimeRemaining(activeQuestions.length * 45)
  }, [activeQuestions.length])

  useEffect(() => {
    if (!hasStarted || !timedMode || reviewMode) return

    if (timeRemaining <= 0) {
      setReviewMode(true)
      setSubmitted(true)
      return
    }

    const timer = setTimeout(() => {
      setTimeRemaining((prev) => prev - 1)
    }, 1000)

    return () => clearTimeout(timer)
  }, [hasStarted, timedMode, reviewMode, timeRemaining])

  useEffect(() => {
    const fetchDailyAttempts = async () => {
      try {
        const res = await fetch("/api/attempts/today")
        const data = await res.json()
        setDailyCount(data.count ?? 0)
      } catch {
        console.error("Failed to fetch daily attempts")
      }
    }

    fetchDailyAttempts()
  }, [])

  useEffect(() => {
    const fetchPlan = async () => {
      try {
        const res = await fetch("/api/user/plan")
        const data = await res.json()
        setUserPlan(data.plan ?? "free")
      } catch {
        setUserPlan("free")
      }
    }

    fetchPlan()
  }, [])

  const completedCount = useMemo(() => {
    return Object.keys(userAnswers).filter(
      (key) =>
        userAnswers[Number(key)] !== null &&
        userAnswers[Number(key)] !== undefined
    ).length
  }, [userAnswers])

  const correctCount = useMemo(() => {
    return activeQuestions.reduce((count, question, index) => {
      return userAnswers[index] === question.correctAnswerIndex ? count + 1 : count
    }, 0)
  }, [activeQuestions, userAnswers])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  if (!currentQuestion && hasStarted) {
    return (
      <div className="rounded-2xl border border-white/10 bg-[#0d1733] p-6">
        <h2 className="text-xl font-extrabold mb-2">No questions available</h2>
        <p className="text-white/60">
          Add more questions inside `practiceData.ts`.
        </p>
      </div>
    )
  }

  if (!hasStarted) {
    return (
      <div className="space-y-5">
        <div className="rounded-2xl border border-white/10 bg-[#0d1733] p-5">
          <div className="inline-flex rounded-full bg-[#182754] px-3 py-1 text-xs text-white/70 mb-3">
            {sectionTitle}
          </div>

          <h1 className="text-2xl md:text-3xl font-extrabold">
            {subsectionTitle}
          </h1>

          <p className="text-white/65 mt-3 leading-7 max-w-2xl">
            Choose how you want to start this set before beginning.
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-[#0d1733] p-5">
          <h2 className="text-lg font-extrabold mb-4">Set options</h2>

          <p className="text-white/70 text-sm mb-3">Choose question count</p>

          <div className="flex flex-wrap gap-3 mb-5">
            {availableCounts.map((count) => (
              <button
                key={count}
                onClick={() => setSelectedCount(count)}
                className={`rounded-xl px-5 py-3 font-bold transition ${
                  selectedCount === count
                    ? "bg-cyan-400 text-black"
                    : "border border-white/10 bg-[#111d3d] text-white"
                }`}
              >
                {count} questions
              </button>
            ))}

            <button
              onClick={() => setSelectedCount(questions.length)}
              className={`rounded-xl px-5 py-3 font-bold transition ${
                selectedCount === questions.length
                  ? "bg-cyan-400 text-black"
                  : "border border-white/10 bg-[#111d3d] text-white"
              }`}
            >
              All ({questions.length})
            </button>
          </div>

          <p className="text-white/70 text-sm mb-3">Choose mode</p>

          <div className="flex flex-wrap gap-3 mb-5">
            <button
              onClick={() => setTimedMode(false)}
              className={`rounded-xl px-5 py-3 font-bold transition ${
                !timedMode
                  ? "bg-cyan-400 text-black"
                  : "border border-white/10 bg-[#111d3d] text-white"
              }`}
            >
              Untimed
            </button>

            <button
              onClick={() => setTimedMode(true)}
              className={`rounded-xl px-5 py-3 font-bold transition ${
                timedMode
                  ? "bg-cyan-400 text-black"
                  : "border border-white/10 bg-[#111d3d] text-white"
              }`}
            >
              Timed
            </button>
          </div>

          <div className="grid sm:grid-cols-3 gap-3 mb-5">
            <div className="rounded-xl border border-white/10 bg-[#111d3d] p-4">
              <p className="text-white/50 text-xs mb-1">Questions</p>
              <p className="font-bold text-lg">{selectedCount}</p>
            </div>

            <div className="rounded-xl border border-white/10 bg-[#111d3d] p-4">
              <p className="text-white/50 text-xs mb-1">Mode</p>
              <p className="font-bold text-lg">
                {timedMode ? "Timed" : "Untimed"}
              </p>
            </div>

            <div className="rounded-xl border border-white/10 bg-[#111d3d] p-4">
              <p className="text-white/50 text-xs mb-1">Time</p>
              <p className="font-bold text-lg">
                {timedMode ? formatTime(selectedCount * 45) : "No limit"}
              </p>
            </div>
          </div>

          <button
            onClick={() => setHasStarted(true)}
            disabled={isDailyLocked}
            className="rounded-xl bg-cyan-400 text-black px-6 py-3 font-extrabold disabled:opacity-50"
          >
            {isDailyLocked ? "Daily limit reached" : "Start Set"}
          </button>
        </div>
      </div>
    )
  }

  const chosenAnswer =
    selectedOption !== null ? selectedOption : userAnswers[currentIndex] ?? null

  const correct = chosenAnswer === currentQuestion.correctAnswerIndex
  const isLastQuestion = currentIndex === activeQuestions.length - 1

  const handleSubmit = async () => {
    if (selectedOption === null || isDailyLocked) return

    try {
      const res = await fetch("/api/attempts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question_id: currentQuestion.id,
          section_slug: sectionSlug,
          subsection_slug: subsectionSlug,
          correct: selectedOption === currentQuestion.correctAnswerIndex,
          selected_answer: selectedOption,
          correct_answer: currentQuestion.correctAnswerIndex,
          timed_mode: timedMode ?? false,
        }),
      })

      if (res.status === 401) {
        window.location.href = `/login?next=${encodeURIComponent(
          `/practice/${sectionSlug}/${subsectionSlug}`
        )}`
        return
      }

      if (res.status === 403) {
        setDailyCount(DAILY_LIMIT)
        return
      }

      if (!res.ok) {
        const data = await res.json().catch(() => null)
        console.error("Failed to save attempt", data)
        return
      }

      setSubmitted(true)

      setAnsweredIndexes((prev) =>
        prev.includes(currentIndex) ? prev : [...prev, currentIndex]
      )

      setUserAnswers((prev) => ({
        ...prev,
        [currentIndex]: selectedOption,
      }))

      if (userPlan === "free") {
        setDailyCount((prev) => prev + 1)
      }
    } catch (err) {
      console.error("Failed to save attempt", err)
    }
  }

  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-white/10 bg-[#0d1733] p-4">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
          <div>
            <div className="inline-flex rounded-full bg-[#182754] px-3 py-1 text-xs text-white/70 mb-2">
              {sectionTitle}
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold">
              {subsectionTitle}
            </h1>
          </div>

          <div className="flex flex-wrap gap-2">
            <div className="rounded-xl border border-white/10 bg-[#111d3d] px-3 py-2">
              <p className="text-white/50 text-[11px]">Completed</p>
              <p className="font-bold text-sm">{completedCount}</p>
            </div>

            <div className="rounded-xl border border-white/10 bg-[#111d3d] px-3 py-2">
              <p className="text-white/50 text-[11px]">Progress</p>
              <p className="font-bold text-sm">
                {currentIndex + 1} / {activeQuestions.length}
              </p>
            </div>

            {timedMode && (
              <div className="rounded-xl border border-cyan-400/20 bg-cyan-400/10 px-3 py-2">
                <p className="text-cyan-300 text-[11px]">Time Left</p>
                <p className="font-bold text-sm text-cyan-300">
                  {formatTime(timeRemaining)}
                </p>
              </div>
            )}

            {reviewMode && (
              <div className="rounded-xl border border-cyan-400/20 bg-cyan-400/10 px-3 py-2">
                <p className="text-cyan-300 text-[11px]">Score</p>
                <p className="font-bold text-sm text-cyan-300">
                  {correctCount} / {activeQuestions.length}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <QuestionNavigator
        total={activeQuestions.length}
        currentIndex={currentIndex}
        answeredIndexes={answeredIndexes}
        flaggedIndexes={flaggedIndexes}
        onSelect={(index) => {
          setCurrentIndex(index)
          setSelectedOption(userAnswers[index] ?? null)
          setSubmitted(reviewMode || userAnswers[index] !== undefined)
        }}
      />

      {reviewMode && (
        <div className="rounded-2xl border border-cyan-400/20 bg-[linear-gradient(180deg,rgba(34,211,238,0.08)_0%,rgba(124,92,255,0.08)_100%)] p-4">
          <h3 className="text-lg font-extrabold mb-1">Set submitted</h3>
          <p className="text-white/70 text-sm leading-6">
            Use the navigator above to move through each question and review the explanations.
          </p>
        </div>
      )}

      <div className="rounded-2xl border border-white/10 bg-[#0d1733] p-4">
        <div className="flex items-center justify-between gap-3 mb-5">
          <div>
            <p className="text-white/50 text-sm">
              Question {currentIndex + 1}
            </p>

            {isDailyLocked ? (
              <div className="rounded-2xl border border-yellow-400/30 bg-yellow-400/10 p-6 text-center">
                <p className="text-lg font-extrabold mb-2">Daily limit reached</p>
                <p className="text-white/70 mb-4">
                  You’ve completed your 7 free questions today. Upgrade to continue.
                </p>

                <a
                  href="/pricing"
                  className="inline-block rounded-xl bg-cyan-400 text-black px-5 py-3 font-extrabold hover:opacity-90 transition"
                >
                  Upgrade to Premium
                </a>
              </div>
            ) : (
              <h2 className="text-xl md:text-2xl font-extrabold mt-1">
                {currentQuestion.prompt ?? "Look at the image and choose the correct answer."}
              </h2>
            )}
          </div>

          <button
            onClick={() =>
              setFlaggedIndexes((prev) =>
                prev.includes(currentIndex)
                  ? prev.filter((i) => i !== currentIndex)
                  : [...prev, currentIndex]
              )
            }
            className={`rounded-xl px-4 py-2 text-sm font-bold border transition ${
              flaggedIndexes.includes(currentIndex)
                ? "border-yellow-400/40 bg-yellow-400/10 text-yellow-300"
                : "border-white/10 bg-[#111d3d] text-white"
            }`}
          >
            {flaggedIndexes.includes(currentIndex) ? "Flagged" : "Flag"}
          </button>
        </div>

        {currentQuestion.imageUrl && (
          <div className="mb-5 overflow-hidden rounded-2xl border border-white/10 bg-[#111d3d]">
            <img
              src={currentQuestion.imageUrl}
              alt="Question image"
              className="w-full h-auto object-cover"
            />
          </div>
        )}

        <div className="space-y-3">
          {currentQuestion.options.map((option, index) => {
            const isSelected = chosenAnswer === index
            const isCorrectAnswer = currentQuestion.correctAnswerIndex === index
            const showFeedback = submitted || reviewMode

            let classes =
              "w-full rounded-2xl border px-4 py-4 text-left transition"

            if (!showFeedback) {
              classes += isSelected
                ? " border-cyan-400 bg-cyan-400/10"
                : " border-white/10 bg-[#111d3d] hover:border-white/25"
            } else {
              if (isCorrectAnswer) {
                classes += " border-emerald-400/40 bg-emerald-400/10"
              } else if (isSelected && !isCorrectAnswer) {
                classes += " border-red-400/40 bg-red-400/10"
              } else {
                classes += " border-white/10 bg-[#111d3d]"
              }
            }

            return (
              <button
                key={index}
                onClick={() => {
                  if (submitted || reviewMode) return
                  setSelectedOption(index)
                }}
                className={classes}
              >
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-7 w-7 items-center justify-center rounded-full border border-white/15 bg-white/5 text-sm font-bold">
                    {String.fromCharCode(65 + index)}
                  </div>

                  <div className="flex-1">
                    <p className="font-medium">{option}</p>

                    {showFeedback && isCorrectAnswer && (
                      <p className="text-emerald-300 text-sm mt-2">
                        Correct answer
                      </p>
                    )}

                    {showFeedback && isSelected && !isCorrectAnswer && (
                      <p className="text-red-300 text-sm mt-2">
                        Your answer
                      </p>
                    )}
                  </div>
                </div>
              </button>
            )
          })}
        </div>

        {(submitted || reviewMode) && (
          <div
            className={`mt-5 rounded-2xl border p-4 ${
              correct
                ? "border-emerald-400/30 bg-emerald-400/10"
                : "border-red-400/30 bg-red-400/10"
            }`}
          >
            <p className="font-extrabold mb-1">
              {correct ? "Correct" : "Not quite"}
            </p>
            <p className="text-white/80 text-sm leading-6">
              {currentQuestion.explanation}
            </p>
          </div>
        )}

        <div className="flex flex-wrap gap-3 mt-6">
          {!submitted && !reviewMode ? (
            <button
              onClick={handleSubmit}
              disabled={selectedOption === null || isDailyLocked}
              className="rounded-xl bg-cyan-400 text-black px-5 py-3 font-extrabold disabled:opacity-50"
            >
              Submit answer
            </button>
          ) : (
            <>
              {!isLastQuestion ? (
                <button
                  onClick={() => {
                    const nextIndex = currentIndex + 1
                    setCurrentIndex(nextIndex)
                    setSelectedOption(userAnswers[nextIndex] ?? null)
                    setSubmitted(reviewMode || userAnswers[nextIndex] !== undefined)
                  }}
                  className="rounded-xl bg-cyan-400 text-black px-5 py-3 font-extrabold"
                >
                  Next question
                </button>
              ) : !reviewMode ? (
                <button
                  onClick={() => setReviewMode(true)}
                  className="rounded-xl bg-cyan-400 text-black px-5 py-3 font-extrabold"
                >
                  Finish set
                </button>
              ) : null}
            </>
          )}

          <button
            onClick={() => {
              setCurrentIndex(0)
              setSelectedOption(null)
              setSubmitted(false)
              setAnsweredIndexes([])
              setFlaggedIndexes([])
              setReviewMode(false)
              setUserAnswers({})
              setHasStarted(false)
              setTimedMode(false)
              setSelectedCount(defaultCount)
              setTimeRemaining(questions.length * 45)
            }}
            className="rounded-xl border border-white/10 bg-[#111d3d] px-5 py-3 font-bold"
          >
            Reset set
          </button>
        </div>
      </div>
    </div>
  )
}