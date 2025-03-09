from django.db import models
from django.contrib.auth.models import User


def user_directory_path(instance, filename):
    # file will be uploaded to MEDIA_ROOT/users/user_<id>/<filename>
    return "user_{0}/{1}".format(instance.user.id, filename)

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    avatar = models.ImageField(upload_to='users/{user_directory_path}/', blank=True, null=True)
    
    def __str__(self):
        return f'{User.first_name} {User.last_name}'