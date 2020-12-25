import sys
import pandas as pd
import json

jsonData = sys.stdin.readlines()
data = json.loads(sys.stdin.readlines())
data["abc"] = "an"
# jsonData = json.loads(jsonData)
# print(data["a"])
print("a")
