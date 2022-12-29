import datetime

from backend.src.email import email_sender


def send_email(recipients, content, subject):
    email_sender.send_email(recipients, content, subject)
    
    
def get_current_year():
    now = datetime.datetime.now()
    return now.year