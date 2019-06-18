var filterPrice, filterInputDecline, filterInputGrowth, inputs;

filterPrice = document.getElementById('filter-price');
filterInputDecline = document.getElementById('form-decline');
filterInputGrowth = document.getElementById('form-growth');

inputs = [filterInputDecline, filterInputGrowth];

if(!!filterPrice) {

    var minInput, maxInput;

    minInput = parseInt(filterInputDecline.getAttribute('data-min'));
    maxInput = parseInt(filterInputGrowth.getAttribute('data-max'));

    var tapSlider = document.getElementById('tap');

    noUiSlider.create(filterPrice, {
        start: 40,
        behaviour: 'tap',
        connect: [false, true],
        range: {
            'min': 0,
            'max': 9999
        }
    });
    filterPrice.noUiSlider.on('update', function (values, handle) {

        filterInputDecline.value = values;
        var dolor =  filterInputDecline.value * 3.30;
        filterInputGrowth.value = dolor.toFixed(2);
    });
}

if(!!filterInputDecline && !!filterInputGrowth) {

    inputs.forEach(function (input, handle) {

        input.addEventListener('change', function () {

            filterPrice.noUiSlider.setHandle(handle, this.value);
        });

        input.addEventListener('keydown', function (e) {

            var values, value, steps, step, position;

            values = filterPrice.noUiSlider.get();
            value = Number(values[handle]);
            steps = filterPrice.noUiSlider.steps();
            step = steps[handle];

            switch (e.which) {

                case 13:
                    filterPrice.noUiSlider.setHandle(handle, this.value);

                    break;

                case 38:
                    position = step[1];
                    if (position === false) position = 1;
                    if (position !== null) filterPrice.noUiSlider.setHandle(handle, value + position);

                    break;

                case 40:
                    position = step[0];
                    if (position === false) position = 1;
                    if (position !== null) filterPrice.noUiSlider.setHandle(handle, value - position);

                    break;
            }
        });

    })
}