from django.contrib.admin import StackedInline, TabularInline
from django.template.defaultfilters import slugify

class OrderableInlineMixin(object):

    class Media:
        js = (
            'js/orderable-inline-jquery-ui.js',
            'js/orderable-inline.js',
        )
        css = {
            'all': [
                'css/orderable-inline.css'
            ]
        }

    def get_fieldsets(self, request, obj=None):
        if self.declared_fieldsets:
            return self.declared_fieldsets
        form = self.get_formset(request, obj).form
        fields = form.base_fields.keys() + list(self.get_readonly_fields(request, obj))
        return [
            (None, {
                'fields': fields,
                'classes': self.fieldset_css_classes + ['orderable-field-%s' % self.orderable_field]
            })
        ]

class OrderableStackedInline(OrderableInlineMixin, StackedInline):
    fieldset_css_classes = ['orderable-stacked']

class OrderableTabularInline(OrderableInlineMixin, TabularInline):
    fieldset_css_classes = ['orderable-tabular']
    template = 'orderable_inlines/edit_inline/tabular.html'

