document.addEventListener("DOMContentLoaded", () => {
    // Fetch the CSV file
    fetch("data/events.csv")
        .then(response => response.text())
        .then(data => {
            // Parse CSV data
            const events = parseCSV(data);
            // Convert to TimelineJS format
            const timelineData = convertToTimelineJSFormat(events);
            // Create the timeline
            createTimeline(timelineData);
        })
        .catch(error => console.error("Error loading CSV file:", error));

    // Function to parse CSV data
    function parseCSV(data) {
        const lines = data.split("\n").filter(line => line.trim() !== "");
        const headers = lines[0].split(",");
        
        return lines.slice(1).map(line => {
            const values = line.split(",");
            return headers.reduce((obj, header, index) => {
                obj[header.trim()] = values[index] ? values[index].trim() : "";
                return obj;
            }, {});
        });
    }

    // Function to convert data to TimelineJS format
    function convertToTimelineJSFormat(events) {
        return {
            title: {
                text: {
                    headline: "Timeline Visualization",
                    text: "Events from CSV data"
                }
            },
            events: events.map(event => {
                // Parse date into year, month, day
                const dateParts = event.Date.split("-");
                return {
                    start_date: {
                        year: dateParts[0],
                        month: dateParts[1],
                        day: dateParts[2]
                    },
                    text: {
                        headline: event.Event,
                        text: event.Description
                    },
                    group: event.Type
                };
            })
        };
    }

    // Function to create the timeline
    function createTimeline(data) {
        const options = { 
            start_at_end: false, 
            timenav_position: "bottom",
            group: true // Enable grouping by the group property
        };
        
        window.timeline = new TL.Timeline('timeline-embed', data, options);
    }
});