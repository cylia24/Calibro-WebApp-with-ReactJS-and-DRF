# Generated by Django 4.1.4 on 2023-08-30 19:34

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('instruments', '0004_alter_operationetalonnage_observation_etalonnage_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='operationetalonnage',
            name='observation_etalonnage',
            field=models.CharField(choices=[('Conforme', 'Conforme'), ('Reforme', 'Reforme')], max_length=8),
        ),
    ]
