
django-orderable-inlines
========================

Draggable TabularInlines and StackedInlines for Django


Installation
------------

`pip install django-orderable-inlines`

Add `orderable_inlines` to your `INSTALLED_APPS`.

If you aren't using `django.contrib.staticfiles` to manage your static files, copy


Example
-------

```
# models.py
from django.db import models


class Gallery(models.Model):
    name = models.CharField(max_length=16)


class Photo(models.Model):
    gallery = models.ForeignKey(Gallery)
    image = models.ImageField(upload_to='gallery_photos')
    order = models.PositiveIntegerField(default=1)
```


```
# admin.py
from django.contrib import admin
from gallery.models import Gallery, Photo
from orderable_inlines import OrderableTabularInline


class PhotoInline(OrderableTabularInline):
    model = Book
    order_field = 'order'


class GalleryAdmin(admin.ModelAdmin):
    inlines = [
        PhotoInline,
    ]

admin.site.register(Gallery, GalleryAdmin)
```