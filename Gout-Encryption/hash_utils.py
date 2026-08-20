import hashlib

def sha3_hash(data):
    return hashlib.sha3_256(data.encode()).hexdigest()