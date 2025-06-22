import React, { useState, useEffect, useRef, useCallback } from 'react'
import { FaSave, FaCheck, FaSpinner, FaExclamationTriangle, FaTrash } from 'react-icons/fa'
import './App.css'

function App() {
  const [draft, setDraft] = useState('')
  const [saveStatus, setSaveStatus] = useState('idle')
  const [lastSaveTime, setLastSaveTime] = useState(null)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [saveHistory, setSaveHistory] = useState([])
  const timeoutRef = useRef(null)

  const handleInputChange = (e) => {
    const newDraft = e.target.value
    setDraft(newDraft)
    
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    timeoutRef.current = setTimeout(() => {
      handleAutoSave(newDraft)
    }, 1500)
  }

  const handleAutoSave = useCallback((content) => {
    setSaveStatus('loading')
    
    setTimeout(() => {
      try {
        const timestamp = new Date()
        const saveEntry = {
          content,
          timestamp: timestamp.toLocaleString(),
          id: timestamp.getTime()
        }

        const currentHistory = JSON.parse(localStorage.getItem('draftHistory') || '[]')
        const updatedHistory = [...currentHistory, saveEntry].slice(-10)

        localStorage.setItem('draftContent', content)
        localStorage.setItem('draftHistory', JSON.stringify(updatedHistory))
        
        setSaveStatus('success')
        setLastSaveTime(timestamp.toLocaleTimeString())
        setSaveHistory(updatedHistory)
      } catch (error) {
        setSaveStatus('error')
        console.error('Save failed:', error)
      }
    }, 500)
  }, [])

  const handleManualSave = () => {
    handleAutoSave(draft)
  }

  const toggleDarkMode = () => {
    const newMode = !isDarkMode
    setIsDarkMode(newMode)
    document.documentElement.classList.toggle('dark-mode', newMode)
    localStorage.setItem('darkMode', JSON.stringify(newMode))
  }

  const clearDraft = () => {
    setDraft('')
    handleAutoSave('')
  }

  const restoreFromHistory = (content) => {
    setDraft(content)
  }

  useEffect(() => {
    const savedDraft = localStorage.getItem('draftContent')
    const savedHistory = JSON.parse(localStorage.getItem('draftHistory') || '[]')
    const savedDarkMode = JSON.parse(localStorage.getItem('darkMode') || 'false')

    if (savedDraft) {
      setDraft(savedDraft)
    }

    setSaveHistory(savedHistory)
    
    if (savedDarkMode !== isDarkMode) {
      toggleDarkMode()
    }
  }, [])

  const renderSaveStatusIcon = () => {
    switch(saveStatus) {
      case 'loading': return <FaSpinner className="status-icon loading" />
      case 'success': return <FaCheck className="status-icon success" />
      case 'error': return <FaExclamationTriangle className="status-icon error" />
      default: return <FaSave className="status-icon" />
    }
  }

  return (
    <div className="draft-saver-container">
      <div className="header">
        <div className="theme-toggle">
          <button onClick={toggleDarkMode}>
            {isDarkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
          </button>
        </div>
      </div>
      
      <div className="draft-editor">
        <textarea 
          value={draft}
          onChange={handleInputChange}
          placeholder="Start typing your draft here..."
          aria-label="Draft Editor"
        />
        
        <div className="save-section">
          <div className="save-actions">
            <button 
              onClick={handleManualSave} 
              disabled={saveStatus === 'loading'}
              className="manual-save-btn"
            >
              {renderSaveStatusIcon()} Save Draft
            </button>
            
            <button 
              onClick={clearDraft}
              className="clear-draft-btn"
              title="Clear Draft"
            >
              <FaTrash />
            </button>
          </div>
          
          {lastSaveTime && (
            <p className="last-save-time">
              Last saved: {lastSaveTime}
            </p>
          )}
        </div>

        {saveHistory.length > 0 && (
          <div className="draft-history">
            <h3>Draft History</h3>
            <ul>
              {saveHistory.slice().reverse().map((entry) => (
                <li key={entry.id} onClick={() => restoreFromHistory(entry.content)}>
                  <span className="history-timestamp">{entry.timestamp}</span>
                  <span className="history-preview">{entry.content.slice(0, 50)}...</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}

export default App