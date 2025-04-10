document.addEventListener("DOMContentLoaded", () => {
    // Global variables
    window.coloringApplied = false;
    window.eventTypeStyles = {
        Type1: { bg: '#FF5252', border: '#D50000', slideBg: '#FFEBEE', slideBorder: '#D50000', headline: '#D50000' },
        Type2: { bg: '#4DB6AC', border: '#00897B', slideBg: '#E0F2F1', slideBorder: '#00897B', headline: '#00897B' },
        Type3: { bg: '#FFD54F', border: '#FFC107', slideBg: '#FFF8E1', slideBorder: '#FFC107', headline: '#FF8F00' },
        Type4: { bg: '#9575CD', border: '#673AB7', slideBg: '#EDE7F6', slideBorder: '#673AB7', headline: '#673AB7' },
        Type5: { bg: '#81C784', border: '#43A047', slideBg: '#E8F5E9', slideBorder: '#43A047', headline: '#43A047' }
    };

    fetch("data/events.csv")
        .then(response => response.ok ? response.text() : Promise.reject(`HTTP error! Status: ${response.status}`))
        .then(data => {
            const events = parseCSV(data);
            const timelineData = convertToTimelineJSFormat(events);
            createTimeline(timelineData);
        })
        .catch(error => console.error("Error loading CSV file:", error));

    function parseCSV(data) {
        const [headers, ...lines] = data.split("\n").filter(line => line.trim() && !line.startsWith("//"));
        return lines.map(line => line.split(",").reduce((obj, value, i) => {
            obj[headers.split(",")[i].trim()] = value.trim();
            return obj;
        }, {}));
    }

    function convertToTimelineJSFormat(events) {
        window.originalEvents = events;
        window.eventHeadlineMap = {};
        return {
            title: { text: { headline: "Timeline Visualization", text: "A description of the timeline." } },
            events: events.map((event, index) => {
                window.eventHeadlineMap[event.Event.trim()] = event.Type;
                return {
                    start_date: Object.fromEntries(['year', 'month', 'day'].map((k, i) => [k, event.Date.split("-")[i]])),
                    text: { headline: event.Event, text: event.Description },
                    group: event.Type,
                    unique_id: `event-${index}`
                };
            })
        };
    }

    function createTimeline(data) {
        const options = { start_at_end: false, timenav_position: "bottom", initial_zoom: 2, scale_factor: 1, height: window.innerHeight - 40 };
        window.timeline = new TL.Timeline('timeline-embed', data, options);

        window.timeline.on("loaded", () => {
            setTimelineHeight();
            setTimeout(() => { applyColoring(); setupEventListeners(); }, 500);
        });

        window.timeline.on("change", () => setTimeout(styleActiveSlide, 500));
    }

    function setupEventListeners() {
        document.querySelectorAll('.tl-timemarker').forEach(marker => {
            marker.addEventListener('click', () => setTimeout(styleActiveSlide, 500));
        });
        setInterval(() => { if (!window.coloringApplied) applyColoring(); }, 1000);
    }

    function applyColoring() {
        window.coloringApplied = true;
        document.querySelectorAll('.tl-timemarker').forEach(marker => {
            const headline = marker.querySelector('.tl-headline')?.textContent.trim();
            const eventType = window.eventHeadlineMap[headline];
            if (eventType) applyStyles(marker.querySelector('.tl-timemarker-content-container'), eventType, 'bg', 'border');
        });
        styleActiveSlide();
    }

    function styleActiveSlide() {
        const activeSlide = document.querySelector('.tl-slide-active');
        const headline = activeSlide?.querySelector('.tl-headline')?.textContent.trim();
        const eventType = window.eventHeadlineMap[headline];
        if (eventType) applyStyles(activeSlide.querySelector('.tl-slide-content'), eventType, 'slideBg', 'slideBorder', 'headline');
    }

    function applyStyles(element, eventType, bgKey, borderKey, headlineKey) {
        if (!element) return;
        const styles = window.eventTypeStyles[eventType];
        element.style.backgroundColor = styles[bgKey];
        element.style.borderColor = styles[borderKey];
        if (headlineKey) element.querySelector('.tl-headline').style.color = styles[headlineKey];
    }

    function setTimelineHeight() {
        const timeline = document.getElementById('timeline-embed');
        if (timeline) {
            timeline.style.height = `${window.innerHeight - 40}px`;
            window.timeline?.updateDisplay();
        }
    }

    window.addEventListener('resize', () => {
        setTimelineHeight();
        setTimeout(applyColoring, 300);
    });

    window.goToTimelineEvent = function(eventHeadline) {
        const markers = document.querySelectorAll('.tl-timemarker');
        const foundIndex = Array.from(markers).findIndex(marker => marker.querySelector('.tl-headline')?.textContent.trim() === eventHeadline);
        if (foundIndex >= 0) {
            window.timeline.goTo(foundIndex);
            setTimeout(styleActiveSlide, 500);
            return true;
        }
        console.error(`Event "${eventHeadline}" not found`);
        return false;
    };
});