import pandas as pd
import logging

# Configure logging
logging.basicConfig(filename='backend/app.log', level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

def process_csv(file):
    try:
        df = pd.read_csv(file)
        data = df.to_dict(orient='records')
        logging.info(f"Processed CSV with {len(data)} records")
        return data
    except Exception as e:
        logging.error(f"Error processing CSV: {str(e)}")
        raise