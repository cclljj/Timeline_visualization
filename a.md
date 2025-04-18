# Population Data Analysis & Visualization

[![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Chart.js](https://img.shields.io/badge/chart.js-F5788D.svg?style=for-the-badge&logo=chart.js&logoColor=white)](https://www.chartjs.org/)

A comprehensive web-based dashboard for analyzing and visualizing demographic data, created on April 18, 2025.

## 📋 Features

- **Interactive Data Filtering** - Filter data by year, gender, or reset filters
- **Key Statistics** - View total records, average birth year, gender counts
- **Dynamic Visualizations**:
  - Birth year distribution chart
  - Gender distribution pie chart
  - Birth month distribution analysis
  - Top cities representation
- **Responsive Data Table** - Browse through the filtered demographic data
- **Modern UI Design** - Clean, responsive interface with intuitive controls

## 🚀 Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge)
- Local web server (optional for CSV/JSON loading)

### Installation

1. Clone the repository or download the project files
2. If needed, start a local web server in the project directory
3. Open `index.html` in your web browser

```bash
# Example using Python's built-in HTTP server
python -m http.server
# Then navigate to http://localhost:8000
```

## 📊 Data Format

The application expects a JSON file (`example.json`) with the following structure:

```json
[
  {
    "first name": "John",
    "last name": "Doe",
    "gender": "Male",
    "birth year": 1990,
    "birth month": 5,
    "birth day": 15,
    "birth city": "New York",
    "country": "USA"
  },
  ...
]
```

## 🛠️ Technologies Used

- **HTML5** - Page structure and semantic elements
- **CSS3** - Responsive styling and layout
- **JavaScript (ES6+)** - Data processing and interactivity
- **Chart.js** - Interactive data visualization
- **Fetch API** - Asynchronous data loading

## 📈 Usage Examples

1. **Filter Data**: Use the dropdown menus to filter by birth year or gender
2. **Analyze Statistics**: View key metrics in the statistics cards
3. **Explore Charts**: Interact with charts to see detailed information
4. **Browse Records**: Scan through individual records in the data table

## 🔄 Development

The project structure is organized as follows:

- `index.html` - Main structure and layout
- `0418.css` - Styling and responsive design
- `0418.js` - Core functionality and data processing
- `example.json` - Sample data (demographic information)
- `example.csv` - Alternative data source format

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Contributors

Add your name and contact information here.

---

Created with ❤️ | Last Updated: April 18, 2025
