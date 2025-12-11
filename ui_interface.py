import json
import time
import random
from flask import Flask, jsonify, request

app = Flask(__name__)

# ===============================
#  Data Source (Simulated Live Data)
# ===============================
sensor_data = {
    "s1": 0,
    "s2": 0,
    "level": 0
}

# ===============================
#  API ROUTES
# ===============================

@app.route("/api/sensors", methods=["GET"])
def get_sensors():
    """
    Returns the latest sensor values + threat level.
    """
    return jsonify(sensor_data)

@app.route("/api/update", methods=["POST"])
def update_sensors():
    """
    ESP32 will POST live JSON here:
    { "s1": 123, "s2": 88, "level": 2 }
    """
    global sensor_data
    incoming = request.json

    sensor_data["s1"] = incoming.get("s1", 0)
    sensor_data["s2"] = incoming.get("s2", 0)
    sensor_data["level"] = incoming.get("level", 0)

    return jsonify({"status": "OK", "received": sensor_data})

# ===============================
#  Touchscreen Buttons Simulation
# ===============================

zoom_level = 1.0   # Initial zoom value

@app.route("/api/zoom_in", methods=["POST"])
def zoom_in():
    global zoom_level
    zoom_level += 0.2
    return jsonify({"zoom": zoom_level})


@app.route("/api/zoom_out", methods=["POST"])
def zoom_out():
    global zoom_level
    zoom_level = max(0.4, zoom_level - 0.2)
    return jsonify({"zoom": zoom_level})

# ===============================
#  Run server
# ===============================
if name == "__main__":
    print("UI Python Server Running... http://127.0.0.1:5000")
    app.run(host="0.0.0.0", port=5000)
