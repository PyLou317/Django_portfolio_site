from django import forms
from .models import UserProfile
from crispy_forms.helper import FormHelper
from crispy_forms.layout import Layout, Submit, HTML, MultiField, Div, Field

class ProfileUpdateForm(forms.ModelForm):
    first_name = forms.CharField(max_length=32)
    last_name = forms.CharField(max_length=32)
    email = forms.EmailField(max_length=50, required=False)
    
    class Meta:
        model = UserProfile
        fields = ['avatar']
    
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.helper = FormHelper()
        self.helper.form_class = 'form-horizontal'
        self.helper.label_class = 'col-lg-3'
        self.helper.field_class = 'col-lg-9'
        self.helper.layout = Layout(
                HTML("""
                    <div class="form-group text-center">
                        {% if form.instance.avatar %}
                            <img src="{{ form.instance.avatar.url }}" alt="Current Avatar" class="img-fluid my-3" style="max-width: 200px; max-height: 200px; border-radius: 50%;">
                        {% else %}
                            <p>No Profile Picture</p>
                            <i class="bi bi-person-circle" style="font-size: 5rem;"></i> <p class="text-muted">Default Avatar</p>
                        {% endif %}
                    </div>
                """),
                'avatar',
                Div(
                    Field('first_name', label="First Name", css_class='form-control-lg'),
                    'first_name.errors',
                    Field('last_name', label="Last Name", css_class='form-control-lg'),
                    'last_name.errors'
                ),
                Field('email', label="Email", help_text="We'll never share your email with anyone else."    ),
                Submit('submit', 'Save Changes', css_class="btn btn-dark btn-block"),
            )