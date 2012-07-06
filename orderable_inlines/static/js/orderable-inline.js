(function($){

    function parseOrderableFieldName(className){
        return /\borderable-field-([^\b]+)/.exec(className)[1];
    }

    function setupStackedFieldset(){
        var $fieldset, $inlineGroup;
        $fieldset = $(this);
        $inlineGroup = $fieldset.closest('.inline-group');
        $inlineGroup.addClass('orderable-stacked-inline-group');
    }

    function setupStackedInlineGroup(){
        var $inlineGroup, $fieldsets, orderableFieldName, update;
        $inlineGroup = $(this);
        $fieldsets = $inlineGroup.find('fieldset.orderable-stacked');
        orderableFieldName = parseOrderableFieldName($fieldsets[0].className);
        var update = function(){
            var $inputs;
            $inputs = $inlineGroup.find('.field-'+orderableFieldName+' input');
            $inputs.each(function(i){
                var $input, $inlineRelated, originalData, newData;
                $input = $(this);
                $inlineRelated = $input.closest('.inline-related');
                newData = $('<form />').append($inlineRelated.clone()).serialize();
                originalData = $input.data('original-data');
                if (!originalData) {
                    originalData = newData;
                    $input.data('original-data', originalData);
                }

                // only update the order if this a new row that has been modified
                // or if its an existing row
                if ($inlineRelated.find('span.delete input').length || (originalData != newData)){
                    $input.val(i+1);
                }

            });
        };
        $inlineGroup.sortable({
            axis: 'y',
            placeholder: 'ui-state-highlight',
            forcePlaceholderSize: 'true',
            items: '.inline-related',
            update: update
        });
        update();
    }

    function setupTabularFieldset(){
        var $fieldset, $inlineGroup;
        $fieldset = $(this);
        $inlineGroup = $fieldset.closest('.inline-group');
        $inlineGroup.addClass('orderable-tabular-inline-group');
    }

    function setupTabularTBody(){
        var $tBody, $fieldset, $trs, orderableFieldName, update;
        $tBody = $(this);
        $fieldset = $tBody.closest('fieldset');
        orderableFieldName = parseOrderableFieldName($fieldset[0].className);
        var update = function(){
            var $inputs;
            $inputs = $fieldset.find('.field-'+orderableFieldName+' input');
            $inputs.each(function(i){
                var $input, $tr, originalData, newData;
                $input = $(this);
                $tr = $input.closest('tr');

                newData = $('<form />').append($tr.clone()).serialize();
                originalData = $input.data('original-data');
                if (!originalData) {
                    originalData = newData;
                    $input.data('original-data', originalData);
                }

                // only update the order if this a new row that has been modified
                // or if its an existing row
                if ($tr.find('td.delete input').length || (originalData != newData)){
                    $input.val(i+1);
                }

                // fix the zebra stripes
                $tr.removeClass('row1 row1');
                $tr.addClass('row'+((i%2)+1));
            });
        };
        $tBody.sortable({
            axis: 'y',
            placeholder: 'ui-state-highlight',
            forcePlaceholderSize: 'true',
            items: 'tr.form-row',
            update: update
        });
        update();
    }

    $(function(){
        $('fieldset.orderable-stacked').each(setupStackedFieldset);
        $('.orderable-stacked-inline-group').each(setupStackedInlineGroup);
        $('fieldset.orderable-tabular tbody').each(setupTabularTBody);
    });

})(django.jQuery);