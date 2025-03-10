from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from django.views.generic.edit import UpdateView
from django.contrib.auth.mixins import LoginRequiredMixin
from .models import UserProfile
from .forms import ProfileUpdateForm
from django.urls import reverse

@login_required
def user_profile(request):
    user = request.user
    user_profile = request.user.profile
    context = {
        'user': user,
        'user_profile': user_profile
    }
    return render(request, 'users/profile.html', context)



class UserSettings(LoginRequiredMixin, UpdateView):
    template_name = 'users/update_profile.html'
    context_object_name = 'user'
    queryset = UserProfile.objects.all()
    form_class = ProfileUpdateForm

    def get_success_url(self):
        return reverse('users:profile_home', kwargs={'pk': self.get_object().id})

    def get_context_data(self, **kwargs):
        context = super(UserSettings, self).get_context_data(**kwargs)
        user = self.request.user
        context['profile_form'] = ProfileUpdateForm(
            instance=self.request.user.profile,
            initial={'first_name': user.first_name, 'last_name': user.last_name}
        )
        return context

    def form_valid(self, form):
        profile = form.save()
        user = profile.user
        user.last_name = form.cleaned_data['last_name']
        user.first_name = form.cleaned_data['first_name']
        user.save()