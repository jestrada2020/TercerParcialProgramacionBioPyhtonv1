# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an interactive web-based quiz application focused on Shiny for Python education. The application presents 30 questions about Shiny for Python concepts including UI components, reactive functions, f-strings, and scientific applications.

## Architecture and Structure

### Frontend (Web Application)
- **index.html** - Main HTML file containing the quiz interface with 30 interactive questions
- **css/styles.css** - Styling for the quiz interface with code placeholder styling and responsive design
- **js/scripts.js** - Main JavaScript for quiz functionality, answer verification, and progress tracking
- **js/questions.js** - Contains correct answers object mapping for all quiz questions

### Content Files
- **ejemplosV2b.md** - Contains Shiny for Python code examples and demonstrations using numpy arrays
- **README.md** - Basic project description

## Key Components

### Question Structure
Each question follows a consistent pattern:
- Editable code placeholders marked with `[...]`
- Answer verification with immediate feedback
- Point scoring system (50 total points across 30 questions)
- Categories: UI (12 pts), Reactive Functions (14 pts), F-Strings (12 pts), Advanced Functions (8 pts), Scientific Apps (2 pts), String/Logic (2 pts)

### JavaScript Architecture
- `correctAnswers` object in questions.js maps question IDs to correct answer arrays
- Real-time answer validation with visual feedback (green/red highlighting)
- Progress bar tracking and final grade calculation
- Email notification system for results

### Styling System
- Tailwind CSS for layout and components
- Custom CSS for code highlighting and placeholder styling
- Responsive design with card-based layout

## Development Guidelines

### Working with Quiz Questions
- Questions are numbered q1-q49 (not all numbers used)
- Each question can have multiple parts (q1-part1, q1-part2, etc.)
- Correct answers are stored as arrays in questions.js
- Visual feedback uses `.correct` and `.incorrect` CSS classes

### Code Examples Pattern
The ejemplosV2b.md file demonstrates the target Shiny for Python patterns:
```python
from shiny.express import input, render, ui
import numpy as np

ui.input_slider("n", "N", 0, 11, 2)

@render.code
def txt():
    return f"Value at index [{input.n()}]: {array[input.n()]}"
```

### File Organization
- Static web files in root directory
- JavaScript modules in `js/` directory
- Stylesheets in `css/` directory
- No build process - direct file serving

## Common Tasks

### Adding New Questions
1. Add HTML structure to index.html following existing pattern
2. Add correct answers to questions.js correctAnswers object
3. Update total point calculations in scripts.js if needed

### Modifying Existing Questions
1. Update HTML content in index.html
2. Update corresponding correct answers in questions.js
3. Test answer validation functionality

### Styling Updates
- Modify css/styles.css for visual changes
- Tailwind classes can be updated directly in HTML
- Code placeholder styling uses `.code-placeholder` class

## Testing the Application
- Open index.html in a web browser
- No server setup required - static file serving
- Test all question validation and feedback
- Verify progress tracking and final grade calculation