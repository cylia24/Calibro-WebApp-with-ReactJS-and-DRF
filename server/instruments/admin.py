from django.contrib import admin
from .models import *

admin.site.register(Service)
admin.site.register(Type)
admin.site.register(Instrument)
admin.site.register(OperationEtalonnage)