(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();
    
    
    // Initiate the wowjs
    new WOW().init();


    // Sticky Navbar
    $(window).scroll(function () {
        if ($(this).scrollTop() > 45) {
            $('.navbar').addClass('sticky-top shadow-sm');
        } else {
            $('.navbar').removeClass('sticky-top shadow-sm');
        }
    });
    
    
    // Dropdown on mouse hover
    const $dropdown = $(".dropdown");
    const $dropdownToggle = $(".dropdown-toggle");
    const $dropdownMenu = $(".dropdown-menu");
    const showClass = "show";
    
    $(window).on("load resize", function() {
        if (this.matchMedia("(min-width: 992px)").matches) {
            $dropdown.hover(
            function() {
                const $this = $(this);
                $this.addClass(showClass);
                $this.find($dropdownToggle).attr("aria-expanded", "true");
                $this.find($dropdownMenu).addClass(showClass);
            },
            function() {
                const $this = $(this);
                $this.removeClass(showClass);
                $this.find($dropdownToggle).attr("aria-expanded", "false");
                $this.find($dropdownMenu).removeClass(showClass);
            }
            );
        } else {
            $dropdown.off("mouseenter mouseleave");
        }
    });
    
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });


    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        margin: 25,
        dots: false,
        loop: true,
        center: true,
        responsive: {
            0:{
                items:1
            },
            576:{
                items:1
            },
            768:{
                items:2
            },
            992:{
                items:3
            }
        }
    });


    // Portfolio isotope and filter
    var portfolioIsotope = $('.portfolio-container').isotope({
        itemSelector: '.portfolio-item',
        layoutMode: 'fitRows'
    });
    $('#portfolio-flters li').on('click', function () {
        $("#portfolio-flters li").removeClass('active');
        $(this).addClass('active');

        portfolioIsotope.isotope({filter: $(this).data('filter')});
    });
    
})(jQuery);


//img input
function readImage (input) {
    if (input.files && input.files[0]) {
      var reader = new FileReader();
      reader.onload = function (e) {
          $('#blah').attr('src', e.target.result); // Renderizamos la imagen
      }
      reader.readAsDataURL(input.files[0]);
    }
  }

  $("#imgInp").change(function () {
    // Código a ejecutar cuando se detecta un cambio de archivO
    readImage(this);
  });

      // Agregar el manejo del envío del formulario aquí
      $("#NewCompanyForm").submit(function (event) {
        event.preventDefault();

        const representative = document.getElementById("representative").value;
        const company = document.getElementById("company").value;
        const email = document.getElementById("email").value;
        const fileInput = document.getElementById("imgInp");

        var formData = new FormData(this);

        formData.append("representante", representative);
        formData.append("nombre_empresa", company);
        formData.append("tenantTemporal", company);
        formData.append("email", email);
        formData.append("url_logo", fileInput.files[0]);
        formData.append("status", '1');

        $('#spinner').addClass('show'); // Mostrar el spinner

        fetch("http://localhost:8000/empresa/add", {
            method: "POST",
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            console.log("Respuesta del servidor:", data);
            $('#spinner').removeClass('show'); // Ocultar el spinner
            // Mostrar una alerta de éxito
            // Esperar 2 segundos y luego mostrar la alerta de éxito
            setTimeout(function () {
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Your company has been successfully created.',
                    showConfirmButton: false,
                    timer: 1500
                });
    
                // Redirigir con parámetros de consulta
                const queryString = `?representative=${encodeURIComponent(representative)}&company=${encodeURIComponent(company)}&email=${encodeURIComponent(email)}&tenant_id=${encodeURIComponent(data.tenant_id)}`;
                setTimeout(() => {               
                   window.location.href = "/register-user.html" + queryString;
                }, 2000); // 2000 ms = 2 segundos
            }, 1500);
        })
        .catch(error => {
            console.error("Error:", error);

            $('#spinner').removeClass('show'); // Ocultar el spinner
            // Esperar 2 segundos y luego mostrar la alerta de error
            setTimeout(function () {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong!',
                    footer: '<a href="google.com">Why do I have this issue?</a>'
                });
            }, 2000); // 2000 ms = 2 segundos
        });
    });

    let firstname = ''
    let lastname = ''

    $("#NewUserFormInitiate365App").submit(function (event) {
        event.preventDefault();

        const full_name = document.getElementById("full_name").value;
        if (full_name) {
            let nameParts = full_name.split(" ");
            firstname = nameParts[0];
            lastname = nameParts.slice(1).join(" "); // Si el apellido tiene varios términos
        
            // Ahora puedes utilizar las variables firstname y lastname como desees
            console.log("Firstname:", firstname);
            console.log("Lastname:", lastname);
        }
        const username = document.getElementById("username").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        const phone_number = document.getElementById("phone_number").value;
        const tenant_id = document.getElementById("tenant_id").value;

        var formData = new FormData(this);

        formData.append("first_name", firstname);
        formData.append("last_name", lastname);
        formData.append("birthdate", '2023-08-23');
        formData.append("username", username);
        formData.append("user_images", 'https://backend.ez-marketing-us.com/public/images/no-image.png');
        formData.append("email", email);
        formData.append("password", password);
        formData.append("phone_number", phone_number);
        formData.append("language_id", 1);
        formData.append("rol_id", 1);
        formData.append("status", 1);
        formData.append("tenant_id", tenant_id);


        $('#spinner').addClass('show'); // Mostrar el spinner

        fetch("http://localhost:8000/user/add", {
            method: "POST",
            body: formData
        })
        .then(response => response.json())
        .then(data => {

            $('#spinner').removeClass('show'); // Ocultar el spinner
            // Mostrar una alerta de éxito
            // Esperar 2 segundos y luego mostrar la alerta de éxito
            setTimeout(function () {
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Your user has been successfully created.',
                    showConfirmButton: false,
                    timer: 1500
                });
    
                // Redirigir con parámetros de consulta
                //const queryString = `?representative=${encodeURIComponent(representative)}&company=${encodeURIComponent(company)}&email=${encodeURIComponent(email)}`;
                setTimeout(() => {               
                    window.location.href = "https://initiate-365-app.ez-marketing-us.com/";
                }, 2000); // 2000 ms = 2 segundos
            }, 1500);
        })
        .catch(error => {
            console.error("Error:", error);

            $('#spinner').removeClass('show'); // Ocultar el spinner
            // Esperar 2 segundos y luego mostrar la alerta de error
            setTimeout(function () {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong!',
                    footer: '<a href="google.com">Why do I have this issue?</a>'
                });
            }, 2000); // 2000 ms = 2 segundos
        });
    });

    
//     const form = document.getElementById("NewCompanyForm");

//     form.addEventListener("submit", function(event) {
//         event.preventDefault();

//         const representative = document.getElementById("representative").value;
//         const company = document.getElementById("company").value;
//         const email = document.getElementById("email").value;
//         const fileInput = document.getElementById("imgInp");

//         const formData = new FormData();
//         formData.append("representante", representative);
//         formData.append("nombre_empresa", company);
//         formData.append("email", email);
//         formData.append("url_logo", fileInput.files[0]);
//         formData.append("tenant_id", company+123);
//         formData.append("status", '1');

//         fetch("http://localhost:8000/empresa/add", {
//             method: "POST",
//             body: formData
//         })
//         .then(response => response.json())
//         .then(data => {
//             console.log("Respuesta del servidor:", data);          
//             // Hacer algo con la respuesta del servidor si es necesario
//             alert("Empresa agregada exitosamente");
//         })
//         .catch(error => {
//             console.error("Error:", error);
//             // Mostrar una alerta de error
//             alert("Hubo un error al agregar la empresa");
//         });
//     });
// });