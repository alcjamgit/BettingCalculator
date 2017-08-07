
(function () {

    $(document).ready(function () {
        chosenHandler('#betTypeId');
        //$('#calculateButton').click(clickHandler);
    });

    function chosenHandler(selector) {
        //$(selector).chosen({
        //    disable_search_threshold: 10,
        //    no_results_text: "Oops, nothing found!"
            
        //});
        $(selector).selectpicker({
            size: 'auto',
            liveSearch: true,
            width: '100%',
            noneSelectedText: 'Please select bet type'
        });

    }
})();