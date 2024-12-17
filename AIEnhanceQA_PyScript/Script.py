from flask import Flask, request, jsonify
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.decomposition import LatentDirichletAllocation
from pinecone import Pinecone, ServerlessSpec
import os
import openai
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Initialize Flask app
app = Flask(__name__)

# Pinecone API Key and Index Information
PINECONE_API_KEY = os.getenv("PINECONE_API_KEY")
PINECONE_INDEX_NAME = os.getenv("PINECONE_INDEX_NAME")
PINECONE_REGION = os.getenv("PINECONE_REGION")

openai.api_key = os.getenv("OPENAI_API_KEY")

# Initialize Pinecone client
pinecone_client = Pinecone(api_key=PINECONE_API_KEY)

# Check if the index exists; if not, create it
if PINECONE_INDEX_NAME not in [idx.name for idx in pinecone_client.list_indexes()]:
    pinecone_client.create_index(
        name=PINECONE_INDEX_NAME,
        dimension=1536,  # Adjust to match the dimension of your embeddings
        metric="cosine",
        spec=ServerlessSpec(
            cloud="aws",
            region=PINECONE_REGION
        )
    )

pinecone_index = pinecone_client.Index(PINECONE_INDEX_NAME)


def preprocess_text(documents):
    """
    Preprocess text for topic modeling using CountVectorizer.
    """
    vectorizer = CountVectorizer(
        stop_words="english",
        max_df=1.0,
        min_df=1,
        max_features=1000
    )
    dtm = vectorizer.fit_transform(documents)
    return dtm, vectorizer


def extract_topics(dtm, vectorizer, num_topics=5, num_words=10):
    """
    Extract topics from the document-term matrix (DTM) using LDA.
    """
    lda = LatentDirichletAllocation(n_components=num_topics, random_state=42)
    lda.fit(dtm)

    topics = []
    for topic in lda.components_:
        topic_words = [vectorizer.get_feature_names_out()[i] for i in topic.argsort()[-num_words:]]
        topics.append(", ".join(topic_words))  # Convert the list of words into a single string
    return topics


def update_chunk_metadata(index, document_id, namespace, new_topics):
    """
    Update only the 'topics' field in the metadata for a specific chunk in Pinecone.
    """
    # Fetch the existing vector
    current_vectors = index.fetch([document_id], namespace=namespace)
    if document_id not in current_vectors.get("vectors", {}):
        raise RuntimeError(f"Document ID {document_id} not found in namespace {namespace}.")

    # Retrieve the existing metadata and vector values
    existing_vector = current_vectors["vectors"][document_id]["values"]
    existing_metadata = current_vectors["vectors"][document_id].get("metadata", {})

    # Update the 'topics' field in the metadata
    existing_metadata["topics"] = existing_metadata.get("topics", []) + new_topics

    # Upsert the updated metadata along with the existing vector
    index.upsert(
        vectors=[
            {
                "id": document_id,
                "values": existing_vector,
                "metadata": existing_metadata
            }
        ],
        namespace=namespace
    )


@app.route("/update-chunk", methods=["POST"])
def update_chunk():
    try:
        # Parse JSON payload
        data = request.get_json()
        if not data:
            return jsonify({"error": "Invalid JSON payload"}), 400

        namespace = data.get("namespace")
        document_id = data.get("document_id")
        chunk_text = data.get("chunk_text")

        if not namespace or not document_id or not chunk_text:
            return jsonify({"error": "Namespace, document_id, and chunk_text are required"}), 400

        # Generate topics for the chunk text
        dtm, vectorizer = preprocess_text([chunk_text])
        new_topics = extract_topics(dtm, vectorizer)

        # Update only the 'topics' field in the metadata
        update_chunk_metadata(pinecone_index, document_id, namespace, new_topics)

        return jsonify({
            "status": "success",
            "document_id": document_id,
            "namespace": namespace,
            "updated_topics": new_topics
        }), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500



# Start the Flask app
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
