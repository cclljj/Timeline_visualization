document.addEventListener("DOMContentLoaded", () => {
    // Fetch the CSV file
    fetch("data/events.csv")
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.text();
        })
        .then(data => {
            const events = parseCSV(data);
            const timelineData = convertToTimelineJSFormat(events);
            createTimeline(timelineData);
        })
        .catch(error => console.error("Error loading CSV file:", error));

    // Parse CSV data into an array of objects
    function parseCSV(data) {
        const lines = data.split("\n").filter(line => line.trim() !== "");
        const headers = lines[0].split(",");
        return lines.slice(1).map(line => {
            const values = line.split(",");
            return headers.reduce((obj, header, index) => {
                obj[header.trim()] = values[index]?.trim() || "";
                return obj;
            }, {});
        });
    }

    function convertToTimelineJSFormat(events) {
        return {
            title: {
                text: {
                    headline: "Timeline Visualization",
                    text: "A description of the timeline."
                }
            },
            events: events.map(event => ({
                start_date: {
                    year: event.Date.split("-")[0],
                    month: event.Date.split("-")[1],
                    day: event.Date.split("-")[2],
                },
                text: {
                    headline: event.Event,
                    text: event.Description,
                },
                group: event.Type // Ensure this matches the Type column in the CSV
            })),
        };
    }

    // Create the TimelineJS timeline
    function createTimeline(data) {
        const timelineOptions = {
            start_at_end: false,
            timenav_position: "bottom",
            groups: true // Enable grouping by the `group` property
        };
        window.timeline = new TL.Timeline("timeline-embed", data, timelineOptions);
    }
});