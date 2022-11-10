import os
from dotenv import load_dotenv
load_dotenv('.env')

class EmailEnvs:
    MAIL_HOST = os.getenv('MAIL_HOST')
    MAIL_USERNAME = os.getenv('MAIL_USERNAME')
    MAIL_PASSWORD = os.getenv('MAIL_PASSWORD')
    MAIL_FROM = os.getenv('MAIL_FROM')
    MAIL_PORT = int(os.getenv('MAIL_PORT'))
    MAIL_SERVER = os.getenv('MAIL_SERVER')
    MAIL_FROM_NAME = os.getenv('MAIL_FROM_NAME')
    

class DBEnvs:
    HOST = os.getenv('MYSQL_HOST')
    DB_NAME = os.getenv('MYSQL_DB_NAME')
    USERNAME = os.getenv('MYSQL_USERNAME')
    PASSWORD = os.getenv('MYSQL_PASSWORD')