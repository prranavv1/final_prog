import urllib.request
try:
    print("Checking API...")
    with urllib.request.urlopen("http://localhost:8000/pending-invoices") as response:
        print(f"Status: {response.getcode()}")
        print(response.read().decode('utf-8'))
except Exception as e:
    print(f"Error: {e}")
