
django-orderable-inlines
========================

Drag-to-reorder inline model admins for Django


Installation
------------

    pip install django-orderable-inlines

Add ``orderable_inlines`` to your ``INSTALLED_APPS``.


Example
-------

``models.py``::

    from django.db import models

    class Gallery(models.Model):
        name = models.CharField(max_length=16)

    class Photo(models.Model):
        gallery = models.ForeignKey(Gallery)
        image = models.ImageField(upload_to='gallery_photos')
        order = models.PositiveIntegerField(default=1)


``admin.py``::

    from django.contrib import admin
    from gallery.models import Gallery, Photo
    from orderable_inlines import OrderableTabularInline

    class PhotoInline(OrderableTabularInline):
        model = Book
        orderable_field = 'order'

    class GalleryAdmin(admin.ModelAdmin):
        inlines = [
            PhotoInline,
        ]

    admin.site.register(Gallery, GalleryAdmin)
