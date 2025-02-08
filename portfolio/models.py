from django.db import models
from django.urls import reverse

# Create your models here.
class Project(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    image = models.ImageField(upload_to='project_images/', blank=True, null=True)
    link = models.URLField(blank=True, null=True)
    
    def get_absolute_url(self):
        return reverse('project_detail', args=[str(self.id)]) 
    
    def __str__(self):
        return self.title