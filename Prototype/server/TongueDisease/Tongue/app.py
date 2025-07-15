from flask import Flask, render_template, request, jsonify
import cv2
import numpy as np
from PIL import Image
import os
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
# Class labels and test directory
labels = ['red', 'black', 'geographic', 'normal', 'yellow']
test_dir = './test'  # Assumes test/red/, test/black/, etc.

# 🔍 Robust color + darkness-based rule logic
def classify_tongue_image(img):
    img_rgb = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
    img_resized = cv2.resize(img_rgb, (120, 120))

    r_mean, g_mean, b_mean = np.mean(img_resized, axis=(0, 1))

    # Gray threshold for darkness
    gray = cv2.cvtColor(img_resized, cv2.COLOR_RGB2GRAY)
    dark_ratio = np.sum(gray < 50) / gray.size

    red_dominance = r_mean - max(g_mean, b_mean)
    yellow_dominance = min(r_mean, g_mean) - b_mean

    # Rule-based predictions
    if dark_ratio > 0.25:
        return "black"
    elif red_dominance > 40 and r_mean > 150:
        return "red"
    elif yellow_dominance > 30 and r_mean > 160 and g_mean > 160:
        return "yellow"
    elif r_mean > 150 and b_mean > 150 and g_mean < 140:
        return "geographic"
    else:
        return "normal"

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/predict', methods=['POST'])
def predict():
    if 'image' not in request.files:
        return jsonify({'error': 'No image uploaded'}), 400

    file = request.files['image']
    image = Image.open(file).convert('RGB')
    image_np = np.array(image)

    result = classify_tongue_image(image_np)
    return jsonify({'prediction': result})

@app.route('/evaluate')
def evaluate_on_test_data():
    results = []
    total = 0
    correct = 0
    class_correct = {label: 0 for label in labels}
    class_total = {label: 0 for label in labels}

    for label in labels:
        folder = os.path.join(test_dir, label)
        if not os.path.exists(folder):
            continue
        for img_file in os.listdir(folder):
            try:
                img_path = os.path.join(folder, img_file)
                img = cv2.imread(img_path)
                pred = classify_tongue_image(img)
                results.append({'image': img_file, 'actual': label, 'predicted': pred})
                total += 1
                class_total[label] += 1
                if pred == label:
                    correct += 1
                    class_correct[label] += 1
            except Exception as e:
                print(f"Error processing {img_file}: {e}")

    accuracy = correct / total if total > 0 else 0

    class_accuracy = {
        label: round((class_correct[label] / class_total[label]) * 100, 2) if class_total[label] > 0 else 0.0
        for label in labels
    }

    return jsonify({
        "total_images": total,
        "correct_predictions": correct,
        "overall_accuracy": round(accuracy * 100, 2),
        "classwise_accuracy": class_accuracy,
        "preview": results[:10]  # Only show first 10
    })

if __name__ == '__main__':
    app.run(debug=True)
