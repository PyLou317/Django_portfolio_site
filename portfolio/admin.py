from django.contrib import admin
from .models import Project, Technology


class ProjectAdmin(admin.ModelAdmin):
    list_display = ('title',)
    filter_horizontal = ('technologies',)
    
    
# Register your models here.
admin.site.register(Project)
admin.site.register(Technology)