from users.models import UserProfile
from django.core.exceptions import ObjectDoesNotExist

def user_profile_data(request):
    user = request.user
    user_profile = None

    if user.is_authenticated:
        try:
            user_profile = UserProfile.objects.get(user=user)
        except ObjectDoesNotExist:
            pass

    return {'user_profile': user_profile}