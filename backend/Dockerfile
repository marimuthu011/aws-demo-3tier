# Base image
FROM python:3.11-slim

# Set working directory
WORKDIR /app

ENV PYTHONPATH=/app
# Install system dependencies
RUN apt-get update && apt-get install -y build-essential && apt-get clean

# Install Python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the project files
COPY . .

# Expose port
EXPOSE 8000

# Correct module path for uvicorn
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]
