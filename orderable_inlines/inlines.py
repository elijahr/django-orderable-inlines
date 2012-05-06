from django.contrib.admin import StackedInline, TabularInline
from django.template.defaultfilters import slugify

class OrderableInlineMixin(object):

    class Media:
        js = (
            'js/orderable-inline-jquery-ui.js',
            'js/orderable-inline.js',
        )

    def get_fieldsets(self, request, obj=None):
        if self.declared_fieldsets:
            return self.declared_fieldsets
        form = self.get_formset(request, obj).form
        fields = form.base_fields.keys() + list(self.get_readonly_fields(request, obj))
        return [
            (None, {
                'fields': fields,
                'classes': '%s orderable-field-%s' % (
                    self.fieldset_css_classes,
                    self.order_field
                )
            })
        ]

class OrderableStackedInline(StackedInline, OrderableInlineMixin):
    fieldset_css_classes = 'orderable-stacked'

class OrderableTabularInline(TabularInline, OrderableInlineMixin):
    fieldset_css_classes = 'orderable-tabular'
