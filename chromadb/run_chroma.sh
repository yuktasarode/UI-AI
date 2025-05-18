#!/bin/bash

echo "Activating virtual environment..."
source chromadb-server/bin/activate

echo "Installing dependencies"
pip install -r requirements.txt

echo "Starting Chroma server..."
chroma run --path chroma_store
