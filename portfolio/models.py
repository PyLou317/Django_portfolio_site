from django.db import models
from django.urls import reverse


class Technology(models.Model):
    name = models.CharField(max_length=100, unique=True, help_text="Name of the technology (e.g., Python, Django)")
    icon = models.ImageField(upload_to='technology_icons/', blank=True, null=True)
    
    class Meta:
        verbose_name_plural = "Technologies"
    
    def __str__(self):
        return self.name
    
    
class Project(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    image = models.ImageField(upload_to='project_images/', blank=True, null=True)
    github = models.URLField(blank=True, null=True)
    technologies = models.ManyToManyField(Technology, blank=True, help_text="Technology used in this project")
    TYPES = (
        ('FINANCE', 'Fiinance Tracker'),
        ('BLOG', 'Personal Blog'),
        ('WORKER_MANAGEMENT', 'Contract Worker Management'),
        ('OTHER', 'Other')
        )
    
    type = models.CharField(max_length=50,
                  choices=TYPES,
                  default="OTHER")
    
    def get_absolute_url(self):
        return reverse('project_detail', args=[str(self.id)]) 
    
    def __str__(self):
        return self.title

