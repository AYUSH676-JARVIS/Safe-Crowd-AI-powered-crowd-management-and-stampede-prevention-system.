document.addEventListener("DOMContentLoaded", () => {
    initClock();
    initHeatmapToggle();
    simulateMetrics();
    simulateCameraFeeds();
    bindButtons();
});


function initClock() {
    const clock = document.getElementById("clock");

    setInterval(() => {
        const now = new Date();
        clock.innerText = now.toUTCString().split(" ")[4] + " UTC";
    }, 1000);
}


function initHeatmapToggle() {
    const toggleBtn = document.querySelector(".btn-ui");
    const heatSpots = document.querySelectorAll(
        '[style*="filter:blur"]'
    );

    let enabled = true;

    toggleBtn.addEventListener("click", () => {
        enabled = !enabled;

        heatSpots.forEach(spot => {
            spot.style.display = enabled ? "block" : "none";
        });

        toggleBtn.innerText = enabled ? "Disable Heatmap" : "Enable Heatmap";
    });
}


function simulateMetrics() {
    const densityValue = document.querySelector(".stat-value");
    const entityValue = document.querySelectorAll(".stat-value")[1];
    const riskFill = document.querySelector(".risk-fill");

    setInterval(() => {
        let density = (Math.random() * 0.3 + 0.6).toFixed(2);
        let entities = Math.floor(Math.random() * 400 + 1000);

        densityValue.innerHTML = `
            ${density}
            <span style="font-size:12px; color:${density > 0.8 ? 'var(--danger)' : 'var(--warning)'}">
                ${density > 0.8 ? 'HIGH' : 'MOD'}
            </span>
        `;

        entityValue.innerText = entities.toLocaleString();

        riskFill.style.width = `${density * 100}%`;
    }, 3000);
}


function simulateCameraFeeds() {
    const cams = document.querySelectorAll(".feed-container");

    setInterval(() => {
        cams.forEach(cam => {
            if (Math.random() > 0.95) {
                cam.style.borderColor = "var(--danger)";
                cam.style.boxShadow = "0 0 10px var(--danger)";

                setTimeout(() => {
                    cam.style.borderColor = "#30363d";
                    cam.style.boxShadow = "none";
                }, 1500);
            }
        });
    }, 2000);
}


function bindButtons() {
    document.querySelectorAll(".btn-ui").forEach(btn => {
        btn.addEventListener("click", () => {
            console.log(`[SYSTEM] ${btn.innerText} triggered`);
        });
    });

    const resetBtn = document.querySelector(
        '.btn-ui[style*="danger"]'
    );

    if (resetBtn) {
        resetBtn.addEventListener("click", () => {
            alert("⚠ FEEDS RESET INITIATED");
        });
    }
}


setInterval(() => {
    const latency = document.querySelector("span[style*='14ms']");
    const accuracy = document.querySelector("span[style*='99.2']");

    if (latency && accuracy) {
        latency.innerText = `${Math.floor(Math.random() * 10 + 10)}ms`;
        accuracy.innerText = `${(Math.random() * 0.5 + 98.8).toFixed(2)}%`;
    }
}, 4000);
