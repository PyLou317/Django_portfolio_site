from django.db import models

# Create your models here.
class Categories(models.Model):
    name = models.CharField(max_length=100)
    
    def __str__(self):
        return self.name
    
class Transaction(models.Model):
    date = models.DateField
    decsription = models.CharField(max_length=255)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    category = models.ForeignKey(Categories, on_delete=models.CASCADE)
    
    def __str__(self):
        return self.decsription