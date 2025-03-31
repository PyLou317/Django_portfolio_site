from django import template
import datetime
from django.utils import timezone

register = template.Library()

@register.filter(name='greeting')
def greeting(value):
    now = timezone.localtime()
    hour = now.hour

    if 5 <= hour < 12:
        return "Morning"
    elif 12 <= hour < 17:
        return "Afternoon"
    else:
        return "Evening"