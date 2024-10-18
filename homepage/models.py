from django.db import models
from django.utils.text import slugify
from ckeditor.fields import RichTextField
from datetime import datetime, date




class Category(models.Model):
    name = models.CharField(max_length=150)
    slug = models.SlugField(null=False,blank=True,unique=True,db_index=True,editable=False)

    def save(self, *args, **kwargs):
        self.slug = slugify(self.name)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name





class Xeber(models.Model):
    basliq=models.CharField(max_length=255)
    text=RichTextField()
    image=models.ImageField(upload_to="xeber", max_length=255)
    category=models.CharField(max_length=255)
    ana_sayfa=models.BooleanField(default=False)
    slug = models.SlugField(null=False, blank=True, unique=True, db_index=True, editable=False)
    xeber_data = models.DateTimeField(auto_now_add=True)
    category = models.ForeignKey(Category,default=1,on_delete=models.CASCADE)


    def __str__(self):
        return f"{self.basliq}"
    

    def save(self, *args, **kwargs):
        self.slug = slugify(self.basliq)
        super().save(*args, **kwargs)
    



