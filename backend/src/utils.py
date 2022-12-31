import datetime
from collections import Counter

from backend.src.email import email_sender


def send_email(recipients, content, subject):
    email_sender.send_email(recipients, content, subject)


def get_current_year():
    now = datetime.datetime.now()
    return now.year


def extract_sub_dict(dct: dict, included_keys: list[str]):
    return {k: v for k, v in dct.items() if k in included_keys}


def capitalize_variable(var_name: str):
    """
    capitalizing a variable

    e.g. a_bcD -> ABcD

    :param var_name: name of variable in string
    :return: capitalized name
    """

    return ''.join([str(_).capitalize() for _ in var_name.split('_')])


def count_enum(values, enumTy):
    """
    Count enum in list
    :param values: list of enum value
    :param enumTy: enum type
    :return: { enum key: count }
    """
    return {k.value: 0 for k in enumTy} | Counter(values)
