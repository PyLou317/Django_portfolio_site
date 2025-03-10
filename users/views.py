from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from django.views.generic.edit import UpdateView, ModelFormMixin
from django.contrib.auth.mixins import LoginRequiredMixin
from django.contrib.messages.views import SuccessMessageMixin
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



class UserSettings(LoginRequiredMixin, UpdateView, ModelFormMixin):
    template_name = 'users/update_profile.html'
    form_class = ProfileUpdateForm

    def get_object(self, queryset=None):
        return self.request.user.profile

    def get_form_kwargs(self):
        kwargs = super().get_form_kwargs()
        kwargs['instance'] = self.get_object()
        kwargs['initial'] = {
            'first_name': self.request.user.first_name, 
            'last_name': self.request.user.last_name,
            'user_email': self.request.user.email
        }
        return kwargs

    def form_valid(self, form):
        print(form.cleaned_data) 
        user = self.request.user
        user.first_name = form.cleaned_data['first_name']
        user.last_name = form.cleaned_data['last_name']
        user.email = form.cleaned_data['email']
        print(user.__dict__)
        user.save()
        print(self.get_object().__dict__)
        form.save()
        return super().form_valid(form)
    
    def get_success_url(self):
        return reverse('users:profile_home')
    
    def get_context_data(self, **kwargs):
        return super().get_context_data(**kwargs)