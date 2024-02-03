from django.db import models
from documents.models import Document
from materiels.models import Materiel
from normes.models import Norme

class Service(models.Model):
    id_service = models.AutoField(primary_key=True)
    numero_service = models.IntegerField(null=False, blank=False)
    designation_service = models.CharField(max_length=100, null=False, blank=False)

    def __str__(self):
        return f"Service - ID:{self.id_service}, Numéro_Service:{self.numero_service}, Nom:{self.designation_service}"

class Type(models.Model):
    id_type = models.AutoField(primary_key=True)
    designation_type = models.CharField(max_length=100, null=False, blank=False)

    def __str__(self):
        return f"Type - ID:{self.id_type}, Nom:{self.designation_type}"

class Instrument(models.Model):
    id_instrument = models.AutoField(primary_key=True)
    reference_instrument = models.CharField(max_length=11, null=True, blank=True)
    numero_interne_instrument = models.CharField(max_length=100, unique=True, null=False, blank=False)
    designation_instrument = models.CharField(max_length=100, null=False, blank=False)
    MONTH_CHOICES = (
        ('Janvier', 'Janvier'),
        ('Février', 'Février'),
        ('Mars', 'Mars'),
        ('Avril', 'Avril'),
        ('Mai', 'Mai'),
        ('Juin','Juin'),
        ('Juilet','Juillet'),
        ('Août', 'Août'),
        ('Septembre','Septembre'),
        ('Octobre','Octobre'),
        ('Novembre', 'Novembre'),
        ('Décembre', 'Décembre')
    )
    mois_etalonnage = models.CharField(max_length=10, choices=MONTH_CHOICES, null=False, blank=False)
    etat_instrument = models.CharField(max_length=7, choices=[('Actif', 'Actif'), ('Inactif', 'Inactif')])
    frequence_controle = models.IntegerField(null=False, blank=False)
    critere_acceptation = models.DecimalField(max_digits=5, decimal_places=2, null=False, blank=False)
    observation_instrument = models.TextField(blank=True)
    # En relation avec le modèle Service
    service_instrument = models.ForeignKey(Service, on_delete=models.SET_NULL, null=True, blank=True)
    # En relation avec le modèle Type
    type_instrument = models.ForeignKey(Type, on_delete=models.SET_NULL, null=True, blank=True)
    # En relation n..n avec les modèles Document, Matériel et Norme
    normes_instrument = models.ManyToManyField(Norme, blank=True)
    documents_instrument = models.ManyToManyField(Document, blank=True)
    materiels_instrument = models.ManyToManyField(Materiel, blank=True)

    def __str__(self):
        return f"Instrument - ID:{self.id_instrument}, Numéro_Interne:{self.numero_interne_instrument}, Nom:{self.designation_instrument}"

class OperationEtalonnage(models.Model):
    id_operation = models.AutoField(primary_key=True)
    # numero_operation = models.PositiveIntegerField(default=1)
    observation_etalonnage = models.CharField(max_length=8, choices=[('Conforme', 'Conforme'), ('Reforme', 'Reforme')])
    numero_pv = models.CharField(max_length=100)
    date_etalonnage = models.DateTimeField(auto_now_add=True)
    resultat_operation = models.DecimalField(max_digits=5, decimal_places=2, null=False, blank=False)
    instrument_operation = models.ForeignKey(Instrument, on_delete=models.CASCADE)

    # def save(self, *args, **kwargs):
        # Vérifier si l'instrument a déja des opérations
        # existing_operation = OperationEtalonnage.objects.filter(instrument_operation=self.instrument_operation).count()
        # if existing_operation > 0:
            # self.numero_operation = existing_operation + 1
        
        # Appeler la classe parente save du Model
        # super(OperationEtalonnage, self).save(*args, **kwargs)
    
    def __str__(self):
        return f"Operation - ID:{self.id_operation}, Instrument:{self.instrument_operation}"
