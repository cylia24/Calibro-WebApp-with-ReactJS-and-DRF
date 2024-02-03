from django.contrib import admin
from django.urls import path, include
from instruments.views import * 
from materiels.views import *
from documents.views import *
from normes.views import *
from profils.views import *
from rest_framework import routers

router = routers.DefaultRouter()
router.register(r'instruments', InstrumentViewSet)
router.register(r'services', ServiceViewSet)
router.register(r'types', TypeViewSet)
router.register(r'operationetalonnages', OperationEtalonnageViewSet)
router.register(r'materiels', MaterielViewSet)
router.register(r'documents', DocumentViewSet)
router.register(r'normes', NormeViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('api/instruments/create/', create_instrument, name='create_instrument'),
    path('api/materiels/create/', create_materiel, name='create_materiel'),
    path('api/normes/create/', create_norme, name='create_norme'),
    path('api/documents/create/', create_document, name='create_document'),
    path('api/operationetalonnages/create/', create_operation, name='create_operation'),
    path('api/instruments/delete/<str:numero_interne_instrument>/', delete_instrument, name='delete-instrument'),
    path('api/operationetalonnages/delete/<int:id_operation>/', delete_operation, name='delete-operation'),
    path('api/materiels/delete/<str:numero_interne_materiel>/', delete_materiel, name='delete-materiel'),
    path('api/normes/delete/<str:numero_norme>/', delete_norme, name='delete-norme'),
    path('api/documents/delete/<str:numero_document>/', delete_document, name='delete-document'),
    path('api/instruments/detail/<str:numero_interne_instrument>/', get_instrument_details, name="get_instrument_details"),
    path('api/instruments/detail-id/<int:id_instrument>/', get_instrument_details_id, name="get_instrument_details_id"),
    path('api/operationetalonnages/detail-id/<int:id_operation>/', get_operation_details_id, name="get_operation_details_id"),
    path('api/materiels/detail/<str:numero_interne_materiel>/', get_materiel_details, name="get_materiel_details"),
    path('api/materiels/detail-id/<int:id_materiel>/', get_materiel_details_id, name="get_materiel_details_id"),
    path('api/normes/detail/<str:numero_norme>/', get_norme_details, name="get_norme_details"),
    path('api/normes/detail-id/<int:id_norme>/', get_norme_details_id, name="get_norme_details_id"),
    path('api/documents/detail/<str:numero_document>/', get_document_details, name="get_document_details"),
    path('api/documents/detail-id/<int:id_document>/', get_document_details_id, name="get_document_details_id"),
    path('api/instruments/update/<int:id_instrument>/', modifier_instrument, name="modifier_instrument"),
    path('api/instruments/update-state/<int:id_instrument>/', modifier_etat_instrument, name="modifier_etat_instrument"),
    path('api/materiels/update/<int:id_materiel>/', modifier_materiel, name="modifier_materiel"),
    path('api/documents/update/<int:id_document>/', modifier_document, name="modifier_document"),
    path('api/normes/update/<int:id_norme>/', modifier_norme, name="modifier_norme"),
    path('api/operationetalonnages/update/<int:id_operation>/', modifier_operation, name="modifier_operation"),
    path('api/instruments/affecter-materiel/<str:numero_interne_instrument>/<int:materiel_id>/', affecter_materiel, name="affecter_materiel"),
    path('api/instruments/annuler-affectation-materiel/<str:numero_interne_instrument>/<int:materiel_id>/', annuler_affectation_materiel, name="annuler_affectation_materiel"),
    path('api/instruments/affecter-document/<str:numero_interne_instrument>/<int:document_id>/', affecter_document, name="affecter_document"),
    path('api/instruments/annuler-affectation-document/<str:numero_interne_instrument>/<int:document_id>/', annuler_affectation_document, name="annuler_affectation_document"),
    path('api/instruments/affecter-norme/<str:numero_interne_instrument>/<int:norme_id>/', affecter_norme, name="affecter_norme"),
    path('api/instruments/annuler-affectation-norme/<str:numero_interne_instrument>/<int:norme_id>/', annuler_affectation_norme, name="annuler_affectation_norme"),
    path('api/operationetalonnages/operations-instrument/<int:id_instrument>/', chercher_operations_instrument, name='chercher_operations_instrument'),
    path('api/services/detail-id/<int:id_service>/', get_service_details_id, name="get_service_details_id"),
    #path('login/', login_view, name='login'),
    path('api/token/', CustomAuthToken.as_view()),
    path('api/user/', get_user_data, name='get_user_data'),
    path('api/logout/', logout, name='logout'),
]
