# Generated by Django 4.1.4 on 2023-08-16 17:14

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Document',
            fields=[
                ('id_document', models.AutoField(primary_key=True, serialize=False)),
                ('numero_document', models.CharField(max_length=20)),
                ('designation_document', models.CharField(max_length=100)),
                ('observation_document', models.TextField(blank=True)),
            ],
        ),
    ]
