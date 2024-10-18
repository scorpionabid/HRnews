from django.contrib import admin

# Register your models here.

from .models import Xeber
from .models import Category


# Register your models here.


class XeberAdmin(admin.ModelAdmin):
    list_display = ["basliq","ana_sayfa","slug","xeber_data",]
    list_editable = ["ana_sayfa",]
    search_fields = ["basliq","tipi","text",]
    readonly_fields= ["slug",]
    list_filter = ["category","ana_sayfa",]





admin.site.register(Xeber,XeberAdmin),
admin.site.register(Category),