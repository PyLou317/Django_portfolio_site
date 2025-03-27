from django import forms
from crispy_forms.helper import FormHelper
from crispy_forms.layout import Layout, Submit, Field, Row, Column


class UploadFileForm(forms.Form):        
    file = forms.FileField(required=True, help_text="Please upload your bank statement here (CSV file)")

    # Form Helper (crispy)
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.helper = FormHelper()
        self.helper.form_id = "upload_form"
        self.helper.form_method = "post"
        self.helper.form_class = "mt-5"
        self.helper.label_class = 'visually-hidden'
        self.helper.field_class = '' 
        
        self.helper.layout = Layout(
            Row(
                Column(Field('file'), css_class='form-group col-md-9'),
                Column(Submit('submit', 'Upload', css_class='btn-secondar'), 
                       css_class='form-group col-md-3 d-flex align-self-start justify-content-center'),
                css_class='form-row'
                ),
    
        )