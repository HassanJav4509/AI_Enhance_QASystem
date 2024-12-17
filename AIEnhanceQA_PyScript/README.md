# Python Script - README

## Overview

This Python script is designed to process uploaded document chunks, extract topics using Natural Language Processing (NLP) techniques, and update existing metadata in Pinecone, a vector database. It integrates OpenAI for generating embeddings and uses Latent Dirichlet Allocation (LDA) for topic modeling.

## Features

1. **Chunk Metadata Update**: Updates only the `topics` field of existing metadata in Pinecone.
2. **Embedding Generation**: Uses OpenAI's embedding model (`text-embedding-ada-002`) for text vectorization.
3. **Topic Extraction**: Applies LDA to generate meaningful topics from text chunks.
4. **Error Handling**: Robust checks for missing files, invalid namespaces, and other edge cases.

## Prerequisites

1. **Python**: Ensure Python 3.8 or higher is installed.
2. **Dependencies**: Install required libraries from `requirements.txt`.
3. **Pinecone Account**: Set up Pinecone and create an index.
4. **OpenAI Account**: Obtain an API key for OpenAI services.

## Setup Instructions

### Step 1: Clone the Repository

```bash
git clone <repository_url>
cd PythonScript
```

### Step 2: Create and Activate Virtual Environment

```bash
python3 -m venv venv
source venv/bin/activate
```

### Step 3: Install Dependencies

```bash
pip install -r requirements.txt
```

### Step 4: Configure Environment Variables

Create a `.env` file in the root directory with the following content:

```
PINECONE_API_KEY=your_pinecone_api_key
PINECONE_INDEX_NAME=your_index_name
PINECONE_REGION=your_pinecone_region
OPENAI_API_KEY=your_openai_api_key
```

### Step 5: Run the Application

Start the Flask server:

```bash
python script.py
```

The application will run on `http://127.0.0.1:5000` by default.

## API Endpoints

### 1. `POST /update-chunk`

**Description**: Updates the `topics` field in metadata for a specific chunk in Pinecone.

#### Request Parameters:

- `namespace`: Namespace in Pinecone where the document resides.
- `document_id`: Unique identifier of the document chunk.
- `chunk_text`: The text content of the chunk.

#### Response:

- `200 OK`: Metadata successfully updated.
- `400 Bad Request`: Missing parameters.
- `500 Internal Server Error`: Server error.

#### Example cURL Command:

```bash
curl -X POST http://127.0.0.1:5000/update-chunk \
  -F "namespace=docs_example" \
  -F "document_id=example-0" \
  -F "chunk_text=This is a sample text chunk."
```

## Code Structure

### Main Components:

1. **Flask API**:
    - Handles requests for metadata updates.
    - Validates inputs and generates responses.

2. **Topic Modeling**:
    - Utilizes CountVectorizer and LDA for extracting topics.

3. **Pinecone Integration**:
    - Updates existing vector metadata while retaining other fields.

4. **Environment Configuration**:
    - Manages API keys and region details via `.env`.

## Challenges

1. **Metadata Update**: Ensuring only the `topics` field is updated without overwriting other metadata.
2. **Chunk Processing**: Handling diverse text structures while maintaining efficiency.
3. **Integration**: Managing connections to Pinecone and OpenAI seamlessly.

## Assumptions

1. Chunks are pre-processed and passed to the API for topic updates.
2. Pinecone and OpenAI keys are valid and correctly configured.
3. Text chunks are clean and well-formed for NLP processing.

## Acknowledgments

- **Pinecone**: For vector database services.
- **OpenAI**: For embedding generation.
- **Flask**: For web framework support.
- **Scikit-learn**: For LDA-based topic modeling.

## License

This project is licensed under the MIT License.

