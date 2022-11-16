# Deprecated For now
import os
from fastapi_mail import ConnectionConfig, FastMail, MessageSchema, MessageType
from dotenv import load_dotenv

from . import schemas, models
load_dotenv('.env')


class EmailEnvs:
    MAIL_HOST = os.getenv('MAIL_HOST')
    MAIL_USERNAME = os.getenv('MAIL_USERNAME')
    MAIL_PASSWORD = os.getenv('MAIL_PASSWORD')
    MAIL_FROM = os.getenv('MAIL_FROM')
    MAIL_PORT = int(os.getenv('MAIL_PORT'))
    MAIL_SERVER = os.getenv('MAIL_SERVER')
    MAIL_FROM_NAME = os.getenv('MAIL_FROM_NAME')
    
class Email:
    def __init__(self, recipients):
        self.recipients = recipients
        
    def sendEmail(self, subject="Hello from HKUviz", html="""<p>Hi this test mail, thanks for using Fastapi-mail</p> """):
        conf = ConnectionConfig(
            MAIL_USERNAME = EmailEnvs.MAIL_USERNAME,
            MAIL_PASSWORD = EmailEnvs.MAIL_PASSWORD,
            MAIL_FROM = EmailEnvs.MAIL_FROM,
            MAIL_PORT = EmailEnvs.MAIL_PORT,
            MAIL_SERVER = EmailEnvs.MAIL_HOST,
            MAIL_STARTTLS = False,
            MAIL_SSL_TLS = True,
            USE_CREDENTIALS = True,
            VALIDATE_CERTS = True
        )
        
        message = MessageSchema(
            subject=subject,
            recipients=self.recipients,
            body=html,
            subtype=MessageType.html
        )
        print("hello")
        fm = FastMail(conf)
        fm.send_message(message)