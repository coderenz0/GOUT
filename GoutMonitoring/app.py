from firebase_config import db
from hash_utils import sha3_hash
from datetime import datetime

patient = {
    "patientID": "P002",
    "name": "Renzy Wayne",
    "age": 21,
    "uricAcid": 8.7,
    "timestamp": datetime.now().strftime("%Y-%m-%d %H:%M:%S")
}

# Create a string to hash
data = (
    patient["patientID"] +
    patient["name"] +
    str(patient["age"]) +
    str(patient["uricAcid"]) +
    patient["timestamp"]
)

# Generate SHA3-256 hash
patient["SHA3_Hash"] = sha3_hash(data)

# Save to Firestore
db.collection("Patients").document(patient["patientID"]).set(patient)

print("Patient record saved successfully!")
print("SHA3 Hash:", patient["SHA3_Hash"])