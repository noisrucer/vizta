import datetime

from backend.src.email import email_sender


def send_email(recipients, content, subject):
    email_sender.send_email(recipients, content, subject)
    
    
def get_current_year():
    now = datetime.datetime.now()
    return now.year


def extract_sub_dict(dct: dict, included_keys: list[str]):
    return {k:v for k,v in dct.items() if k in included_keys}