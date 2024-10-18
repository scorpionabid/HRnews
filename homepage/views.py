from django.shortcuts import render
from homepage.models import Xeber, Category
from django.shortcuts import get_object_or_404

# Create your views here.


def index(request):
    latest_news = Xeber.objects.filter(ana_sayfa=True).order_by('-xeber_data').first()
    
    if latest_news:
        next_news = Xeber.objects.filter(ana_sayfa=True, xeber_data__lt=latest_news.xeber_data).order_by('-xeber_data')[:3]
    else:
        next_news = Xeber.objects.filter(ana_sayfa=True).order_by('-xeber_data')[:3]

    categories = Category.objects.all()
    category_news_dict = {
        category: Xeber.objects.filter(category=category, ana_sayfa=True).order_by('-xeber_data')[:6]
        for category in categories
    }

    context = {
        "latest_news": latest_news,
        "next_news": next_news,
        "categories": categories,
        "category_news_dict": category_news_dict,
    }
    return render(request, "index.html", context)



def contact(request):
    context = {
        "categories": Category.objects.all()
    }
    return render(request, "contact.html",context)


def xeber_detail(request, slug):
    xebers = get_object_or_404(Xeber, slug=slug)
    
    latest_news = Xeber.objects.filter(xeber_data__gt=xebers.xeber_data).order_by('-xeber_data')[:3]
    
    if not latest_news.exists():
        latest_news = Xeber.objects.filter(xeber_data__lt=xebers.xeber_data).order_by('-xeber_data')[:3]

   
    categories = Category.objects.all()

    return render(request, "xeber_detail.html", {
        "xebers": xebers, 
        "latest_news": latest_news,
        "categories": categories  
    })


def category_detali(request, slug):
    
    selected_category = get_object_or_404(Category, slug=slug)  
    
    context = {
        "xebers": Xeber.objects.filter(category__slug=slug).order_by('-xeber_data'),
        "categories": Category.objects.all(),
        "selected_category": selected_category  
    }
    return render(request, "hr.html", context)


