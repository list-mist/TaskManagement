# Generated by Django 4.0.4 on 2022-05-27 17:49

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('todo', '0002_category_create_by'),
    ]

    operations = [
        migrations.RenameField(
            model_name='category',
            old_name='create_by',
            new_name='create_by_id',
        ),
    ]