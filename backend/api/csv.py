from flask import Blueprint, jsonify, request
from services.csv_service import process_csv
import logging

csv_bp = Blueprint('csv', __name__)

# Configure logging
logging.basicConfig(filename='backend/app.log', level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

@csv_bp.route('/upload-csv', methods=['POST'])
def upload_csv():
    try:
        if 'file' not in request.files:
            logging.warning('No file part in the request')
            return jsonify({'error': 'No file part'}), 400
        file = request.files['file']
        if file.filename == '':
            logging.warning('No selected file')
            return jsonify({'error': 'No selected file'}), 400
        result = process_csv(file)
        logging.info(f"CSV processed successfully: {file.filename}")
        return jsonify({'message': 'CSV processed', 'data': result}), 200
    except Exception as e:
        logging.error(f"Error processing CSV: {str(e)}")
        return jsonify({'error': f"Error processing CSV: {str(e)}"}), 500