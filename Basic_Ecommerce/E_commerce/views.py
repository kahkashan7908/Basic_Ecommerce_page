from django.shortcuts import render,redirect
from django.contrib.auth import logout
from .models import Product
from.forms import RegistrationForm
from django.contrib import messages

# home page view
def ProductHome(request):
    product_data= Product.objects.all()

     #code for serch item
    item_name=request.GET.get('item_name')
    if item_name!='' and item_name is not None:
        product_data= product_data.filter(title__icontains=item_name)

    return render(request,'home.html',{'data':product_data})

#registration view
def RegisterView(request):
    if request.method=='POST':
        form=RegistrationForm(request.POST)
        if form.is_valid():
            form.save()
            username=form.cleaned_data.get('username')
            messages.success(request, f'Welcome, {username}! Your account has been successfully registered.')

            return redirect('login')
        else:
            print(form.errors)
    else:
        form=RegistrationForm()
    return render(request,'register.html',{'form':form})

#logout view
def LogoutView(request):
    logout(request) 
    messages.info(request, 'You have been logged out.') 
    return redirect('home') 

# details view
def productDetails(request,id):
    data=Product.objects.get(pk=id)
    return render(request,'productdetails.html',{'data':data})


    

