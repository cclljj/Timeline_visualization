document.addEventListener("DOMContentLoaded", () => {
    // Global flag to track if coloring has been applied
    window.coloringApplied = false;

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
            console.log("Parsed events:", events);
            const timelineData = convertToTimelineJSFormat(events);
            createTimeline(timelineData);
        })
        .catch(error => console.error("Error loading CSV file:", error));

    // Parse CSV data into an array of objects
    function parseCSV(data) {
        const lines = data.split("\n").filter(line => line.trim() !== "" && !line.startsWith("//"));
        const headers = lines[0].split(",");
        return lines.slice(1).map(line => {
            const values = line.split(",");
            return headers.reduce((obj, header, index) => {
                obj[header.trim()] = values[index]?.trim() || "";
                return obj;
            }, {});
        });
    }

    // Convert parsed events to TimelineJS data format
    function convertToTimelineJSFormat(events) {
        window.originalEvents = events;
        window.eventHeadlineMap = {};
        const timelineData = {
            title: {
                text: {
                    headline: "Timeline Visualization",
                    text: "A description of the timeline."
                }
            },
            events: events.map((event, index) => {
                // Map headline to event type for reliable reference
                window.eventHeadlineMap[event.Event.trim()] = event.Type;
                return {
                    start_date: {
                        year: event.Date.split("-")[0],
                        month: event.Date.split("-")[1],
                        day: event.Date.split("-")[2],
                    },
                    text: {
                        headline: event.Event,
                        text: event.Description,
                    },
                    group: event.Type,
                    unique_id: `event-${index}`
                };
            }),
        };
        return timelineData;
    }

    // Create TimelineJS timeline instance
    function createTimeline(data) {
        const timelineOptions = {
            start_at_end: false,
            timenav_position: "bottom",
            initial_zoom: 2,
            scale_factor: 1,
            height: window.innerHeight - 40
        };
        window.timeline = new TL.Timeline('timeline-embed', data, timelineOptions);
        window.timeline.on("loaded", function() {
            console.log("Timeline loaded");
            setTimelineHeight();
            // Allow enough delay for TimelineJS to finish rendering before applying our color styles
            setTimeout(applyColoring, 500);
            setupEventListeners();
        });
        // When slide changes, wait a bit and then style the active slide
        window.timeline.on("change", function() {
            console.log("Timeline slide changed");
            setTimeout(styleActiveSlide, 500);
        });
    }

    // Set up click listeners on timeline markers
    function setupEventListeners() {
        console.log("Setting up event listeners on timeline markers");
        document.querySelectorAll('.tl-timemarker').forEach(marker => {
            marker.addEventListener('click', function() {
                console.log("Marker click detected");
                // Wait for TimelineJS to update the view fully
                setTimeout(styleActiveSlide, 500);
            });
        });
        // Reapply coloring periodically
        setInterval(function() {
            if (!window.coloringApplied) {
                applyColoring();
            }
        }, 1000);
    }

    // Apply coloring styles to timeline markers and active slide
    function applyColoring() {
        console.log("Applying coloring to timeline elements");
        window.coloringApplied = true;
        document.querySelectorAll('.tl-timemarker').forEach(marker => {
            const headline = marker.querySelector('.tl-headline');
            if (!headline) return;
            const headlineText = headline.textContent.trim();
            const eventType = window.eventHeadlineMap[headlineText];
            if (eventType) {
                marker.setAttribute('data-type', eventType);
                const container = marker.querySelector('.tl-timemarker-content-container');
                if (container) {
                    container.setAttribute('data-type', eventType);
                    applyColorToContainer(container, eventType);
                }
            }
        });
        styleActiveSlide();
    }

    // Apply direct inline styles to marker containers based on event type
    function applyColorToContainer(container, eventType) {
        switch (eventType) {
            case 'Type1':
                container.style.backgroundColor = '#FF5252';
                container.style.borderColor = '#D50000';
                break;
            case 'Type2':
                container.style.backgroundColor = '#4DB6AC';
                container.style.borderColor = '#00897B';
                break;
            case 'Type3':
                container.style.backgroundColor = '#FFD54F';
                container.style.borderColor = '#FFC107';
                break;
            case 'Type4':
                container.style.backgroundColor = '#9575CD';
                container.style.borderColor = '#673AB7';
                break;
            case 'Type5':
                container.style.backgroundColor = '#81C784';
                container.style.borderColor = '#43A047';
                break;
        }
    }

    // Style the active slide (top area) according to the active event type
    function styleActiveSlide() {
        const activeSlide = document.querySelector('.tl-slide-active');
        if (!activeSlide) {
            console.log("No active slide found");
            return;
        }
        const headline = activeSlide.querySelector('.tl-headline');
        if (!headline) {
            console.log("No headline found in active slide");
            return;
        }
        const headlineText = headline.textContent.trim();
        const eventType = window.eventHeadlineMap[headlineText];
        if (!eventType) {
            console.log(`No event type found for headline: ${headlineText}`);
            return;
        }
        console.log(`Styling active slide: ${headlineText} (${eventType})`);
        const slideContent = activeSlide.querySelector('.tl-slide-content');
        if (slideContent) {
            slideContent.setAttribute('data-type', eventType);
            switch (eventType) {
                case 'Type1':
                    slideContent.style.backgroundColor = '#FFEBEE';
                    slideContent.style.borderColor = '#D50000';
                    slideContent.style.borderLeft = '5px solid #D50000';
                    headline.style.color = '#D50000';
                    break;
                case 'Type2':
                    slideContent.style.backgroundColor = '#E0F2F1';
                    slideContent.style.borderColor = '#00897B';
                    slideContent.style.borderLeft = '5px solid #00897B';
                    headline.style.color = '#00897B';
                    break;
                case 'Type3':
                    slideContent.style.backgroundColor = '#FFF8E1';
                    slideContent.style.borderColor = '#FFC107';
                    slideContent.style.borderLeft = '5px solid #FFC107';
                    headline.style.color = '#FF8F00';
                    break;
                case 'Type4':
                    slideContent.style.backgroundColor = '#EDE7F6';
                    slideContent.style.borderColor = '#673AB7';
                    slideContent.style.borderLeft = '5px solid #673AB7';
                    headline.style.color = '#673AB7';
                    break;
                case 'Type5':
                    slideContent.style.backgroundColor = '#E8F5E9';
                    slideContent.style.borderColor = '#43A047';
                    slideContent.style.borderLeft = '5px solid #43A047';
                    headline.style.color = '#43A047';
                    break;
            }
        }
    }

    // Adjust timeline container height to fill viewport
    function setTimelineHeight() {
        const timeline = document.getElementById('timeline-embed');
        if (timeline) {
            const availableHeight = window.innerHeight - 40;
            timeline.style.height = `${availableHeight}px`;
            if (window.timeline) {
                window.timeline.updateDisplay();
            }
        }
    }

    window.addEventListener('resize', function() {
        setTimelineHeight();
        setTimeout(applyColoring, 300);
    });
    
    // Public method to navigate to an event externally
    window.goToTimelineEvent = function(eventHeadline) {
        if (!window.eventHeadlineMap || !window.eventHeadlineMap[eventHeadline]) {
            console.error(`Event "${eventHeadline}" not found`);
            return false;
        }
        const markers = document.querySelectorAll('.tl-timemarker');
        let foundIndex = -1;
        markers.forEach((marker, index) => {
            const headline = marker.querySelector('.tl-headline');
            if (headline && headline.textContent.trim() === eventHeadline) {
                foundIndex = index;
            }
        });
        if (foundIndex >= 0 && window.timeline) {
            console.log(`External navigation to "${eventHeadline}" at index ${foundIndex}`);
            window.timeline.goTo(foundIndex);
            setTimeout(styleActiveSlide, 500);
            return true;
        }
        return false;
    };
});