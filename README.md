# Portfolio Website

A modern, responsive portfolio website showcasing my projects and skills as a Junior Full-Stack Developer. Built with vanilla HTML, SCSS, and JavaScript, featuring dynamic theme switching, interactive elements, and a project carousel.

## 🌐 Live Demo

[View Live Site](https://nikomakr.github.io/portfolio)

## ✨ Features

### 🎨 Theme Switching
- **4 Theme Options**: Dark, Light, Colorblind-friendly, and Black & White modes
- **CSS Custom Properties**: Seamless theme transitions using CSS variables
- **LocalStorage Persistence**: User's theme preference saved across sessions
- **Accessible**: ARIA labels and keyboard navigation support

### 💻 Interactive Elements
- **Programming Jokes API Integration**: Click the header icon to fetch random programming jokes
- **Setup/Punchline Reveal**: Interactive two-step joke display for engagement
- **Error Handling**: Graceful fallbacks for API failures

### 🎠 Project Carousel
- **Responsive Grid**: 3 projects on desktop, 2 on tablet, 1 on mobile
- **Navigation Controls**: Left/right arrows with keyboard support (←/→)
- **Visual Indicators**: Dot navigation showing current position
- **Smooth Animations**: CSS transitions for professional feel
- **Scalable**: Easily add more projects by duplicating HTML structure

### 📧 Contact Section
- **Bot Verification**: Simple math challenge to prevent spam bots
- **Email Protection**: Email only revealed after human verification
- **Random Challenges**: Generates different math problems each time
- **Accessible Modal**: Keyboard navigation and screen reader friendly

### 📱 Responsive Design
- **Mobile-First Approach**: Optimized for all screen sizes
- **Breakpoints**: 
  - Mobile: < 768px
  - Tablet: 768px - 1023px
  - Desktop: 1024px+
- **Flexible Layouts**: CSS Grid and Flexbox for adaptive content

## 🛠️ Technologies Used

- **HTML5**: Semantic markup for accessibility
- **SCSS (Sass)**: Advanced CSS with variables, nesting, and mixins
- **JavaScript (ES6+)**: Modern vanilla JS with async/await
- **CSS Grid & Flexbox**: Responsive layout systems
- **LocalStorage API**: Client-side data persistence
- **Fetch API**: Asynchronous data fetching

## 🚀 API Integration

### Official Joke API
- **Endpoint**: `https://official-joke-api.appspot.com/jokes/programming/random`
- **Response Format**: JSON with setup/punchline structure
- **Rate Limit**: Unlimited
- **CORS**: Enabled for client-side requests

## 📁 Project Structure

```
portfolio/
├── index.html              # Main HTML structure
├── styles.scss             # Sass source file
├── styles.css              # Compiled CSS (auto-generated)
├── styles.css.map          # Source map for debugging
├── script.js               # JavaScript functionality
├── _mixins.scss            # Sass mixins (if applicable)
├── _paletteThemes.scss     # Theme color definitions (if applicable)
├── sources/                # Assets directory
│   ├── coding.svg          # Header icon
│   ├── github-button.svg   # GitHub icon
│   └── linkedin-button.svg # LinkedIn icon
├── images/                 # Additional images
└── README.md               # Documentation
```

## 🎯 Key Features Breakdown

### Theme System
The portfolio implements a comprehensive theming system using CSS custom properties:

```scss
:root.theme--dark {
  --bg: #050816;
  --text: #F5F7FF;
  --link: #4F46E5;
  --hover: #22C55E;
  // ... more variables
}
```

Themes are applied dynamically via JavaScript and persisted using localStorage.

### Carousel Implementation
The project carousel uses CSS Grid with `grid-auto-flow: column` for horizontal scrolling:

```javascript
// Dynamically calculates visible projects based on viewport
const projectWidth = (containerWidth / projectsPerView);
const translateX = -(currentIndex * (projectWidth + gap));
```

### Bot Verification
Simple yet effective spam prevention using random math challenges:

```javascript
// Generates problems like "7 + 3", "9 × 2", "8 - 4"
const operations = ['+', '-', '×'];
// User must solve correctly to reveal email
```

## 🎨 Design Principles

- **Minimalist Aesthetic**: Clean, distraction-free design
- **Monospace Typography**: Developer-centric font choices
- **Smooth Animations**: CSS transitions for professional polish
- **Accessible Colors**: WCAG compliant contrast ratios
- **Hover Feedback**: Clear interactive states for all clickable elements

## 📊 Performance

- **No Framework Overhead**: Pure vanilla JavaScript
- **Minimal Dependencies**: Only external API calls, no libraries
- **Optimized Assets**: SVG icons for scalability
- **Fast Load Times**: Minimal CSS and JS footprint

## 🔧 Development Setup

### Prerequisites
- Node.js (for Sass compilation)
- Live Server (VS Code extension) or any local server

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/nikomakr/portfolio.git
cd portfolio
```

2. **Compile Sass** (if making changes)
```bash
# Watch for changes and auto-compile
sass --watch styles.scss:styles.css

# Or compile once
sass styles.scss styles.css
```

3. **Run local server**
```bash
# Using VS Code Live Server extension
# Right-click index.html → "Open with Live Server"

# Or using Python
python -m http.server 8000

# Or using Node.js http-server
npx http-server
```

4. **Open in browser**
```
http://localhost:8000
```

## 📝 Customization Guide

### Adding New Projects

1. Open `index.html`
2. Find the `<div class="portfolio-projects">` section
3. Add a new project card:

```html
<article class="project">
  <h3 class="project-title">Your Project Name</h3>
  <p class="project-languages">Tech • Stack • Here</p>
  <p class="project-summary">
    Brief description of your project.
  </p>
  <a href="https://github.com/username/repo" target="_blank" rel="noopener noreferrer" class="project-link">
    View Repository →
  </a>
</article>
```

The carousel will automatically accommodate new projects!

### Changing Theme Colors

1. Open `styles.scss`
2. Modify theme variables under `:root.theme--{themeName}`
3. Recompile Sass

### Updating Contact Email

Replace the placeholder email in `index.html`:

```html
<!-- Find this line and update -->
<a href="mailto:your.email@example.com" class="email-link" id="email-display">
  your.email@example.com
</a>
```

## 🌟 Future Enhancements

- [ ] Add animations library
- [ ] Implement dark/light mode auto-detection
- [ ] Add project filtering by technology and by language
- [ ] Add blog integration with fresh ever green content

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👤 Author

**Nikolaos Makridis**

- GitHub: [@nikomakr](https://github.com/nikomakr)
- LinkedIn: [makridis-nikolaos](https://linkedin.com/in/makridis-nikolaos)
- Location: London, UK

## 🙏 Acknowledgments

- [Official Joke API](https://github.com/15Dkatz/official_joke_api) - Programming jokes integration
- Inspiration from modern portfolio designs
- The developer community for best practices and feedback

## 🐛 Known Issues

None at the moment. If you find any bugs, please [open an issue](https://github.com/nikomakr/portfolio/issues).

## 💬 Feedback

Feedback and contributions are welcome! Feel free to:
- Open an issue for bug reports
- Submit a pull request for improvements
- Star the repository if you find it useful

---

**Built with 💻 and ☕ by Nikolaos Makridis**