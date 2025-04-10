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
        // Create a map of event types to a consistent color scheme
        const eventTypes = [...new Set(events.map(event => event.Type))];
        const colorMap = {};
        
        // Assign a color class to each unique event type
        eventTypes.forEach((type, index) => {
            // We have styles for Type1 through Type5 in the CSS
            // If we have more than 5 types, we'll cycle through them
            const colorIndex = (index % 5) + 1;
            colorMap[type] = `event-type-Type${colorIndex}`;
        });
        
        console.log("Event type to color mapping:", colorMap);
        
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
                // Get the appropriate class for this event type
                const cssClass = colorMap[event.Type];
                
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
                    group: event.Type,
                    // Set class name based on event type for styling
                    unique_id: cssClass,
                    // Also add as a regular class for easier CSS targeting
                    classname: cssClass,
                    background: {
                        // This ensures background colors work properly
                        color: getBackgroundColorForType(cssClass)
                    },
                    // Add important metadata for custom styling later
                    display_date: event.Date,
                    data: {
                        type: event.Type,
                        cssClass: cssClass
                    }
                };
            })
        };
    }
    
    // Helper function to get appropriate background colors
    function getBackgroundColorForType(cssClass) {
        const colors = {
            'event-type-Type1': '#90CAF9',  // Light Blue
            'event-type-Type2': '#FFCDD2',  // Light Red
            'event-type-Type3': '#A5D6A7',  // Light Green
            'event-type-Type4': '#9575CD',  // Deep Purple
            'event-type-Type5': '#81C784'   // Green
        };
        return colors[cssClass] || '#FFFFFF'; // Default white if not found
    }

    // Function to create the timeline
    function createTimeline(data) {
        const options = { 
            start_at_end: false, 
            timenav_position: "bottom",
            group: true, // Enable grouping by the group property
            default_bg_color: "#FFFFFF" // Set default background color
        };
        
        window.timeline = new TL.Timeline('timeline-embed', data, options);
        
        // Apply custom styling after timeline is created
        // Use multiple attempts with progressive delays to ensure elements are rendered
        setTimeout(() => applyCustomEventStyling(), 100);
        setTimeout(() => applyCustomEventStyling(), 500);
        setTimeout(() => applyCustomEventStyling(), 1000);
        
        // Add an event listener for timeline loaded event if available
        if (window.timeline.on) {
            window.timeline.on('loaded', function() {
                applyCustomEventStyling();
            });
        }
    }
    
    // Function to apply custom styling to timeline elements after they are rendered
    function applyCustomEventStyling() {
        console.log("Applying custom styling to timeline elements...");
        
        // First, try to style all timeline markers
        const timelineMarkers = document.querySelectorAll('.tl-timemarker');
        console.log(`Found ${timelineMarkers.length} timeline markers`);
        
        timelineMarkers.forEach(marker => {
            const uniqueId = marker.getAttribute('data-unique-id');
            
            if (uniqueId && uniqueId.includes('event-type-')) {
                // Add the class directly to the marker
                marker.classList.add(uniqueId);
                
                // Apply to all content containers inside this marker
                const contentContainers = marker.querySelectorAll('.tl-timemarker-content-container');
                contentContainers.forEach(container => {
                    container.classList.add(uniqueId);
                    
                    // Apply direct styling for immediate effect
                    const bgColor = getBackgroundColorForType(uniqueId);
                    container.style.backgroundColor = bgColor;
                    
                    // Set text color to white for better contrast
                    container.style.color = "#FFFFFF";
                    
                    // Add border styling
                    if (bgColor) {
                        const borderColor = bgColor.replace('F9', 'E5').replace('D2', 'BF').replace('A7', '93'); // Darker version
                        container.style.borderColor = borderColor;
                    }
                });
                
                // Also try to find and style the line element
                const lineElement = marker.querySelector('.tl-timemarker-line');
                if (lineElement) {
                    lineElement.classList.add(uniqueId);
                    // Set the line color to match the event type
                    if (uniqueId) {
                        lineElement.style.backgroundColor = getBackgroundColorForType(uniqueId);
                    }
                }
                
                // Style the time span element if present
                const timeSpan = marker.querySelector('.tl-timemarker-timespan');
                if (timeSpan) {
                    timeSpan.classList.add(uniqueId);
                    if (uniqueId) {
                        timeSpan.style.backgroundColor = getBackgroundColorForType(uniqueId);
                    }
                }
            }
        });
        
        // Next, style all slides
        const slides = document.querySelectorAll('.tl-slide');
        console.log(`Found ${slides.length} timeline slides`);
        
        slides.forEach(slide => {
            const uniqueId = slide.getAttribute('data-unique-id');
            
            if (uniqueId && uniqueId.includes('event-type-')) {
                // Add the class to the slide
                slide.classList.add(uniqueId);
                
                // Apply to slide content
                const slideContent = slide.querySelector('.tl-slide-content');
                if (slideContent) {
                    slideContent.classList.add(uniqueId);
                }
                
                // Apply to slide container
                const slideContainer = slide.querySelector('.tl-slide-container');
                if (slideContainer) {
                    slideContainer.classList.add(uniqueId);
                }
                
                // Style headline text for better visibility
                const headlines = slide.querySelectorAll('.tl-headline');
                headlines.forEach(headline => {
                    headline.classList.add(uniqueId);
                });
            }
        });
        
        console.log("Custom styling applied to timeline elements");
    }
});