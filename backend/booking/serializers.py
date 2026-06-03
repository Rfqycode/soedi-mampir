from rest_framework import serializers
from .models import Kapster, Layanan, PesananBooking

class KapsterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Kapster
        fields = '__all__'

class LayananSerializer(serializers.ModelSerializer):
    class Meta:
        model = Layanan
        fields = '__all__'

class PesananBookingSerializer(serializers.ModelSerializer):
    nama_kapster = serializers.CharField(source='kapster.nama', read_only=True)
    class Meta:
        model = PesananBooking
        fields = '__all__'