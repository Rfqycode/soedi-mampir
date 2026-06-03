from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Kapster, Layanan, PesananBooking
from .serializers import KapsterSerializer, LayananSerializer, PesananBookingSerializer
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated

@api_view(['GET'])
def get_kapster(request):
    # Hanya mengambil kapster yang status_aktif nya dicentang
    kapsters = Kapster.objects.filter(status_aktif=True)
    serializer = KapsterSerializer(kapsters, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def get_layanan(request):
    layanans = Layanan.objects.all()
    serializer = LayananSerializer(layanans, many=True)
    return Response(serializer.data)

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

    # Cari di database: pesanan yang tanggal dan kapsternya cocok
    pesanan_ditemukan = PesananBooking.objects.filter(
        tanggal=tanggal_dicari, 
        kapster_id=kapster_dicari
    )

    # Kumpulkan jam-jam yang sudah terisi ke dalam sebuah daftar (list)
    jam_terisi = [pesanan.jam_booking for pesanan in pesanan_ditemukan]

    return Response({"jam_terisi": jam_terisi})

@api_view(['GET'])
@permission_classes([IsAuthenticated]) # <-- Wajib bawa ID Card (Token JWT)
def daftar_pesanan(request):
    # Ambil semua pesanan dari database, urutkan dari yang terbaru (-id)
    pesanan = PesananBooking.objects.all().order_by('-id')
    
    # Ubah data database menjadi format JSON menggunakan serializer
    serializer = PesananBookingSerializer(pesanan, many=True)
    
    return Response(serializer.data)