# Create your models here.

from django.db import models

class Kapster(models.Model):
    nama = models.CharField(max_length=50)
    no_hp = models.CharField(max_length=15, blank=True, null=True)
    status_aktif = models.BooleanField(default=True)

    def __str__(self):
        return self.nama

class Layanan(models.Model):
    nama_layanan = models.CharField(max_length=100)
    harga = models.IntegerField()

    def __str__(self):
        return self.nama_layanan

class PesananBooking(models.Model):
    nama_pelanggan = models.CharField(max_length=100)
    no_whatsapp = models.CharField(max_length=20)
    kapster = models.ForeignKey(Kapster, on_delete=models.CASCADE)
    layanan = models.ManyToManyField(Layanan)
    tanggal = models.DateField()
    jam_booking = models.CharField(max_length=10) # Misal: "10:00"
    total_harga = models.IntegerField(default=0)
    status = models.CharField(max_length=20, default='Pending') # Bisa: Pending, Selesai, Batal

    def __str__(self):
        return f"{self.nama_pelanggan} - {self.tanggal} ({self.jam_booking})"