from django.urls import path
from . import views

urlpatterns=[
    path("", views.index, name="home"),
    path("index.html", views.index),
    path("contact",views.contact, name='contact'),
    path("xeber/<slug:slug>",views.xeber_detail, name='xeber_detail'),
    path("category/<slug:slug>", views.category_detali, name="category_detali")
    
]