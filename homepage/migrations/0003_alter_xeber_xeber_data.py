# Generated by Django 5.1.1 on 2024-10-17 13:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('homepage', '0002_xeber_xeber_data'),
    ]

    operations = [
        migrations.AlterField(
            model_name='xeber',
            name='xeber_data',
            field=models.DateTimeField(auto_now_add=True),
        ),
    ]