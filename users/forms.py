from django import forms
from .models import UserProfile

class ProfileUpdateForm(forms.ModelForm):
    first_name = forms.CharField(max_length=32)
    last_name = forms.CharField(max_length=32)
    email = forms.EmailField(max_length=50, required=False)
    
    class Meta:
        model = UserProfile
        fields = ['avatar']