from django.db import models

# Create your models here.
class Transaction(models.Model):
    date = models.DateField
    decsription = models.CharField(max_length=255)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    category = models.CharField(max_length=100)