document.addEventListener('DOMContentLoaded', function () {
    const filterSummary = document.querySelector('.details__summary');
    const summaryList = document.querySelector('.summary__list');
    const filtersDetails = filterSummary.closest('.filters__details');

    filterSummary.addEventListener('click', function (event) {
        event.preventDefault();
        summaryList.classList.toggle('active');
        this.classList.toggle('active');
        if (this.closest('.filters__single-details')) {
            if (summaryList.classList.contains('active')) {
                filtersDetails.style.boxShadow = '6px 4px 35px 0px rgba(0, 0, 0, 0.21)';
                filtersDetails.style.padding = '16px';
            } else {
                filtersDetails.style.boxShadow = '';
                filtersDetails.style.padding = '';
            }
        }
    });

    const itemLinks = document.querySelectorAll('.summary__item_link');

    itemLinks.forEach(link => {
        link.addEventListener('click', function (event) {
            event.preventDefault();
            const dropdown = this.nextElementSibling;
            if (dropdown && dropdown.classList.contains('summary__dropdown_list')) {
                dropdown.classList.toggle('active');
                if (this.closest('.filters__single-details')) {
                    if (dropdown.classList.contains('active')) {
                        filtersDetails.style.boxShadow = '6px 4px 35px 0px rgba(0, 0, 0, 0.21)';
                    } else {
                        filtersDetails.style.boxShadow = '';
                    }
                }
            }
        });
    });

    const filterSummaries = document.querySelectorAll('.filters__multiple-details .details__summary');

    filterSummaries.forEach(summary => {
        summary.addEventListener('click', function (event) {
            event.preventDefault();
            const dropdownList = this.nextElementSibling;
            const filtersDetails = this.closest('.filters__details');

            if (dropdownList && dropdownList.classList.contains('filters__dropdown_list')) {
                dropdownList.classList.toggle('active');
                this.classList.toggle('active');
                if (this.closest('.filters__multiple-details')) {
                    if (dropdownList.classList.contains('active')) {
                        dropdownList.style.boxShadow = '6px 4px 35px 0px rgba(0, 0, 0, 0.21)';
                    } else {
                        dropdownList.style.boxShadow = '';
                    }
                }
            }
        });
    });

    document.addEventListener('click', function (event) {
        const isClickInside = filterSummary.contains(event.target) || summaryList.contains(event.target);
        if (!isClickInside) {
            summaryList.classList.remove('active');
            filterSummary.classList.remove('active');
            filtersDetails.style.boxShadow = '';
            filtersDetails.style.padding = ''; // Reset padding when closing the menu
        }

        itemLinks.forEach(link => {
            const dropdown = link.nextElementSibling;
            if (dropdown && dropdown.classList.contains('summary__dropdown_list') && !link.contains(event.target) && !dropdown.contains(event.target)) {
                dropdown.classList.remove('active');
            }
        });

        filterSummaries.forEach(summary => {
            const dropdownList = summary.nextElementSibling;
            if (dropdownList && dropdownList.classList.contains('filters__dropdown_list') && !summary.contains(event.target) && !dropdownList.contains(event.target)) {
                dropdownList.classList.remove('active');
                summary.classList.remove('active');
            }
        });
    });
});