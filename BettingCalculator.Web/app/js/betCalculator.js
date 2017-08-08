
(function () {

    $(document).ready(function () {

        initializeBetTypePicker();
        setupEachWayToggle();
        initializePopOvers();
        initializeBetStatusPickers();
    });

    function initializeBetTypePicker(selector) {
        $('#betTypeId').selectpicker({
            size: 'auto',
            liveSearch: true,
            width: '100%',
            noneSelectedText: 'Please select bet type'
        });
    }

    function initializeBetStatusPickers(selector) {
        $('.bet-status-picker').selectpicker({
            width: '100%',
        });
    }

    function setupEachWayToggle() {
        $('.each-way-toggle').click(function (e) {
            $('.each-way-toggle').not(this).removeClass('active');
            $(this).toggleClass('active');
            e.preventDefault();
        });
    }

    function initializePopOvers() {
        $('.tooltip-link').tooltip({
            placement: 'bottom'
        });
    }

})();