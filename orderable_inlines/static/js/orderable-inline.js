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
                var $input, originalData, newData;
                $input = $(this);
                // only update the ordering if this item is 1) a non new item
                // or if 2) it is new but its values have changed
                originalData = $input.data('original-data');
                newData = $('<form />').append($input.closest('tr').clone()).serialize();
                if ((!originalData) || (originalData != newData)) {
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
                var $input, $tr, originalData;
                $input = $(this);
                $tr = $input.closest('tr');
                // if this is just an 'extra' input, don't change the order
                // but keep track of what the original row values were so we
                // can tell if they have changed
                if ($tr.find('td.delete input').length) {
                    $input.val(i+1);
                } else {
                    $input.addClass('new-row');
                    originalData = $('<form />').append($tr.clone()).serialize();
                    $input.data('original-data', originalData);
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

})(window.jQuery || django.jQuery);