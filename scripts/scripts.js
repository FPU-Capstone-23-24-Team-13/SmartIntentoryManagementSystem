/*!
* Start Bootstrap - Agency v7.0.12 (https://startbootstrap.com/theme/agency)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-agency/blob/master/LICENSE)
*/
//
// Scripts
// 

window.addEventListener('DOMContentLoaded', event => {
    // Navbar shrink function
    var navbarShrink = function () {
        const navbarCollapsible = document.body.querySelector('#mainNav');
        if (!navbarCollapsible) {
            return;
        }
        if (window.scrollY === 0) {
            navbarCollapsible.classList.remove('navbar-shrink')
        } else {
            navbarCollapsible.classList.add('navbar-shrink')
        }

    };

    // Shrink the navbar 
    navbarShrink();

    // Shrink the navbar when page is scrolled
    document.addEventListener('scroll', navbarShrink);

    //  Activate Bootstrap scrollspy on the main nav element
    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            rootMargin: '0px 0px -40%',
        });
    };

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

});

function fetchLocationsAndPopulateDropdowns() {
    fetch('/api/location/')
        .then(response => response.json())
        .then(locations => {
            const storeroomSelect = document.getElementById('storeroom');
            const uniqueStorerooms = [...new Set(locations.map(location => location.storeroom_name))];

            uniqueStorerooms.forEach(storeroomName => {
                const option = new Option(storeroomName, storeroomName);
                storeroomSelect.add(option);
            });

            // Listen for changes on the storeroom select to update shelves
            storeroomSelect.addEventListener('change', function() {
                const selectedStoreroom = this.value;
                const shelvesForStoreroom = locations.filter(location => location.storeroom_name === selectedStoreroom)
                                                      .map(location => location.shelf_name);
                const uniqueShelves = [...new Set(shelvesForStoreroom)]; // Ensure shelves are unique

                const shelfSelect = document.getElementById('selectShelf');
                shelfSelect.innerHTML = ''; // Clear existing options
                uniqueShelves.forEach(shelfName => {
                    const option = new Option(shelfName, shelfName);
                    shelfSelect.add(option);
                });
            });
        })
        .catch(error => console.error('Error fetching locations:', error));
}
function checkItemExists(sku) {
    return fetch('/api/item/' + sku)
        .then(response => response.json())
        .then(data => {
            if (Object.keys(data).length === 2) {
                // Empty object, item does not exist
                console.error('Item does not yet exist');
                return -1; // Return null to indicate failure
            } else {
                // Valid JSON object, item exists
                console.log('Item found:', data);
                return 0; // Return 'continue' to indicate success
            }
        })
        .catch(error => {
            console.error('Error checking item existence:', error);
            return -1; // Return null to indicate failure
        });
    }