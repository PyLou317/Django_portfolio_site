# Generated by Django 5.1.7 on 2025-04-04 05:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('finance_tracker', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='transaction',
            name='notes',
            field=models.TextField(blank=True, null=True),
        ),
    ]
