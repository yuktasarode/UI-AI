#!/bin/bash

echo "Activating virtual environment..."
source chromadb/chromadb-server/bin/activate

echo "Installing dependencies"
pip install -r chromadb/requirements.txt

echo "Starting Chroma server..."
chroma run --path chromadb/chroma_store
