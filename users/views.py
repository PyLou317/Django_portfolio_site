from django.shortcuts import render
from django.contrib.auth.decorators import login_required

@login_required
def user_profile(request):
    user = request.user
    user_profile = request.user.profile
    context = {
        'user': user,
        'user_profile': user_profile
    }
    return render(request, 'users/profile.html', context)