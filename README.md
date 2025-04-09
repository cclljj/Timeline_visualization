# Timeline Visualization

This project is a web-based interactive timeline visualization built using [TimelineJS](https://timeline.knightlab.com/). It reads event data from a CSV file and displays the events on a timeline, grouped by type and styled with unique colors for each type.

## Features

- **Interactive Timeline**: Navigate through events with a slider and zoom controls.
- **Event Grouping**: Events are grouped by their `Type` and visually distinguished with unique colors.
- **CSV Data Source**: Event data is dynamically loaded from a CSV file.
- **Custom Styling**: Light-colored themes for a visually appealing timeline.

## Getting Started

### Prerequisites

- A modern web browser (e.g., Chrome, Firefox, Edge).
- Python (for running a local development server).

### Installation

1. Clone this repository or download the project files.
2. Ensure the `events.csv` file is located in the `data/` directory.

### Running the Project

1. Open a terminal and navigate to the project directory.
2. Start a local development server:
    
    ```bash
    bash
    CopyEdit
    python3 -m http.server
    
    ```
    
3. Open your browser and navigate to:
    
    ```
    arduino
    CopyEdit
    http://localhost:8000
    
    ```
    

## Project Structure

```
plaintext
CopyEdit
Timeline_visualization/
├── data/
│   └── events.csv    # CSV file containing event data
├── src/
│   └── script.js     # JavaScript for fetching, parsing, and rendering the timeline
├── style/
│   └── style.css     # Custom CSS for styling the timeline
├── index.html        # Main HTML file
└── README.md         # Project documentation

```

## File Descriptions

- **index.html**
    
    The main HTML file that includes the TimelineJS library and links to the custom CSS and JavaScript files.
    
- **style/style.css**
    
    Custom CSS file for styling the timeline. Includes unique colors for up to 10 event types.
    
- **src/script.js**
    
    JavaScript file that:
    
    1. Fetches the `events.csv` file.
    2. Parses the CSV data into an array of objects.
    3. Converts the data into the format required by TimelineJS.
    4. Initializes the timeline with the processed data.
- **data/events.csv**
    
    The CSV file containing event data. The file must have the following columns:
    
    - **Date**: The date of the event in `YYYY-MM-DD` format.
    - **Type**: The type/category of the event (e.g., Type1, Type2).
    - **Event**: The title of the event.
    - **Description**: A brief description of the event.

### Example `events.csv`

```
csv
CopyEdit
Date,Type,Event,Description
2025-01-01,Type1,New Year Celebration,Start of the new year with celebrations worldwide.
2025-02-14,Type2,Valentine's Day,A day to celebrate love and affection.
2025-07-04,Type3,Independence Day,National holiday in the United States.
2025-12-25,Type4,Christmas Day,Holiday celebrating the birth of Jesus Christ.
2025-04-09,Type5,Project Start,The day this timeline visualization project began.

```

## Customization

### Adding More Event Types

To add more event types, update the `events.csv` file with new Type values and add corresponding styles in `style/style.css`. For example:

```css
css
CopyEdit
.tl-group-Type6 .tl-event {
    background-color: #C8E6C9 !important; /* Light Green */
    color: #1B5E20 !important;           /* Dark Green */
}

```

### Changing Timeline Options

Modify the `timelineOptions` object in `src/script.js` to customize the timeline behavior:

```
js
CopyEdit
const timelineOptions = {
    start_at_end: false,
    timenav_position: "bottom",
    groups: true // Enable grouping by the `group` property
};

```

## Troubleshooting

- **Events Not Displaying**: Ensure the `events.csv` file is correctly formatted and accessible at `data/events.csv`.
- **Colors Not Showing**: Verify that the `Type` values in the CSV file match the CSS class names (e.g., Type1, Type2).

## License

This project is open-source and available under the MIT License.

## Acknowledgments

- [TimelineJS by Knight Lab](https://timeline.knightlab.com/) for the timeline library.