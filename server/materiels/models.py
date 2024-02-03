from django.db import models
# from instruments.models import Type

class Materiel(models.Model):
    id_materiel = models.AutoField(primary_key=True)
    reference_materiel = models.CharField(max_length=11, null=True, blank=True)
    numero_interne_materiel = models.CharField(max_length=100, unique=True, null=False, blank=False)
    designation_materiel = models.CharField(max_length=100, null=False, blank=False)
    certificat = models.CharField(max_length=100, null=True)
    date_emission = models.DateField()
    etat_materiel = models.CharField(max_length=7, choices=[('Actif', 'Actif'), ('Inactif', 'Inactif')])
    observation_materiel = models.TextField(blank=True)
    # type_materiel = models.ForeignKey(Type, on_delete=models.SET_NULL, null=True, blank=True)

    
    def __str__(self):
        return f"Matériel - ID:{self.id_materiel}, Numéro_Interne:{self.numero_interne_materiel}, Nom:{self.designation_materiel}"
