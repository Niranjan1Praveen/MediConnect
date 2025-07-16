import numpy as np
import pandas as pd
from sklearn.metrics import roc_curve, auc
import matplotlib.pyplot as plt

def simulate_dataset(n=100):
    np.random.seed(42)
    features = np.random.normal(size=(n, 13))
    weights = np.random.uniform(-1, 1, size=13)
    logits = features @ weights
    probs = 1 / (1 + np.exp(-logits))
    labels = (probs > 0.55).astype(int)
    return probs, labels

def plot_roc(probs, labels):
    fpr, tpr, thresholds = roc_curve(labels, probs)
    auc_score = auc(fpr, tpr)

    plt.figure()
    plt.plot(fpr, tpr, label=f"AUC = {auc_score:.2f}")
    plt.plot([0, 1], [0, 1], linestyle='--')
    plt.xlabel("FPR")
    plt.ylabel("TPR")
    plt.title("ROC Curve")
    plt.legend()
    plt.show()

if __name__ == "__main__":
    p, y = simulate_dataset()
    plot_roc(p, y)
