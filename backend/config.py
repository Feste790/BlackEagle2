from os import environ

class Config:
    SECRET_KEY = environ.get('SECRET_KEY', 'your-secret-key')
    SQLALCHEMY_DATABASE_URI = 'postgresql://black_eagle_db_vxro_user:1ELiP23UvExA0GUJnPEgJ0x7XeEJX4py@dpg-d0qauj15pdvs73aeu5dg-a.frankfurt-postgres.render.com/black_eagle_db_vxro'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    JWT_SECRET_KEY = environ.get('JWT_SECRET_KEY', 'your-jwt-secret-key')
    JWT_ACCESS_TOKEN_EXPIRES = 3600  # 1 hour
    CORS_ORIGINS = ["https://frontend-git-main-feste790s-projects.vercel.app"]  # Add your frontend URL