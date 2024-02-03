from django.db import models
# from instruments.models import Type

class Document(models.Model):
    id_document = models.AutoField(primary_key=True)
    numero_document = models.CharField(max_length=20, null=False, blank=False)
    designation_document = models.CharField(max_length=100, null=False, blank=False)
    observation_document = models.TextField(blank=True)
    # type_document = models.ForeignKey(Type, on_delete=models.SET_NULL, null=True, blank=True)

    def __str__(self):
        return f"Document - ID:{self.id_document}, Numéro:{self.numero_document}, Nom:{self.designation_document}"

