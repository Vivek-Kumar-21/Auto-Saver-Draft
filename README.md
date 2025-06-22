# 📝 Draft Saver — Auto-Saving Text Editor

A clean, distraction-free text editor built with **React**, featuring **auto-save**, **manual save**, **status indicators**, and **dark mode**, styled entirely with **Vanilla CSS** — no Tailwind, no TypeScript.

---

## 🚀 Features

### ✅ Auto-Save with Debounce
- Saves the draft automatically after 2 seconds of user inactivity
- Uses `setTimeout` and `clearTimeout` for debounce control
- Prevents unnecessary or duplicate saves

### 💾 Manual Save Button
- Allows users to save drafts instantly with a click
- Triggers the same logic used in auto-save

### 🔄 Save Status Indicator
- Displays current status with clear icons and messages:
  - `Saving...` 🔄 (with spinner animation)
  - `Saved` ✅ (green check)
  - `Error` ❌ (red cross)

### 🌙 Light / Dark Mode Toggle
- Smooth toggle between light and dark themes
- Uses CSS variables for clean theme management

### 🧪 Save Simulation with Error Possibility
- Simulated saving with `Promise` and random failure (`10%` error rate)
- Helps test retry logic and error handling

### 🕒 Last Saved Time
- Displays the last successful save timestamp in readable format

### ♿ Accessible UI
- All buttons and inputs use `aria-label`
- Color contrast meets accessibility guidelines
- Keyboard-friendly interactions

---

## 🧱 Tech Stack

| Tool / Language     | Purpose                         |
|---------------------|----------------------------------|
| `React`             | Component-driven UI              |
| `Vite`              | Fast dev server & build tool     |
| `JavaScript (ES6+)` | Core language (no TypeScript)    |
| `Vanilla CSS`       | Custom styling                   |
| `react-icons`       | Visual status feedback (Spinner, Check, Error) |

---
