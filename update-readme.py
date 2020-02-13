import datetime

with open("README.md", "a") as readme:
    readme.write(datetime.datetime.now().isoformat())