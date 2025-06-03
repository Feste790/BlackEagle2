import requests
from config import Config
import logging

# Configure logging
logging.basicConfig(filename='backend/app.log', level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

def get_movie_from_omdb(title):
    try:
        url = f"http://www.omdbapi.com/?t={title}&apikey={Config.OMDB_API_KEY}"
        response = requests.get(url)
        response.raise_for_status()
        data = response.json()
        if data.get('Response') == 'True':
            logging.info(f"Successfully fetched data for {title}")
            return data
        logging.warning(f"No data found for {title}")
        return None
    except Exception as e:
        logging.error(f"Error fetching OMDB data for {title}: {str(e)}")
        return None