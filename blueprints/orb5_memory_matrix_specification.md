# Orb #5: Memory Matrix & GTO Brain - Architectural Specification

## Virtual Identity
**The Brain**. The cognitive center of the Smarter.Poker empire. A high-fidelity, gamified memory training facility designed to turn GTO ranges into instinctive neural pathways.

## Core Design Philosophy
*   **Video Game First**: Unlike GTO Wizard's utilitarian "study tool" vibe, Orb 5 plays like a high-speed puzzle game. Neon aesthetics, kinetic feedback, sounds, and score multipliers.
*   **Muscle Memory**: The goal is not just "understanding" but "instant recall".
*   **Visual Learning**: Heavy use of heat maps, color coding, and pattern recognition.

---

## 1. Category: Range Construction & Recall
*The foundation of the engine. Users must prove they know the chart.*

### 1.1 The Range Builder (Core Tool)
*   **Mechanism**: A 13x13 Grid (Pocket Pairs, Offsuit, Suited) that starts empty.
*   **Action**: User "paints" the grid with colors corresponding to actions (Red/Raise, Green/Call, Blue/Fold).
*   **Scoring**: Real-time accuracy grading vs. the Solver Solution.
    *   *Perfect Match*: 100% Score + "Neural Link Established" visual effect.
    *   *Minor Deviation*: Penalty points.
    *   *Blunder*: Screen shake + "Neural Sever" warning.

### 1.2 Retrieval Practice Mode
*   **Concept**: Forces active recall.
*   **Flow**:
    1.  User is shown a spot (e.g., "UTG Open, 100bb").
    2.  Grid is hidden/blank.
    3.  User mentally visualizing or painting blindly.
    4.  "Reveal" overlays the correct answer.

### 1.3 Frequency Mode
*   **Concept**: For advanced players mastering mixed strategies.
*   **Input**: Sliders or input fields for exact percentages (e.g., "25% Call, 75% Raise").
*   **Grouping**:
    *   *Simplified*: Groups bets into buckets (Small/Medium/Large).
    *   *Hard*: Requires exact solvency sizing (10%, 33%, 75%, 125%).

### 1.4 Heat-Map Comparisons
*   **Visual**: Split-screen view.
    *   Left: User's Range.
    *   Right: GTO Solver Range.
*   **Overlay**: "Deviation Map" highlighting areas where the user was too loose (Red) or too tight (Blue).

---

## 2. Category: Visual Drills & Spot Training
*Rapid-fire arcade modes for speed and pattern recognition.*

### 2.1 Flashcard Mode (Pre-flop)
*   **Style**: "Tinder-style" or "Speed-Chess" interface.
*   **Prompt**: A specific hand (e.g., "A5s") and a spot ("CO vs BTN 3-bet").
*   **Action**: Rapid buttons "RAISE", "CALL", "FOLD".
*   **Metric**: Time-to-decision + Accuracy.

### 2.2 Spot Drilling
*   **Loop**: Repeatedly playing the same logic node (e.g., "Flop C-Bet").
*   **Gamification**: "Streak Counter" for getting it right N times in a row.

### 2.3 Board Texture Filtering
*   **Filters**: Monotone, Paired, Disconnected, Ace-High.
*   **Purpose**: Visualizing how the "shape" of the range shifts based on texture.

### 2.4 "Close Decisions Only" Filter
*   **Logic**: Removes easy decisions (bottom 10% / top 10% hands).
*   **Engagement**: Only presents 0EV - 0.5EV borderline decisions to refine edge-case intuition.

### 2.5 RNG Mode
*   **Mechanic**: Displays a "Rolled Number" (0-100) next to the hand.
*   **Task**: User must decide action based on the roll (e.g., "Roll is 45, Frequency is 50%, so I MUST Bet").

---

## 3. Category: Strategy Archiving
*The "Library of Truth" where mastered concepts are stored.*

### 3.1 Aggregated Flop Reports
*   **Visualization**: "Strategic Landscape" view.
*   **Data**: 1,755 Flops categorized.
*   **Output**: Heuristic patterns (e.g., "We check 100% on Monotone boards").

### 3.2 Hand Class Strategies
*   **Grouping**: "Flush Draws", "Set Mining Pairs", "Top Pair Good Kicker".
*   **View**: See how an entire class of hands plays across different textures.

### 3.3 Custom & Saved Spots
*   **Custom Solving**: Builder for creating niche scenarios (e.g., 3-way straddle).
*   **Mistake Library**: "Bookmarking" a failed hand to turn it into a custom drill later.

---

## 4. Category: Competitive Feedback (The Arena)
*Multiplayer and profile ranking systems.*

### 4.1 PokerArena (1v1)
*   **Gameplay**: Asynchronous or Real-time battles.
*   **Scoring**: "Accuracy War". Who deviates less from GTO over 20 hands?

### 4.2 Ecosystem Integration
*   **Elo System**: Bronze to Legend ranks based on drill accuracy.
*   **GTO Reports**: 10k Hand Analysis of user play.
*   **EV Loss Tracking**: Converting mistakes into "Diamond" (currency) loss simulations.
*   **Time-Bank**: "Blitz Mode" (7 seconds or fail).


---

## 5. Category: Deep Logic & AI Analysis (Phase 2)
*Advanced features for power users and data analysis.*

### 5.1 Custom Solving Engine ("God Mode")
*   **Real-Time Solver**: Users can build custom scenarios (e.g., "5-bet pot, 300bb deep") and generate solutions on the fly.
*   **Node Locking**: Users can lock specific nodes (e.g., "Opponent NEVER bluffs here") to force the AI to calculate an exploit strategy.

### 5.2 Hand History Analyzer ("MRI Scan")
*   **Bulk Upload**: Support for dragging and dropping session logs (PokerStars, GG, etc.).
*   **Leak Detection**: Scans databases to identify systemic errors (e.g., "You lose 5bb/100 by folding too much to River Raises").
*   **"Superhuman" Detection**: Flags plays that are statistically improbable for humans, useful for fair play checks.

---

## 6. Category: Social & Coaching Layer (Phase 3)
*Community engagement and curated learning paths.*

### 6.1 Curated Study Plans
*   **Playlists**: Structured drill sets (e.g., "The Red Line Booster" for aggressive bluffing).
*   **Daily Quizzes**: A "Wordle-style" daily hand challenge for global comparison.

### 6.2 Community Integration
*   **Discord Integration**: Direct links to community discussions for specific spots.
*   **Shareable Replays**: "Challenge a Friend" to play the exact same hand.

---

## 7. Technical Stack Components
*   **Frontend**: Next.js 14, React 19.
*   **Styling**: Tailwind CSS, `clsx`, `tailwind-merge` for dynamic classes.
*   **Animation**: `framer-motion` (Critical for "Video Game" feel - card flips, shakes, neon pulses).
*   **State Management**: Zustand (for high-frequency grid state).
*   **Database**: Supabase (User profiles, drill history, saved spots).
