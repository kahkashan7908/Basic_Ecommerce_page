from django.db import models

# Create your models here.
class Product(models.Model):
    title=models.CharField(max_length=200)
    price=models.IntegerField()
    discount_price=models.IntegerField()
    category=models.CharField(max_length=200)
    description=models.TextField()
    image=models.CharField(max_length=300)

    def  __str__(self):
        return self.title
