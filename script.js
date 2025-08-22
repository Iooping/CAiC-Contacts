document.addEventListener('DOMContentLoaded', () => {
    const accordionHeaders = document.querySelectorAll('.accordion-header');

    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const content = header.nextElementSibling;
            
            // Toggle the active class on the content to show/hide it
            content.classList.toggle('active');
            
            // Toggle the active class on the header to rotate the icon
            header.classList.toggle('active');
            
            // Close other open accordions
            accordionHeaders.forEach(otherHeader => {
                if (otherHeader !== header) {
                    otherHeader.nextElementSibling.classList.remove('active');
                    otherHeader.classList.remove('active');
                }
            });
        });
    });
});
