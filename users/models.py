from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver


def user_directory_path(instance, filename):
    # file will be uploaded to MEDIA_ROOT/users/user_<id>/<filename>
    return "user_{0}/{1}".format(instance.user.id, filename)
    
    
class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    avatar = models.ImageField(upload_to='users/{user_directory_path}/', blank=True, null=True)
    
    def __str__(self):
        return f'Profile for {self.user.username}'
    
    
# Save instance of UserProfile when new user is created
@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created: # Check if it's a new User being created
        UserProfile.objects.create(user=instance)


@receiver(post_save, sender=User)
def save_user_profile(sender, instance, **kwargs):
    instance.profile.save()