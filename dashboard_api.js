// ================================
//  SeaFalcon - Dashboard API Layer
// ================================

// هذا الملف يربط واجهة اللمس مع Python API ومع ESP32
// الفريق: SeaFalcon
// اللغات: JavaScript + REST API Integration

console.log("SeaFalcon Dashboard API Loaded");

// ================================
// قراءة بيانات الاهتزاز من API
// ================================

async function getSensorData() {
    try {
        const response = await fetch("http://127.0.0.1:5000/api/sensors");
        const data = await response.json();

        console.log("Sensor Data:", data);

        // هنا تقدرون تربطون الداشبورد
        updateUI(data);
    } 
    catch (error) {
        console.error("Error reading sensors:", error);
    }
}

// ================================
// إرسال أمر التكبير
// ================================

async function zoomIn() {
    try {
        const response = await fetch("http://127.0.0.1:5000/api/zoom_in", {
            method: "POST"
        });
        const result = await response.json();
        console.log("Zoom IN:", result);
    } 
    catch (error) {
        console.error("Zoom IN error:", error);
    }
}

// ================================
// إرسال أمر التصغير
// ================================

async function zoomOut() {
    try {
        const response = await fetch("http://127.0.0.1:5000/api/zoom_out", {
            method: "POST"
        });
        const result = await response.json();
        console.log("Zoom OUT:", result);
    } 
    catch (error) {
        console.error("Zoom OUT error:", error);
    }
}

// ================================
// تحديث واجهة المستخدم (UI)
// ================================

function updateUI(data) {
    const zone = document.getElementById("zone-output");
    const s1 = document.getElementById("sensor1");
    const s2 = document.getElementById("sensor2");

    if (!zone  !s1  !s2) return;

    s1.innerText = data.s1;
    s2.innerText = data.s2;

    if (data.level == 0) zone.innerText = "آمن — Safe";
    else if (data.level == 1) zone.innerText = "تنبيه — Warning";
    else if (data.level == 2) zone.innerText = "خطر — Danger";
}

// قراءة البيانات كل ثانية
setInterval(getSensorData, 1000);
