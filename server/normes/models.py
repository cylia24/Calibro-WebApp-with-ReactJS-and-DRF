from django.db import models
# from instruments.models import Type

class Norme(models.Model):
    id_norme = models.AutoField(primary_key=True)
    numero_norme = models.CharField(max_length=20, null=False, blank=False)
    designation_norme = models.CharField(max_length=100, null=False, blank=False)
    observation_norme = models.TextField(blank=True)
    # type_norme = models.ForeignKey(Type, on_delete=models.SET_NULL, null=True, blank=True)

    def __str__(self):
        return f"Norme - ID:{self.id_norme}, Numéro:{self.numero_norme}, Nom:{self.designation_norme}"


