import numpy as np
import librosa

def extract_features(file_path):
    y, sr = librosa.load(file_path, duration=3, offset=0.5)
    mfccs = librosa.feature.mfcc(y=y, sr=sr, n_mfcc=13)
    features = np.mean(mfccs.T, axis=0)
    return features

def simulate_lr_score(features):
    np.random.seed(42)
    dummy_weights = np.random.uniform(-1, 1, size=features.shape[0])
    logit = np.dot(features, dummy_weights)
    prob = 1 / (1 + np.exp(-logit))
    return prob

def get_prediction_review(prob, threshold=0.55):
    if prob >= threshold:
        return f"Probability: {prob:.2f} → TB Likely — Persistent cough detected"
    elif 0.4 <= prob < threshold:
        return f"Probability: {prob:.2f} → Normal Cough — Monitor symptoms"
    else:
        return f"Probability: {prob:.2f} → Inconclusive — Please retest"
