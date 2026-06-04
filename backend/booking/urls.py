from django.urls import path
from . import views


urlpatterns = [
    path('kapster/', views.get_kapster),
    path('layanan/', views.get_layanan),
    path('buat-pesanan/', views.buat_pesanan),
    path('cek-jadwal/', views.cek_jadwal),
    path('daftar-pesanan/', views.daftar_pesanan, name='daftar_pesanan'),
    path('layanan/', views.daftar_layanan, name='daftar-layanan'),

]