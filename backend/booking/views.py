from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Kapster, Layanan, PesananBooking
from .serializers import KapsterSerializer, LayananSerializer, PesananBookingSerializer
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from django.core.cache import cache

@api_view(['GET'])
def get_kapster(request):
    data = cache.get('list_kapster')
    if not data:
        kapsters = Kapster.objects.filter(status_aktif=True)
        data = KapsterSerializer(kapsters, many=True).data
        cache.set('list_kapster', data, 600) # Simpan 600 detik (10 menit)
    return Response(data)

@api_view(['GET'])
def get_layanan(request):
    data = cache.get('list_layanan')
    if not data:
        # .only() juga bisa diterapkan di sini
        layanans = Layanan.objects.all().only('nama_layanan', 'harga')
        data = LayananSerializer(layanans, many=True).data
        cache.set('list_layanan', data, 600) # Simpan 600 detik (10 menit)
    return Response(data)

@api_view(['POST'])
def buat_pesanan(request):
    serializer = PesananBookingSerializer(data=request.data)
    
    if serializer.is_valid():
        serializer.save() # Simpan ke database MySQL!
        return Response({"pesan": "Booking berhasil disimpan!"}, status=status.HTTP_201_CREATED)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def cek_jadwal(request):
    # Tangkap pertanyaan dari Next.js (tanggal dan id kapster)
    tanggal_dicari = request.GET.get('tanggal')
    kapster_dicari = request.GET.get('kapster')

    # Kalau tanggal atau kapster kosong, kembalikan list kosong
    if not tanggal_dicari or not kapster_dicari:
        return Response({"jam_terisi": []})
    
    # Kumpulkan jam-jam yang sudah terisi ke dalam sebuah daftar (list)
    jam_terisi = PesananBooking.objects.filter(
        tanggal=tanggal_dicari, 
        kapster_id=kapster_dicari
    ).values_list('jam_booking', flat=True)

    return Response({"jam_terisi": jam_terisi})

@api_view(['GET'])
@permission_classes([IsAuthenticated]) # <-- Wajib bawa ID Card (Token JWT)
def daftar_pesanan(request):
    # Ambil semua pesanan dari database, urutkan dari yang terbaru (-id)
    pesanan = PesananBooking.objects.select_related('kapster').prefetch_related('layanan').all().order_by('-id')
    
    # Ubah data database menjadi format JSON menggunakan serializer
    serializer = PesananBookingSerializer(pesanan, many=True)
    
    return Response(serializer.data)

@api_view(['GET'])
def daftar_layanan(request):
    layanans = Layanan.objects.all()
    serializer = LayananSerializer(layanans, many=True)
    return Response(serializer.data)